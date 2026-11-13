import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { locales, pages } from '../i18n/config.mjs';
import { validateRegistry } from '../i18n/lib/core.mjs';

export async function loadContent(root) {
  const contentByLocale = {};
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
      legalPages: JSON.parse(await readFile(join(directory, 'legal-pages.json'), 'utf8'))
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
