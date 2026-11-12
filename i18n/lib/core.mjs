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
    .filter(locale => locales[locale]?.enabled && contentByLocale[locale]?.pages?.[pageId])
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

export function validateRegistry(contentByLocale) {
  const enabled = Object.entries(locales).filter(([, config]) => config.enabled).map(([locale]) => locale);
  invariant(enabled.includes(site.sourceLocale), 'The source locale must remain enabled');
  const pageIds = new Set();
  const routes = new Set();
  for (const page of pages) {
    invariant(!pageIds.has(page.id), `Duplicate page id: ${page.id}`);
    invariant(!routes.has(page.route), `Duplicate route: ${page.route}`);
    pageIds.add(page.id);
    routes.add(page.route);
    invariant(page.type === 'app-page', `Unsupported page type: ${page.type}`);
    validateUrl(page.appStore, `${page.id}.appStore`);
    validateUrl(page.assets.icon, `${page.id}.assets.icon`, { internal: true });
    invariant(page.assets.screenshots.length === 3, `${page.id}.assets.screenshots must contain exactly 3 items`);
    page.assets.screenshots.forEach((url, index) => validateUrl(url, `${page.id}.assets.screenshots[${index}]`, { internal: true }));
    for (const [name, route] of Object.entries(page.routes)) {
      if (route !== null) validateUrl(route, `${page.id}.routes.${name}`, { internal: true });
    }
    for (const locale of enabled) {
      invariant(contentByLocale[locale]?.common, `Missing ${locale} common content`);
      validateCommon(contentByLocale[locale].common, `${locale}.common`);
      invariant(contentByLocale[locale]?.pages?.[page.id], `Missing ${locale} content for ${page.id}`);
      validateAppPage(contentByLocale[locale].pages[page.id], `${locale}.${page.id}`);
    }
  }
}
