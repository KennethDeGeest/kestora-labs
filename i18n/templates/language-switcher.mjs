import { locales } from '../config.mjs';
import { escapeHtml, localeRoute, pageHasContent } from '../lib/core.mjs';

const e = escapeHtml;

export function renderLanguageSwitcher({ locale, page, contentByLocale, label }) {
  const available = Object.keys(contentByLocale)
    .filter(candidate => locales[candidate]?.enabled && pageHasContent(page, candidate, contentByLocale));
  if (available.length < 2) return '';
  const links = available.map(candidate =>
    `<a href="${e(localeRoute(candidate, page.route))}" lang="${e(locales[candidate].htmlLang)}" hreflang="${e(locales[candidate].htmlLang)}"${candidate === locale ? ' aria-current="page"' : ''}><span class="language-option-name">${e(locales[candidate].label)}</span><span class="language-option-code">${e(candidate.toUpperCase())}</span><span class="language-check" aria-hidden="true">${candidate === locale ? '✓' : ''}</span></a>`
  ).join('');
  return `<details class="language-switcher"><summary aria-label="${e(label)}"><svg class="language-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9S14.4 18.5 12 21M12 3C9.6 5.5 8.4 8.5 8.4 12s1.2 6.5 3.6 9"></path></svg><span>${e(locale.toUpperCase())}</span><svg class="language-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"></path></svg></summary><div class="language-menu"><p>${e(label)}</p><div class="language-options">${links}</div></div></details>`;
}
