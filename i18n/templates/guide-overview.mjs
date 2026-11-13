import { absoluteUrl, escapeHtml, hreflangLinks, localeRoute } from '../lib/core.mjs';
import { renderLanguageSwitcher } from './language-switcher.mjs';

const e = escapeHtml;
const favicon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='15' fill='%23111111'/%3E%3Cpath d='M18 14v36h8V36l12 14h10L32 31l15-17H37L26 28V14z' fill='white'/%3E%3C/svg%3E";

export function renderGuideOverview({ locale, page, content, guideUi, common, cards, editorialAvailable, contentByLocale }) {
  const languageSwitcher = renderLanguageSwitcher({ locale, page, contentByLocale, label: common.ui.language });
  const cardMarkup = cards.length
    ? `<div class="guide-grid">${cards.map(card => `<a class="guide-card" href="${e(card.href)}"><h2>${e(card.title)}</h2><p>${e(card.description)}</p><span>${e(guideUi.readGuide)}</span></a>`).join('')}</div>`
    : `<section class="guide-empty"><h2>${e(content.emptyTitle)}</h2><p>${e(content.emptyBody)}</p></section>`;
  const guideCount = cards.length === 0
    ? guideUi.newGuides
    : `${cards.length} ${cards.length === 1 ? guideUi.guideAvailable : guideUi.guidesAvailable}`;
  const editorial = editorialAvailable
    ? `<a href="${e(localeRoute(locale, page.routes.editorial))}">${e(guideUi.editorialPolicy)}</a>`
    : '';

  return `<!doctype html>
<html lang="${e(locale)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${e(content.intro)}">
  <meta name="robots" content="${cards.length ? 'index,follow' : 'noindex,follow'}">
  <link rel="canonical" href="${e(absoluteUrl(locale, page.route))}">
  ${hreflangLinks(page.id, contentByLocale)}
  <link rel="icon" type="image/svg+xml" href="${favicon}">
  <title>${e(content.name)} Guides — ${e(common.brand.studio)}</title>
  <link rel="stylesheet" href="/guides-page.css?v=20261113-language-menu">
</head>
<body>
  <a class="skip-link" href="#guides">${e(guideUi.skipToGuides)}</a>
  <header class="site-header">
    <a class="wordmark" href="${e(localeRoute(locale, '/'))}" aria-label="${e(common.brand.homeLabel)}"><span class="wordmark-name">${e(common.brand.studio)}</span><span class="wordmark-label">${e(common.brand.label)}</span></a>
    <nav aria-label="${e(common.ui.mainNavigation)}"><a href="${e(localeRoute(locale, '/'))}">${e(common.ui.allApps)}</a>${languageSwitcher}</nav>
  </header>
  <main class="guides-main" id="guides">
    <a class="guides-back" href="${e(localeRoute(locale, page.routes.app))}">← ${e(guideUi.backTo)} ${e(content.name)}</a>
    <article class="guides-shell">
      <header class="guides-hero"><p class="guides-kicker">${e(content.name)} ${e(guideUi.guides)}</p><h1>${e(guideUi.heroTitle)}</h1><p class="guides-intro">${e(content.intro)}</p></header>
      ${cardMarkup}
      <div class="guides-meta"><p>${e(guideCount)}</p>${editorial}</div>
    </article>
  </main>
  <footer class="guides-footer"><p>© <span id="year"></span> ${e(common.brand.studio)}</p><nav aria-label="${e(common.ui.footerNavigation)}"><a href="${e(localeRoute(locale, page.routes.app))}">${e(content.name)}</a><a href="${e(localeRoute(locale, page.routes.privacy))}">${e(common.ui.privacy)}</a><a href="${e(localeRoute(locale, page.routes.support))}">${e(common.ui.support)}</a><a href="${e(localeRoute(locale, '/privacy.html'))}">${e(guideUi.websitePrivacy)}</a></nav></footer>
  <script>document.querySelector('#year').textContent = new Date().getFullYear();</script>
</body>
</html>`;
}
