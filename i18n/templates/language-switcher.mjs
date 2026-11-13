import { locales } from '../config.mjs';
import { escapeHtml, localeRoute, pageHasContent } from '../lib/core.mjs';

const e = escapeHtml;

export function renderLanguageSwitcher({ locale, page, contentByLocale, label }) {
  const available = Object.keys(contentByLocale)
    .filter(candidate => locales[candidate]?.enabled && pageHasContent(page, candidate, contentByLocale));
  if (available.length < 2) return '';
  const links = available.map(candidate =>
    `<a href="${e(localeRoute(candidate, page.route))}" lang="${e(locales[candidate].htmlLang)}" hreflang="${e(locales[candidate].htmlLang)}" aria-label="${e(locales[candidate].label)}"${candidate === locale ? ' aria-current="page"' : ''}>${e(candidate.toUpperCase())}</a>`
  ).join('');
  return `<span class="language-switcher" role="group" aria-label="${e(label)}">${links}</span>`;
}
