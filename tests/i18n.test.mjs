import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { escapeHtml, localeRoute, outputPath, validateAppPage, validateRegistry } from '../i18n/lib/core.mjs';
import { locales } from '../i18n/config.mjs';
import { loadContent } from '../scripts/i18n-shared.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('registry and enabled locale content validate', async () => {
  const content = await loadContent(root);
  assert.deepEqual(Object.keys(content), ['en']);
});

test('locale paths are deterministic', () => {
  assert.equal(localeRoute('en', '/fovri/'), '/fovri/');
  assert.equal(localeRoute('es', '/fovri/'), '/es/fovri/');
  assert.equal(outputPath('fr', '/fovri/'), 'fr/fovri/index.html');
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
  locales.es.enabled = true;
  try {
    assert.throws(() => validateRegistry(content), /Missing es content/);
  } finally {
    locales.es.enabled = false;
  }
});
