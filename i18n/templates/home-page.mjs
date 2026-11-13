import { absoluteUrl, escapeHtml, hreflangLinks, localeRoute } from '../lib/core.mjs';
import { renderLanguageSwitcher } from './language-switcher.mjs';

const e = escapeHtml;
const apps = [
  ['walkbop', 'WalkBop', '/assets/walkbop.png?v=20261030'],
  ['fovri', 'Fovri', '/assets/fovri.png'],
  ['bulkbro', 'BulkBro', '/assets/bulkbro.png'],
  ['tiphaven', 'TipHaven', '/assets/tiphaven.png?v=20261014-2'],
  ['oqvi', 'Oqvi', '/assets/treeidentifier.png'],
  ['migraloom', 'MigraLoom', '/assets/migraloom.png'],
  ['bumpecho', 'Bump Echo', '/assets/bumpecho.png'],
  ['calmber', 'Calmber', '/assets/calmber.png']
];

export function renderHomePage({ locale, page, content, common, contentByLocale }) {
  const languageSwitcher = renderLanguageSwitcher({ locale, page, contentByLocale, label: common.ui.language });
  const appIcons = apps.map(([slug, , icon]) => `<a class="app-icon" href="${e(localeRoute(locale, `/${slug}/`))}" aria-label="${e(content.appLabels[slug])}"><img src="${e(icon)}" alt=""></a>`).join('');
  const appOptions = apps.map(([, name]) => `<option>${e(name)}</option>`).join('');
  return `<!doctype html>
<html lang="${e(locale)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${e(content.meta.description)}">
  <link rel="canonical" href="${e(absoluteUrl(locale, page.route))}">
  ${hreflangLinks(page.id, contentByLocale)}
  <meta name="theme-color" content="#fafafa">
  <meta name="legal-template-version" content="20261111-5">
  <title>${e(content.meta.title)}</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='15' fill='%23111111'/%3E%3Cpath d='M18 14v36h8V36l12 14h10L32 31l15-17H37L26 28V14z' fill='white'/%3E%3C/svg%3E">
  <link rel="stylesheet" href="/site.css?v=20261113-language-menu">
</head>
<body>
  <a class="skip-link" href="#apps">${e(content.ui.skipToApps)}</a>
  <header class="site-header">
    <a class="wordmark" href="#top" aria-label="${e(common.brand.homeLabel)}"><span class="wordmark-name">${e(common.brand.studio)}</span><span class="wordmark-label">${e(common.brand.label)}</span></a>
    <nav aria-label="${e(common.ui.mainNavigation)}"><button class="nav-contact contact-trigger" type="button" aria-haspopup="dialog" aria-controls="contact-dialog">${e(content.ui.contact)}</button>${languageSwitcher}</nav>
  </header>
  <main id="top">
    <section class="apps-stage" id="apps" aria-labelledby="apps-title"><h1 id="apps-title" class="sr-only">${e(content.ui.appsTitle)}</h1><div class="icon-row">${appIcons}</div><p class="stage-hint">${e(content.ui.stageHint)}</p></section>
    <section class="contact" id="contact"><p class="eyebrow">${e(content.ui.eyebrow)}</p><h2>${e(content.ui.headline)}</h2><p>${e(content.ui.intro)}</p><button class="button contact-trigger" type="button" aria-haspopup="dialog" aria-controls="contact-dialog">${e(content.ui.getInTouch)} <span aria-hidden="true">↗</span></button></section>
  </main>
  <footer><p>© <span id="year"></span> ${e(common.brand.studio)}</p><nav aria-label="${e(common.ui.footerNavigation)}"><a href="${e(localeRoute(locale, '/privacy.html'))}">${e(common.ui.privacy)}</a></nav></footer>
  <dialog class="contact-dialog" id="contact-dialog" aria-labelledby="contact-dialog-title">
    <button class="dialog-close" type="button" aria-label="${e(content.ui.closeContact)}">×</button>
    <div class="contact-dialog-content"><p class="dialog-kicker">${e(content.ui.dialogKicker)}</p><div id="contact-start"><h2 id="contact-dialog-title">${e(content.ui.dialogTitle)}</h2><p class="contact-dialog-intro">${e(content.ui.dialogIntro)}</p><div class="contact-options">
      <button class="contact-option" id="support-choice" type="button"><span><strong>${e(content.ui.appSupport)}</strong><small>${e(content.ui.appSupportDescription)}</small></span><b aria-hidden="true">→</b></button>
      <a href="mailto:degeestkenneth@gmail.com?subject=General%20Enquiry&amp;body=Hi%20Kenneth%2C%0A%0A"><span><strong>${e(content.ui.generalEnquiry)}</strong><small>${e(content.ui.generalEnquiryDescription)}</small></span><b aria-hidden="true">↗</b></a>
    </div></div><div id="support-step" hidden><button class="support-back" id="support-back" type="button">← ${e(content.ui.back)}</button><h2>${e(content.ui.supportTitle)}</h2><p class="contact-dialog-intro">${e(content.ui.supportIntro)}</p><label class="support-label" for="support-app">${e(content.ui.appLabel)}</label><select class="support-select" id="support-app"><option value="" selected disabled>${e(content.ui.chooseApp)}</option>${appOptions}</select><button class="support-submit" id="support-submit" type="button" disabled>${e(content.ui.continueEmail)} ↗</button></div></div>
  </dialog>
  <script src="/site.js?v=20261111-contact-header"></script>
</body>
</html>`;
}
