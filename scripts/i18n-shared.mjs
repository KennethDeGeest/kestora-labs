import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { locales, pages } from '../i18n/config.mjs';
import { validateRegistry } from '../i18n/lib/core.mjs';

export async function loadContent(root) {
  const contentByLocale = {};
  for (const [locale, config] of Object.entries(locales)) {
    if (!config.enabled) continue;
    const file = join(root, 'i18n', 'content', locale, 'pages.json');
    contentByLocale[locale] = JSON.parse(await readFile(file, 'utf8'));
  }
  validateRegistry(contentByLocale);
  return contentByLocale;
}

export function migrationSummary(contentByLocale) {
  return {
    enabledLocales: Object.keys(contentByLocale),
    disabledLocales: Object.entries(locales).filter(([, config]) => !config.enabled).map(([locale]) => locale),
    registeredPages: pages.length,
    pageTypes: [...new Set(pages.map(page => page.type))]
  };
}
