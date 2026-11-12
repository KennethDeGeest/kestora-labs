import { absoluteUrl, escapeHtml, hreflangLinks, localeRoute } from '../lib/core.mjs';

const e = escapeHtml;
const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

function localizeUrl(locale, value) {
  return value.startsWith('/') && !value.startsWith('//') ? localeRoute(locale, value) : value;
}

function renderNode(node, locale) {
  if (typeof node === 'string') return e(node);
  const attrs = Object.entries(node.attrs).map(([name, raw]) => {
    if (raw === null) return ` ${name}`;
    const value = ['href', 'src'].includes(name) ? localizeUrl(locale, raw) : raw;
    return ` ${name}="${e(value)}"`;
  }).join('');
  if (voidTags.has(node.tag)) return `<${node.tag}${attrs}>`;
  return `<${node.tag}${attrs}>${node.children.map(child => renderNode(child, locale)).join('')}</${node.tag}>`;
}

export function renderGuideArticle({ locale, page, content, articleUi, common, appName, contentByLocale }) {
  const canonical = absoluteUrl(locale, page.route);
  const jsonLd = content.meta.jsonLd.map(item => {
    const localized = structuredClone(item);
    if (localized.mainEntityOfPage) localized.mainEntityOfPage = canonical;
    if (localized['@type'] === 'BreadcrumbList') {
      for (const entry of localized.itemListElement ?? []) {
        if (entry.item?.startsWith('https://kestoralabs.com/')) {
          const route = new URL(entry.item).pathname;
          entry.item = absoluteUrl(locale, route);
        }
      }
    }
    return `<script type="application/ld+json">${JSON.stringify(localized).replaceAll('<', '\\u003c')}</script>`;
  }).join('\n  ');

  return `<!doctype html>
<html lang="${e(locale)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${e(content.meta.title)}</title>
  <meta name="description" content="${e(content.meta.description)}">
  <meta name="robots" content="${e(content.meta.robots)}">
  <meta name="theme-color" content="${e(content.meta.themeColor)}">
  ${content.meta.appleItunesApp ? `<meta name="apple-itunes-app" content="${e(content.meta.appleItunesApp)}">` : ''}
  <link rel="canonical" href="${e(canonical)}">
  ${hreflangLinks(page.id, contentByLocale)}
  <meta property="og:type" content="${e(content.meta.ogType)}">
  <meta property="og:title" content="${e(content.meta.ogTitle)}">
  <meta property="og:description" content="${e(content.meta.ogDescription)}">
  <meta property="og:url" content="${e(canonical)}">
  <meta property="og:image" content="${e(content.meta.ogImage)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="${e(content.meta.twitterCard)}">
  <link rel="icon" href="${e(content.meta.icon)}">
  <link rel="stylesheet" href="/guide-article.css?v=20261111-3">
  ${jsonLd}
</head>
<body>
  <a class="skip-link" href="#article">${e(articleUi.skipToArticle)}</a>
  <header class="site-header">
    <a class="wordmark" href="${e(localeRoute(locale, '/'))}" aria-label="${e(common.brand.homeLabel)}"><span class="wordmark-name">${e(common.brand.studio)}</span><span class="wordmark-label">${e(common.brand.label)}</span></a>
    <nav aria-label="${e(common.ui.mainNavigation)}"><a href="${e(localeRoute(locale, page.routes.app))}">${e(appName)}</a><a href="${e(localeRoute(locale, page.routes.guides))}">${e(articleUi.allGuides)}</a></nav>
  </header>
  <main class="article-main">
    <a class="article-back" href="${e(localeRoute(locale, page.routes.guides))}">← ${e(articleUi.backTo)} ${e(appName)} ${e(articleUi.guidesLower)}</a>
    <article class="article-shell" id="article">${content.article.map(node => renderNode(node, locale)).join('')}</article>
  </main>
  <footer class="article-footer"><p>© <span id="year"></span> ${e(common.brand.studio)}</p><nav aria-label="${e(common.ui.footerNavigation)}"><a href="${e(localeRoute(locale, page.routes.app))}">${e(appName)}</a><a href="${e(localeRoute(locale, page.routes.guides))}">${e(articleUi.guides)}</a>${page.routes.calculator ? `<a href="${e(localeRoute(locale, page.routes.calculator))}">${e(articleUi.calculator)}</a>` : ''}<a href="${e(localeRoute(locale, page.routes.privacy))}">${e(common.ui.privacy)}</a>${page.routes.health ? `<a href="${e(localeRoute(locale, page.routes.health))}">${e(articleUi.healthDisclaimer)}</a>` : ''}${page.routes.terms ? `<a href="${e(localeRoute(locale, page.routes.terms))}">${e(common.ui.terms)}</a>` : ''}<a href="${e(localeRoute(locale, page.routes.support))}">${e(common.ui.support)}</a><a href="${e(localeRoute(locale, '/privacy.html'))}">${e(articleUi.websitePrivacy)}</a></nav></footer>
  <script>document.querySelector('#year').textContent = new Date().getFullYear();const toc=document.querySelector('.article-toc');const tocBreakpoint=matchMedia('(max-width: 860px)');const syncToc=()=>{if(tocBreakpoint.matches)toc.removeAttribute('open');else toc.setAttribute('open','');};syncToc();tocBreakpoint.addEventListener('change',syncToc);</script>
</body>
</html>`;
}
