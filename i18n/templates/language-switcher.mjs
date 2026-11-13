import { locales } from '../config.mjs';
import { escapeHtml, localeRoute, pageHasContent } from '../lib/core.mjs';

const e = escapeHtml;

export function renderLanguageSwitcher({ locale, page, contentByLocale, label }) {
  const available = Object.keys(contentByLocale)
    .filter(candidate => locales[candidate]?.enabled && pageHasContent(page, candidate, contentByLocale));
  if (available.length < 2) return '';
  const options = available.map(candidate =>
    `<option value="${e(localeRoute(candidate, page.route))}"${candidate === locale ? ' selected' : ''}>${e(locales[candidate].label)}</option>`
  ).join('');
  return `<label class="language-switcher"><span>${e(label)}</span><select onchange="window.location.href=this.value">${options}</select></label>`;
}
