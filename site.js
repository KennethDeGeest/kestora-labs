const header = document.querySelector('.site-header');
const progress = document.querySelector('.scroll-progress span');
const year = document.querySelector('#year');
const rail = document.querySelector('#feature-rail');
const current = document.querySelector('#feature-current');
const featureCards = [...document.querySelectorAll('.feature-card')];

if (year) year.textContent = new Date().getFullYear();

function updateScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const ratio = max > 0 ? scrollY / max : 0;
  if (progress) progress.style.transform = `scaleX(${ratio})`;
  if (header) header.classList.toggle('is-scrolled', scrollY > 24);
}
updateScroll();
addEventListener('scroll', updateScroll, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

function activeFeatureIndex() {
  if (!rail || !featureCards.length) return 0;
  const railBox = rail.getBoundingClientRect();
  const center = railBox.left + railBox.width / 2;
  let index = 0;
  let distance = Infinity;
  featureCards.forEach((card, cardIndex) => {
    const box = card.getBoundingClientRect();
    const cardDistance = Math.abs((box.left + box.width / 2) - center);
    if (cardDistance < distance) { distance = cardDistance; index = cardIndex; }
  });
  return index;
}

function updateFeatureCounter() {
  if (!current || !featureCards.length) return;
  const index = activeFeatureIndex();
  current.textContent = String(index + 1).padStart(2, '0');
  const previous = document.querySelector('#feature-prev');
  const next = document.querySelector('#feature-next');
  if (previous) previous.disabled = index === 0;
  if (next) next.disabled = index === featureCards.length - 1;
}

function moveFeature(direction) {
  const next = Math.max(0, Math.min(featureCards.length - 1, activeFeatureIndex() + direction));
  featureCards[next].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

document.querySelector('#feature-prev')?.addEventListener('click', () => moveFeature(-1));
document.querySelector('#feature-next')?.addEventListener('click', () => moveFeature(1));
rail?.addEventListener('scroll', updateFeatureCounter, { passive: true });

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.filter-button').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.app-card').forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
    const visible = document.querySelectorAll('.app-card:not([hidden])').length;
    const status = document.querySelector('#filter-status');
    if (status) {
      const category = filter === 'all' ? '' : button.textContent.replace(/\d+/g, '').trim().toLowerCase() + ' ';
      status.textContent = document.documentElement.lang?.toLowerCase().startsWith('es')
        ? `Mostrando ${visible} ${category}apps.`
        : `Showing ${visible} ${category}apps.`;
    }
  });
});

updateFeatureCounter();

document.querySelectorAll('.language-menu').forEach((menu) => {
  menu.addEventListener('toggle', () => {
    if (!menu.open) return;
    document.querySelectorAll('.language-menu[open]').forEach((other) => {
      if (other !== menu) other.open = false;
    });
  });
});
document.addEventListener('click', (event) => {
  document.querySelectorAll('.language-menu[open]').forEach((menu) => {
    if (!menu.contains(event.target)) menu.open = false;
  });
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const menu = document.querySelector('.language-menu[open]');
  if (!menu) return;
  menu.open = false;
  menu.querySelector('summary')?.focus();
});

const analyticsId = 'G-5L0E24RJJL';
const consentKey = 'kestora-analytics-consent';
const consentBanner = document.querySelector('[data-consent-banner]');
let analyticsLoaded = false;

window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };

function loadAnalytics() {
  if (analyticsLoaded) return;
  analyticsLoaded = true;
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
  window.gtag('js', new Date());
  window.gtag('config', analyticsId, { allow_google_signals: false });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
  document.head.append(script);
}

function setConsent(choice) {
  localStorage.setItem(consentKey, choice);
  if (consentBanner) consentBanner.hidden = true;
  if (choice === 'granted') {
    loadAnalytics();
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
  } else if (analyticsLoaded) {
    window.gtag('consent', 'update', { analytics_storage: 'denied' });
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim();
      if (name.startsWith('_ga')) document.cookie = `${name}=; Max-Age=0; path=/; domain=.kestoralabs.com; SameSite=Lax`;
    });
  }
}

function openConsentSettings() {
  if (!consentBanner) return;
  consentBanner.hidden = false;
  consentBanner.querySelector('button')?.focus();
}

document.querySelector('[data-consent-accept]')?.addEventListener('click', () => setConsent('granted'));
document.querySelector('[data-consent-reject]')?.addEventListener('click', () => setConsent('denied'));
document.querySelectorAll('[data-cookie-settings]').forEach((button) => button.addEventListener('click', openConsentSettings));

const savedConsent = localStorage.getItem(consentKey);
if (savedConsent === 'granted') loadAnalytics();
else if (!savedConsent && consentBanner) consentBanner.hidden = false;

