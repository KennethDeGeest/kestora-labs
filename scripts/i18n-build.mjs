import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { locales, pages, site } from '../i18n/config.mjs';
import { outputPath } from '../i18n/lib/core.mjs';
import { renderAppPage } from '../i18n/templates/app-page.mjs';
import { renderGuideOverview } from '../i18n/templates/guide-overview.mjs';
import { renderGuideArticle } from '../i18n/templates/guide-article.mjs';
import { loadContent, migrationSummary } from './i18n-shared.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = join(root, site.previewDirectory);
const contentByLocale = await loadContent(root);

await rm(outputRoot, { recursive: true, force: true });
for (const [locale, localeContent] of Object.entries(contentByLocale)) {
  for (const page of pages) {
    const destination = join(outputRoot, outputPath(locale, page.route));
    await mkdir(dirname(destination), { recursive: true });
    let html;
    if (page.type === 'app-page') {
      html = renderAppPage({ locale, page, content: localeContent.pages[page.id], common: localeContent.common, contentByLocale });
    } else if (page.type === 'guide-overview') {
      const content = localeContent.guideOverviews.pages[page.id];
      const app = page.id.split('.')[0];
      const cards = Object.entries(localeContent.guideArticles.pages)
        .filter(([id, article]) => id.startsWith(`${app}.guide.`) && article.card)
        .map(([, article]) => article.card)
        .concat(content.extraCards)
        .sort((left, right) => left.order - right.order);
      html = renderGuideOverview({ locale, page, content, guideUi: localeContent.guideOverviews.ui, common: localeContent.common, cards, contentByLocale });
    } else {
      const content = localeContent.guideArticles.pages[page.id];
      const appId = `${page.id.split('.')[0]}.guides`;
      const appName = localeContent.guideOverviews.pages[appId].name;
      html = renderGuideArticle({ locale, page, content, articleUi: localeContent.guideArticles.ui, common: localeContent.common, appName, contentByLocale });
    }
    await writeFile(destination, html, 'utf8');
  }
}

await writeFile(join(outputRoot, 'build-report.json'), JSON.stringify({ generatedAt: new Date().toISOString(), ...migrationSummary(contentByLocale) }, null, 2));
console.log(`Localization preview built at ${outputRoot}`);
