import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { locales, pages, site } from '../i18n/config.mjs';
import { absoluteUrl, outputPath, pageEnabledForLocale } from '../i18n/lib/core.mjs';
import { loadContent } from './i18n-shared.mjs';
import './i18n-build.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const previewRoot = join(root, site.previewDirectory);
const contentByLocale = await loadContent(root);
const lastmod = process.env.I18N_LASTMOD || new Date().toISOString().slice(0, 10);

for (const [locale, config] of Object.entries(locales)) {
  if (!config.enabled) continue;
  if (config.prefix) await rm(join(root, config.prefix.replace(/^\//, '')), { recursive: true, force: true });
  for (const page of pages) {
    if (!pageEnabledForLocale(page, locale)) continue;
    const relative = outputPath(locale, page.route);
    const destination = join(root, relative);
    await mkdir(dirname(destination), { recursive: true });
    const html = (await readFile(join(previewRoot, relative), 'utf8')).replace(/[ \t]+$/gm, '');
    await writeFile(destination, html, 'utf8');
  }
}

const sitemapPath = join(root, 'sitemap.xml');
let sitemap = await readFile(sitemapPath, 'utf8');
for (const [locale, config] of Object.entries(locales)) {
  if (locale === site.sourceLocale || !config.prefix) continue;
  const prefix = `${site.origin}${config.prefix}/`;
  sitemap = sitemap.replace(/\s*<url><loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g, (entry, loc) => loc.startsWith(prefix) ? '' : entry);
}

const localizedEntries = [];
for (const [locale, config] of Object.entries(locales)) {
  if (locale === site.sourceLocale || !config.enabled) continue;
  const localeContent = contentByLocale[locale];
  for (const page of pages) {
    if (!pageEnabledForLocale(page, locale)) continue;
    if (page.type === 'guide-overview') {
      const app = page.id.split('.')[0];
      const content = localeContent.guideOverviews.pages[page.id];
      const cards = Object.entries(localeContent.guideArticles.pages)
        .filter(([id, article]) => id.startsWith(`${app}.guide.`) && article.card)
        .length + content.extraCards.length;
      if (cards === 0) continue;
    }
    localizedEntries.push(`  <url><loc>${absoluteUrl(locale, page.route)}</loc><lastmod>${lastmod}</lastmod></url>`);
  }
}
sitemap = sitemap.replace(/\s*<\/urlset>\s*$/, `\n\n${localizedEntries.join('\n')}\n\n</urlset>\n`);
await writeFile(sitemapPath, sitemap, 'utf8');
console.log(`Promoted ${Object.values(locales).filter(locale => locale.enabled).length} locale(s); added ${localizedEntries.length} localized sitemap URL(s).`);
