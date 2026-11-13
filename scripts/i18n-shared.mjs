import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { locales, pages } from '../i18n/config.mjs';
import { validateRegistry } from '../i18n/lib/core.mjs';
import { localizeLegalPages } from './legal-localization.mjs';

export async function loadContent(root) {
  const contentByLocale = {};
  const sourceDirectory = join(root, 'i18n', 'content', 'en');
  const sourceLegalPages = JSON.parse(await readFile(join(sourceDirectory, 'legal-pages.json'), 'utf8'));
  for (const [locale, config] of Object.entries(locales)) {
    if (!config.enabled) continue;
    const directory = join(root, 'i18n', 'content', locale);
    contentByLocale[locale] = {
      home: JSON.parse(await readFile(join(directory, 'home.json'), 'utf8')),
      common: JSON.parse(await readFile(join(directory, 'common.json'), 'utf8')),
      pages: JSON.parse(await readFile(join(directory, 'pages.json'), 'utf8')),
      guideOverviews: JSON.parse(await readFile(join(directory, 'guide-overviews.json'), 'utf8')),
      guideArticles: JSON.parse(await readFile(join(directory, 'guide-articles.json'), 'utf8')),
      tools: JSON.parse(await readFile(join(directory, 'tools.json'), 'utf8')),
      legalPages: locale === 'en'
        ? sourceLegalPages
        : localizeLegalPages(sourceLegalPages, JSON.parse(await readFile(join(directory, 'legal-translations.json'), 'utf8')), locale)
    };
  }
  validateRegistry(contentByLocale);
  return contentByLocale;
}

export function migrationSummary(contentByLocale) {
  return {
    configuredLocales: Object.keys(locales),
    registeredPages: pages.length,
    pageTypes: [...new Set(pages.map(page => page.type))]
  };
}
