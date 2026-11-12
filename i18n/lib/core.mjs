import { locales, pages, site } from '../config.mjs';

export const escapeHtml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

export function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

export function localeRoute(locale, route) {
  const config = locales[locale];
  invariant(config, `Unknown locale: ${locale}`);
  invariant(route.startsWith('/'), `Route must start with /: ${route}`);
  return `${config.prefix}${route}`.replaceAll('//', '/');
}

export function absoluteUrl(locale, route) {
  return `${site.origin}${localeRoute(locale, route)}`;
}

export function outputPath(locale, route) {
  const localized = localeRoute(locale, route).replace(/^\//, '');
  return localized.endsWith('/') ? `${localized}index.html` : localized;
}

export function hreflangLinks(pageId, contentByLocale) {
  const page = pages.find(item => item.id === pageId);
  invariant(page, `Unknown page: ${pageId}`);
  const available = Object.keys(contentByLocale)
    .filter(locale => locales[locale]?.enabled && (
      contentByLocale[locale]?.pages?.[pageId] ||
      contentByLocale[locale]?.guideOverviews?.pages?.[pageId] ||
      contentByLocale[locale]?.guideArticles?.pages?.[pageId]
    ))
    .sort();
  const links = available.map(locale =>
    `<link rel="alternate" hreflang="${escapeHtml(locales[locale].htmlLang)}" href="${escapeHtml(absoluteUrl(locale, page.route))}">`
  );
  if (available.includes(site.sourceLocale)) {
    links.push(`<link rel="alternate" hreflang="x-default" href="${escapeHtml(absoluteUrl(site.sourceLocale, page.route))}">`);
  }
  return links.join('\n  ');
}

const forbiddenMarkup = /[<>]|\{\{/;

export function validatePlainText(value, path) {
  invariant(typeof value === 'string' && value.trim(), `${path} must be a non-empty string`);
  invariant(!forbiddenMarkup.test(value), `${path} must contain text only; HTML and template tokens are forbidden`);
}

export function validateUrl(value, path, { internal = false } = {}) {
  invariant(typeof value === 'string' && value.trim(), `${path} must be a URL`);
  if (internal) invariant(value.startsWith('/'), `${path} must be a root-relative URL`);
  else invariant(value.startsWith('/') || /^https:\/\//.test(value), `${path} must use / or https://`);
  invariant(!/["'<>\s]/.test(value), `${path} contains unsafe URL characters`);
}

function validateKeys(object, expected, path) {
  invariant(object && typeof object === 'object' && !Array.isArray(object), `${path} must be an object`);
  const actual = Object.keys(object).sort();
  const wanted = [...expected].sort();
  invariant(JSON.stringify(actual) === JSON.stringify(wanted), `${path} keys must be exactly: ${wanted.join(', ')}`);
}

export function validateCommon(content, path) {
  validateKeys(content, ['brand', 'ui'], path);
  validateKeys(content.brand, ['studio', 'label', 'homeLabel'], `${path}.brand`);
  validateKeys(content.ui, ['allApps', 'viewAppStore', 'browseGuides', 'whatItDoes', 'screenshots', 'mainNavigation', 'appInformation', 'footerNavigation', 'privacy', 'terms', 'support'], `${path}.ui`);
  for (const [section, object] of Object.entries(content)) {
    for (const [key, value] of Object.entries(object)) validatePlainText(value, `${path}.${section}.${key}`);
  }
}

export function validateAppPage(content, path) {
  validateKeys(content, ['meta', 'hero', 'screenshots', 'summary', 'features', 'cta', 'footer'], path);
  validateKeys(content.meta, ['title', 'description'], `${path}.meta`);
  validateKeys(content.hero, ['name', 'subtitle', 'description', 'iconAlt'], `${path}.hero`);
  validateKeys(content.summary, ['label', 'title', 'body'], `${path}.summary`);
  validateKeys(content.cta, ['title', 'body'], `${path}.cta`);
  validateKeys(content.footer, ['note', 'copyright'], `${path}.footer`);

  for (const [section, object] of Object.entries(content)) {
    if (['screenshots', 'features'].includes(section)) continue;
    for (const [key, value] of Object.entries(object)) {
      validatePlainText(value, `${path}.${section}.${key}`);
    }
  }

  invariant(Array.isArray(content.screenshots) && content.screenshots.length === 3, `${path}.screenshots must contain exactly 3 items`);
  content.screenshots.forEach((item, index) => {
    validateKeys(item, ['alt'], `${path}.screenshots[${index}]`);
    validatePlainText(item.alt, `${path}.screenshots[${index}].alt`);
  });

  invariant(Array.isArray(content.features) && content.features.length >= 1, `${path}.features must not be empty`);
  content.features.forEach((item, index) => {
    validateKeys(item, ['title', 'body'], `${path}.features[${index}]`);
    validatePlainText(item.title, `${path}.features[${index}].title`);
    validatePlainText(item.body, `${path}.features[${index}].body`);
  });
}

export function validateGuideOverviews(content, path) {
  validateKeys(content, ['ui', 'pages'], path);
  validateKeys(content.ui, ['skipToGuides', 'heroTitle', 'readGuide', 'guidesAvailable', 'guideAvailable', 'newGuides', 'editorialPolicy', 'websitePrivacy'], `${path}.ui`);
  for (const [key, value] of Object.entries(content.ui)) validatePlainText(value, `${path}.ui.${key}`);
  for (const [pageId, page] of Object.entries(content.pages)) {
    validateKeys(page, ['name', 'intro', 'emptyTitle', 'emptyBody', 'extraCards'], `${path}.pages.${pageId}`);
    for (const [key, value] of Object.entries(page)) if (key !== 'extraCards') validatePlainText(value, `${path}.pages.${pageId}.${key}`);
    invariant(Array.isArray(page.extraCards), `${path}.pages.${pageId}.extraCards must be an array`);
    page.extraCards.forEach((card, index) => {
      validateKeys(card, ['title', 'description', 'href', 'order'], `${path}.pages.${pageId}.extraCards[${index}]`);
      validatePlainText(card.title, `${path}.pages.${pageId}.extraCards[${index}].title`);
      validatePlainText(card.description, `${path}.pages.${pageId}.extraCards[${index}].description`);
      invariant(typeof card.href === 'string' && !/["'<>\s]/.test(card.href), `${path}.pages.${pageId}.extraCards[${index}].href is unsafe`);
      invariant(Number.isInteger(card.order) && card.order >= 0, `${path}.pages.${pageId}.extraCards[${index}].order is invalid`);
    });
  }
}

const articleTags = new Set(['a', 'aside', 'details', 'div', 'h1', 'h2', 'h3', 'header', 'img', 'li', 'ol', 'p', 'section', 'span', 'strong', 'summary', 'table', 'tbody', 'td', 'th', 'thead', 'time', 'tr', 'ul']);
const articleAttrs = new Set(['alt', 'aria-label', 'aria-labelledby', 'class', 'datetime', 'height', 'href', 'id', 'open', 'rel', 'src', 'width']);

function validateArticleNode(node, path) {
  if (typeof node === 'string') return;
  invariant(node && typeof node === 'object' && !Array.isArray(node), `${path} must be a text or element node`);
  validateKeys(node, ['tag', 'attrs', 'children'], path);
  invariant(articleTags.has(node.tag), `${path}.tag is not allowed: ${node.tag}`);
  invariant(node.attrs && typeof node.attrs === 'object' && !Array.isArray(node.attrs), `${path}.attrs must be an object`);
  for (const [name, value] of Object.entries(node.attrs)) {
    invariant(articleAttrs.has(name), `${path}.attrs.${name} is not allowed`);
    invariant(value === null || typeof value === 'string', `${path}.attrs.${name} must be text or null`);
    if (['href', 'src'].includes(name) && value !== null) invariant(!/^javascript:/i.test(value) && !/["'<>\s]/.test(value), `${path}.attrs.${name} is unsafe`);
  }
  invariant(Array.isArray(node.children), `${path}.children must be an array`);
  node.children.forEach((child, index) => validateArticleNode(child, `${path}.children[${index}]`));
}

function articleSkeleton(nodes) {
  return nodes.map(node => typeof node === 'string'
    ? null
    : { tag: node.tag, attrs: node.attrs, children: articleSkeleton(node.children) });
}

export function validateGuideArticles(content, path) {
  validateKeys(content, ['ui', 'pages'], path);
  validateKeys(content.ui, ['skipToArticle', 'allGuides', 'backTo', 'guidesLower', 'guides', 'calculator', 'healthDisclaimer', 'websitePrivacy'], `${path}.ui`);
  for (const [key, value] of Object.entries(content.ui)) validatePlainText(value, `${path}.ui.${key}`);
  for (const [pageId, page] of Object.entries(content.pages)) {
    validateKeys(page, ['meta', 'article', 'card'], `${path}.pages.${pageId}`);
    validateKeys(page.meta, ['title', 'description', 'robots', 'themeColor', 'appleItunesApp', 'ogType', 'ogTitle', 'ogDescription', 'ogImage', 'twitterCard', 'icon', 'jsonLd'], `${path}.pages.${pageId}.meta`);
    for (const [key, value] of Object.entries(page.meta)) {
      if (key !== 'jsonLd' && !(key === 'appleItunesApp' && value === '')) validatePlainText(value, `${path}.pages.${pageId}.meta.${key}`);
    }
    invariant(Array.isArray(page.meta.jsonLd) && page.meta.jsonLd.length, `${path}.pages.${pageId}.meta.jsonLd must not be empty`);
    invariant(Array.isArray(page.article) && page.article.length, `${path}.pages.${pageId}.article must not be empty`);
    page.article.forEach((node, index) => validateArticleNode(node, `${path}.pages.${pageId}.article[${index}]`));
    if (page.card !== null) {
      validateKeys(page.card, ['title', 'description', 'href', 'order'], `${path}.pages.${pageId}.card`);
      validatePlainText(page.card.title, `${path}.pages.${pageId}.card.title`);
      validatePlainText(page.card.description, `${path}.pages.${pageId}.card.description`);
      invariant(typeof page.card.href === 'string' && !/["'<>\s]/.test(page.card.href), `${path}.pages.${pageId}.card.href is unsafe`);
      invariant(Number.isInteger(page.card.order) && page.card.order >= 0, `${path}.pages.${pageId}.card.order must be a non-negative integer`);
    }
  }
}

export function validateRegistry(contentByLocale) {
  const enabled = Object.entries(locales).filter(([, config]) => config.enabled).map(([locale]) => locale);
  invariant(enabled.includes(site.sourceLocale), 'The source locale must remain enabled');
  const pageIds = new Set();
  const routes = new Set();
  for (const locale of enabled) {
    invariant(contentByLocale[locale]?.common, `Missing ${locale} common content`);
    validateCommon(contentByLocale[locale].common, `${locale}.common`);
    invariant(contentByLocale[locale]?.guideOverviews, `Missing ${locale} guide overview content`);
    validateGuideOverviews(contentByLocale[locale].guideOverviews, `${locale}.guideOverviews`);
    invariant(contentByLocale[locale]?.guideArticles, `Missing ${locale} guide article content`);
    validateGuideArticles(contentByLocale[locale].guideArticles, `${locale}.guideArticles`);
  }
  for (const page of pages) {
    invariant(!pageIds.has(page.id), `Duplicate page id: ${page.id}`);
    invariant(!routes.has(page.route), `Duplicate route: ${page.route}`);
    pageIds.add(page.id);
    routes.add(page.route);
    invariant(['app-page', 'guide-overview', 'guide-article'].includes(page.type), `Unsupported page type: ${page.type}`);
    if (page.type === 'app-page') {
      validateUrl(page.appStore, `${page.id}.appStore`);
      validateUrl(page.assets.icon, `${page.id}.assets.icon`, { internal: true });
      invariant(page.assets.screenshots.length === 3, `${page.id}.assets.screenshots must contain exactly 3 items`);
      page.assets.screenshots.forEach((url, index) => validateUrl(url, `${page.id}.assets.screenshots[${index}]`, { internal: true }));
      for (const locale of enabled) {
        invariant(contentByLocale[locale]?.pages?.[page.id], `Missing ${locale} content for ${page.id}`);
        validateAppPage(contentByLocale[locale].pages[page.id], `${locale}.${page.id}`);
      }
    } else if (page.type === 'guide-overview') {
      invariant(['guides', 'root'].includes(page.articles.source), `${page.id}.articles.source is invalid`);
      invariant(Array.isArray(page.articles.skip), `${page.id}.articles.skip must be an array`);
      if (page.articles.source === 'root') invariant(Array.isArray(page.articles.include) && page.articles.include.length, `${page.id}.articles.include must not be empty`);
      for (const locale of enabled) {
        invariant(contentByLocale[locale]?.guideOverviews?.pages?.[page.id], `Missing ${locale} guide overview content for ${page.id}`);
      }
    } else {
      const sourceArticle = contentByLocale[site.sourceLocale]?.guideArticles?.pages?.[page.id];
      for (const locale of enabled) {
        const localized = contentByLocale[locale]?.guideArticles?.pages?.[page.id];
        invariant(localized, `Missing ${locale} guide article content for ${page.id}`);
        if (locale !== site.sourceLocale) {
          invariant(JSON.stringify(articleSkeleton(localized.article)) === JSON.stringify(articleSkeleton(sourceArticle.article)), `${locale}.${page.id} article structure must match English`);
          invariant(localized.card?.href === sourceArticle.card?.href && localized.card?.order === sourceArticle.card?.order, `${locale}.${page.id} card route and order must match English`);
        }
      }
    }
    for (const [name, route] of Object.entries(page.routes)) {
      if (route !== null) validateUrl(route, `${page.id}.routes.${name}`, { internal: true });
    }
  }
}
