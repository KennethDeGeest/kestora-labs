import { absoluteUrl, escapeHtml, hreflangLinks, localeRoute } from '../lib/core.mjs';
import { renderLanguageSwitcher } from './language-switcher.mjs';

const e = escapeHtml;

export function renderAppPage({ locale, page, content, common, contentByLocale }) {
  const languageSwitcher = renderLanguageSwitcher({ locale, page, contentByLocale, label: common.ui.language });
  const screenshots = content.screenshots.map((item, index) =>
    `<figure class="screenshot-card"><img src="${e(page.assets.screenshots[index])}" alt="${e(item.alt)}" loading="lazy"></figure>`
  ).join('\n            ');
  const features = content.features.map(item =>
    `<li><strong>${e(item.title)}</strong><span>${e(item.body)}</span></li>`
  ).join('');

  return `<!doctype html>
<html lang="${e(locale)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${e(content.meta.description)}">
  <meta name="theme-color" content="#fafafa">
  <link rel="canonical" href="${e(absoluteUrl(locale, page.route))}">
  ${hreflangLinks(page.id, contentByLocale)}
  <title>${e(content.meta.title)}</title>
  <link rel="stylesheet" href="/site.css?v=20261113-language-menu">
</head>
<body class="app-page-body">
  <header class="site-header">
    <a class="wordmark" href="${e(localeRoute(locale, '/'))}" aria-label="${e(common.brand.homeLabel)}">
      <span class="wordmark-name">${e(common.brand.studio)}</span><span class="wordmark-label">${e(common.brand.label)}</span>
    </a>
    <nav aria-label="${e(common.ui.mainNavigation)}"><a href="${e(localeRoute(locale, '/'))}">${e(common.ui.allApps)}</a>${languageSwitcher}</nav>
  </header>
  <main class="app-page-main">
    <a class="app-page-back" href="${e(localeRoute(locale, '/'))}">← ${e(common.ui.allApps)}</a>
    <article class="app-page-shell">
      <header class="app-case-header">
        <img class="dialog-icon" src="${e(page.assets.icon)}" alt="${e(content.hero.iconAlt)}">
        <div class="app-case-copy">
          <div class="app-case-heading"><h1>${e(content.hero.name)}</h1><p class="dialog-subtitle">${e(content.hero.subtitle)}</p></div>
          <p class="dialog-description">${e(content.hero.description)}</p>
          <div class="app-page-actions"><a class="button dark" href="${e(page.appStore)}">${e(common.ui.viewAppStore)} <span aria-hidden="true">↗</span></a>${page.routes.guides ? `<a class="button" href="${e(localeRoute(locale, page.routes.guides))}">${e(common.ui.browseGuides)} <span aria-hidden="true">→</span></a>` : ''}</div>
        </div>
      </header>
      <section class="app-showcase" aria-label="${e(common.ui.screenshots)}"><div class="screenshot-track">
            ${screenshots}
      </div></section>
      <section class="app-case-details">
        <div class="app-case-summary"><p class="section-label">${e(content.summary.label)}</p><h2>${e(content.summary.title)}</h2><p>${e(content.summary.body)}</p></div>
        <div class="app-case-features"><p class="section-label">${e(common.ui.whatItDoes)}</p><ul>${features}</ul></div>
      </section>
      <section class="app-page-bottom-cta"><div><h2>${e(content.cta.title)}</h2><p>${e(content.cta.body)}</p></div><a class="button dark" href="${e(page.appStore)}">${e(common.ui.viewAppStore)} <span aria-hidden="true">↗</span></a></section>
      <div class="app-case-footer"><p>${e(content.footer.note)}</p><nav class="dialog-legal" aria-label="${e(common.ui.appInformation)}"><a href="${e(localeRoute(locale, page.routes.privacy))}">${e(common.ui.privacy)}</a><a href="${e(localeRoute(locale, page.routes.terms))}">${e(common.ui.terms)}</a><a href="${e(localeRoute(locale, page.routes.support))}">${e(common.ui.support)}</a></nav></div>
    </article>
  </main>
  <footer><p>© <span id="year"></span> ${e(content.footer.copyright)}</p><nav aria-label="${e(common.ui.footerNavigation)}"><a href="${e(localeRoute(locale, '/privacy.html'))}">${e(common.ui.privacy)}</a></nav></footer>
  <script>document.querySelector('#year').textContent = new Date().getFullYear();</script>
</body>
</html>`;
}
