import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { escapeHtml, localeRoute, outputPath, pageEnabledForLocale, validateAppPage, validateLegalPages, validateRegistry } from '../i18n/lib/core.mjs';
import { locales, pages } from '../i18n/config.mjs';
import { loadContent } from '../scripts/i18n-shared.mjs';
import { localizeLegalPages } from '../scripts/legal-localization.mjs';
import { renderLanguageSwitcher } from '../i18n/templates/language-switcher.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('registry and enabled locale content validate', async () => {
  const content = await loadContent(root);
  assert.deepEqual(Object.keys(content), ['en', 'nl']);
  assert.equal(content.en.home.meta.title, 'Kestora Labs — Independent iPhone Apps');
  assert.equal(Object.keys(content.en.pages).length, 8);
  assert.equal(Object.keys(content.en.guideOverviews.pages).length, 8);
  assert.equal(Object.keys(content.en.guideArticles.pages).length, 55);
  assert.equal(Object.keys(content.en.tools.pages).length, 5);
  assert.equal(Object.keys(content.en.legalPages.pages).length, 26);
  assert.equal(content.nl.home.meta.title, 'Kestora Labs — Onafhankelijke iPhone-apps');
  assert.equal(Object.keys(content.nl.pages).length, 8);
  assert.equal(Object.keys(content.nl.guideOverviews.pages).length, 8);
  assert.equal(Object.keys(content.nl.guideArticles.pages).length, 0);
  assert.equal(Object.keys(content.nl.tools.pages).length, 0);
  assert.equal(Object.keys(content.nl.legalPages.pages).length, 26);
  assert.equal(pages.length, 103);
});

test('locale paths are deterministic', () => {
  assert.equal(localeRoute('en', '/fovri/'), '/fovri/');
  assert.equal(localeRoute('nl', '/fovri/'), '/nl/fovri/');
  assert.equal(outputPath('en', '/'), 'index.html');
  assert.equal(outputPath('nl', '/'), 'nl/index.html');
  assert.equal(outputPath('en', '/fovri/'), 'fovri/index.html');
});

test('language switcher uses a scalable accessible menu', async () => {
  const content = await loadContent(root);
  const page = pages.find(candidate => candidate.id === 'site.home');
  const html = renderLanguageSwitcher({ locale: 'nl', page, contentByLocale: content, label: 'Taal' });
  assert.match(html, /<details class="language-switcher">/);
  assert.match(html, /<summary aria-label="Taal">/);
  assert.match(html, /href="\/"[^>]*>[^<]*<span class="language-option-name">English<\/span>/);
  assert.match(html, /href="\/nl\/"[^>]*aria-current="page"[^>]*>[^<]*<span class="language-option-name">Nederlands<\/span>/);
  assert.doesNotMatch(html, /<select/);
});

test('core pages are shared while SEO inventories are locale-specific', () => {
  const appPage = pages.find(page => page.id === 'fovri.app');
  const englishGuide = pages.find(page => page.id === 'fovri.guide.best-recipe-app');
  assert.equal(pageEnabledForLocale(appPage, 'nl'), true);
  assert.equal(pageEnabledForLocale(englishGuide, 'en'), true);
  assert.equal(pageEnabledForLocale(englishGuide, 'nl'), false);
});

test('Calmber links to its live App Store listing', () => {
  const calmber = pages.find(page => page.id === 'calmber.app');
  assert.equal(calmber.appStore, 'https://apps.apple.com/app/cigarette-counter-calmber/id6833412600');
});

test('Dutch app pages use complete localized screenshot sets', async () => {
  const appPages = pages.filter(page => page.type === 'app-page');
  for (const page of appPages) {
    const screenshots = page.assets.screenshotsByLocale.nl;
    assert.equal(screenshots.length, 3, `${page.id} needs three Dutch screenshots`);
    for (const source of screenshots) await access(resolve(root, source.replace(/^\//, '')));
    assert.ok(screenshots.every(source => source.startsWith('/assets/screens/nl/')));
  }
});

test('completed Dutch legal-page batches preserve the protected English structure', async () => {
  const source = JSON.parse(await readFile(resolve(root, 'i18n/content/en/legal-pages.json'), 'utf8'));
  const overlay = JSON.parse(await readFile(resolve(root, 'i18n/content/nl/legal-translations.json'), 'utf8'));
  const localized = localizeLegalPages(source, overlay, 'nl');
  assert.equal(Object.keys(localized.pages).length, 26);
  assert.equal(Object.keys(localized.pages).filter(id => id.endsWith('.support')).length, 8);
  assert.equal(Object.keys(localized.pages).filter(id => id.endsWith('.privacy')).length, 9);
  assert.equal(Object.keys(localized.pages).filter(id => id.endsWith('.terms')).length, 8);
  validateLegalPages(localized, 'nl.legalPagesDraft');
});

test('plain text is escaped and markup cannot enter content fields', async () => {
  assert.equal(escapeHtml('A & B < C'), 'A &amp; B &lt; C');
  const content = JSON.parse(await readFile(resolve(root, 'i18n/content/en/pages.json'), 'utf8'))['fovri.app'];
  const unsafe = structuredClone(content);
  unsafe.hero.description = '<script>alert(1)</script>';
  assert.throws(() => validateAppPage(unsafe, 'test'), /text only/);
});

test('preview build cannot target the live site root', async () => {
  const config = await import('../i18n/config.mjs');
  assert.equal(config.site.previewDirectory, '.i18n-preview');
  assert.notEqual(config.site.previewDirectory, '.');
});

test('an enabled locale cannot ship with missing content', async () => {
  const content = await loadContent(root);
  locales.test = { label: 'Test', htmlLang: 'test', prefix: '/test', enabled: true };
  try {
    assert.throws(() => validateRegistry(content), /Missing test (home|common)? ?content/);
  } finally {
    delete locales.test;
  }
});
