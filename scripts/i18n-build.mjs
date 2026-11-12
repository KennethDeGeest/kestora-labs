import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { locales, pages, site } from '../i18n/config.mjs';
import { outputPath } from '../i18n/lib/core.mjs';
import { renderAppPage } from '../i18n/templates/app-page.mjs';
import { loadContent, migrationSummary } from './i18n-shared.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = join(root, site.previewDirectory);
const contentByLocale = await loadContent(root);

await rm(outputRoot, { recursive: true, force: true });
for (const [locale, localeContent] of Object.entries(contentByLocale)) {
  for (const page of pages) {
    const destination = join(outputRoot, outputPath(locale, page.route));
    await mkdir(dirname(destination), { recursive: true });
    const html = renderAppPage({ locale: locales[locale].htmlLang, page, content: localeContent[page.id], contentByLocale });
    await writeFile(destination, html, 'utf8');
  }
}

await writeFile(join(outputRoot, 'build-report.json'), JSON.stringify({ generatedAt: new Date().toISOString(), ...migrationSummary(contentByLocale) }, null, 2));
console.log(`Localization preview built at ${outputRoot}`);
