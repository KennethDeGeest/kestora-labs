import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { escapeHtml, localeRoute, outputPath, pageEnabledForLocale, validateAppPage, validateLegalPages, validateRegistry } from '../i18n/lib/core.mjs';
import { locales, pages } from '../i18n/config.mjs';
import { loadContent } from '../scripts/i18n-shared.mjs';
import { localizeLegalPages } from '../scripts/legal-localization.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('registry and enabled locale content validate', async () => {
  const content = await loadContent(root);
  assert.deepEqual(Object.keys(content), ['en']);
  assert.equal(content.en.home.meta.title, 'Kestora Labs — Independent iPhone Apps');
  assert.equal(Object.keys(content.en.pages).length, 8);
  assert.equal(Object.keys(content.en.guideOverviews.pages).length, 7);
  assert.equal(Object.keys(content.en.guideArticles.pages).length, 55);
  assert.equal(Object.keys(content.en.tools.pages).length, 5);
  assert.equal(Object.keys(content.en.legalPages.pages).length, 26);
  assert.equal(pages.length, 102);
});

test('locale paths are deterministic', () => {
  assert.equal(localeRoute('en', '/fovri/'), '/fovri/');
  assert.equal(localeRoute('nl', '/fovri/'), '/nl/fovri/');
  assert.equal(outputPath('en', '/'), 'index.html');
  assert.equal(outputPath('nl', '/'), 'nl/index.html');
  assert.equal(outputPath('en', '/fovri/'), 'fovri/index.html');
});

test('core pages are shared while SEO inventories are locale-specific', () => {
  const appPage = pages.find(page => page.id === 'fovri.app');
  const englishGuide = pages.find(page => page.id === 'fovri.guide.best-recipe-app');
  assert.equal(pageEnabledForLocale(appPage, 'nl'), true);
  assert.equal(pageEnabledForLocale(englishGuide, 'en'), true);
  assert.equal(pageEnabledForLocale(englishGuide, 'nl'), false);
});

test('completed Dutch legal-page batches preserve the protected English structure', async () => {
  const source = JSON.parse(await readFile(resolve(root, 'i18n/content/en/legal-pages.json'), 'utf8'));
  const overlay = JSON.parse(await readFile(resolve(root, 'i18n/content/nl/legal-translations.json'), 'utf8'));
  const localized = localizeLegalPages(source, overlay, 'nl');
  assert.equal(Object.keys(localized.pages).length, 8);
  assert.ok(Object.keys(localized.pages).every(id => id.endsWith('.support')));
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