document.querySelectorAll('a[href*="apps.apple.com"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (localStorage.getItem(consentKey) !== 'granted' || !analyticsLoaded) return;
    const card = link.closest('.feature-card, .app-card');
    const appName = link.dataset.appName || card?.querySelector('h3')?.textContent?.trim() || 'Unknown app';
    window.gtag('event', 'app_store_click', {
      app_name: appName,
      link_url: link.href,
      link_position: link.dataset.linkPosition || (card?.classList.contains('feature-card') ? 'featured' : 'app_library')
    });
  });
});

// Make the English/Spanish switch available on every shared page template.
(() => {
  const apps = ['bulkbro', 'tiphaven', 'migraloom', 'bumpecho', 'oqvi', 'fovri', 'walkbop'];
  const path = location.pathname.replace(/\/index\.html$/, '/');
  const spanish = document.documentElement.lang?.toLowerCase().startsWith('es') || path.startsWith('/es/');

  function englishTarget() {
    if (path === '/es/' || path === '/es') return '/';
    if (path === '/es/privacidad/') return '/privacy.html';
    for (const app of apps) {
      const base = `/es/${app}/`;
      if (!path.startsWith(base)) continue;
      const rest = path.slice(base.length);
      if (!rest) return `/${app}/`;
      if (rest === 'privacidad/') return `/${app}/privacy.html`;
      if (rest === 'terminos/') return `/${app}/terms.html`;
      if (rest === 'soporte/') return `/${app}/support.html`;
      if (app === 'bulkbro' && rest === 'calculadora-superavit-calorico/') return '/bulkbro/calorie-surplus-calculator/';
      if (app === 'tiphaven' && rest === 'calculadora-reparto-propinas/') return '/tiphaven/tip-out-calculator/';
      return `/${app}/guides/`;
    }
    return '/';
  }

  function spanishTarget() {
    if (path === '/' || path === '/index.html') return '/es/';
    if (path === '/privacy.html') return '/es/privacidad/';
    for (const app of apps) {
      const base = `/${app}/`;
      if (!path.startsWith(base)) continue;
      const rest = path.slice(base.length);
      if (!rest) return `/es/${app}/`;
      if (rest === 'privacy.html') return `/es/${app}/privacidad/`;
      if (rest === 'terms.html') return `/es/${app}/terminos/`;
      if (rest === 'support.html') return `/es/${app}/soporte/`;
      if (app === 'bulkbro' && rest === 'calorie-surplus-calculator/') return '/es/bulkbro/calculadora-superavit-calorico/';
      if (app === 'tiphaven' && ['tip-out-calculator/', 'tip-pool-calculator/', 'tip-split-calculator/'].includes(rest)) return '/es/tiphaven/calculadora-reparto-propinas/';
      return `/es/${app}/guias/`;
    }
    return '/es/';
  }

  const target = spanish ? englishTarget() : spanishTarget();
  const shortLabel = spanish ? 'EN' : 'ES';
  const fullLabel = spanish ? 'English' : 'Español';
  const aria = spanish ? 'View this site in English' : 'Ver este sitio en español';

  if (!document.querySelector('#kestora-language-switch-style')) {
    const style = document.createElement('style');
    style.id = 'kestora-language-switch-style';
    style.textContent = '.kestora-language-switch{display:inline-flex!important;align-items:center;justify-content:center;gap:.35rem;min-width:2.8rem;padding:.58rem .72rem!important;border:1px solid currentColor!important;border-radius:999px!important;font:800 .68rem/1 system-ui,sans-serif!important;letter-spacing:.08em!important;text-decoration:none!important;text-transform:uppercase!important;white-space:nowrap}.kestora-language-switch:before{content:"🌐";font-size:.75rem}.kestora-language-footer{display:inline-flex!important;align-items:center;gap:.4rem;text-decoration:underline!important;text-underline-offset:.2rem}@media(max-width:760px){.kestora-language-switch{padding:.52rem .62rem!important;min-width:auto}.kestora-language-switch:before{display:none}}';
    document.head.append(style);
  }

  const headerNav = document.querySelector('.site-header nav, .legal-nav nav, header nav');
  if (headerNav && !headerNav.querySelector('[data-language-switch]')) {
    const link = document.createElement('a');
    link.href = target;
    link.className = 'kestora-language-switch';
    link.dataset.languageSwitch = '';
    link.hreflang = spanish ? 'en' : 'es';
    link.lang = spanish ? 'en' : 'es';
    link.setAttribute('aria-label', aria);
    link.textContent = shortLabel;
    headerNav.append(link);
  }

  const footerNav = document.querySelector('.site-footer nav, .legal-footer nav, footer nav');
  if (footerNav && !footerNav.querySelector('[data-language-switch]')) {
    const link = document.createElement('a');
    link.href = target;
    link.className = 'kestora-language-footer';
    link.dataset.languageSwitch = '';
    link.hreflang = spanish ? 'en' : 'es';
    link.lang = spanish ? 'en' : 'es';
    link.setAttribute('aria-label', aria);
    link.textContent = fullLabel;
    footerNav.append(link);
  }
})();
