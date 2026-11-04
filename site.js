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
    if (status) status.textContent = `Showing ${visible} ${filter === 'all' ? '' : button.textContent.replace(/\d+/g, '').trim().toLowerCase() + ' '}apps.`;
  });
});

updateFeatureCounter();

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
