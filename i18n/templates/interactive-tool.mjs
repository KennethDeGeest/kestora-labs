import { absoluteUrl, escapeHtml, hreflangLinks, localeRoute } from '../lib/core.mjs';

const e = escapeHtml;
const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

function renderNode(node, locale) {
  if (typeof node === 'string') return e(node);
  const attrs = Object.entries(node.attrs).map(([name, raw]) => {
    if (raw === null) return ` ${name}`;
    const value = name === 'href' && raw.startsWith('/') ? localeRoute(locale, raw) : raw;
    return ` ${name}="${e(value)}"`;
  }).join('');
  if (voidTags.has(node.tag)) return `<${node.tag}${attrs}>`;
  return `<${node.tag}${attrs}>${node.children.map(child => renderNode(child, locale)).join('')}</${node.tag}>`;
}

function localizeStructuredData(value, locale) {
  if (Array.isArray(value)) return value.map(item => localizeStructuredData(item, locale));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeStructuredData(item, locale)]));
  if (typeof value === 'string' && value.startsWith('https://kestoralabs.com/')) {
    const url = new URL(value);
    return absoluteUrl(locale, `${url.pathname}${url.search}${url.hash}`);
  }
  return value;
}

function renderAttrs(attrs) {
  return Object.entries(attrs).map(([name, value]) => ` ${name}="${e(value)}"`).join('');
}

export function renderInteractiveTool({ locale, page, content, contentByLocale }) {
  const canonical = absoluteUrl(locale, page.route);
  const metaTags = content.meta.tags.map(tag => `<meta${renderAttrs(tag)}>`).join('\n  ');
  const icons = content.meta.icons.map(icon => `<link${renderAttrs(icon)}>`).join('\n  ');
  const styles = content.stylesheets.map(href => `<link rel="stylesheet" href="${e(href)}">`).join('\n  ');
  const scripts = content.externalScripts.map(src => `<script src="${e(src)}" defer></script>`).join('\n  ');
  const jsonLd = content.meta.jsonLd.map(item => `<script type="application/ld+json">${JSON.stringify(localizeStructuredData(item, locale)).replaceAll('<', '\\u003c')}</script>`).join('\n  ');
  const inline = content.inlineScripts.map(script => `<script>${script}</script>`).join('\n  ');
  return `<!doctype html>
<html lang="${e(locale)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${e(content.meta.title)}</title>
  ${metaTags}
  <link rel="canonical" href="${e(canonical)}">
  ${hreflangLinks(page.id, contentByLocale)}
  ${icons}
  ${styles}
  ${scripts}
  ${jsonLd}
</head>
<body>${content.body.map(node => renderNode(node, locale)).join('')}${inline}</body>
</html>`;
}
