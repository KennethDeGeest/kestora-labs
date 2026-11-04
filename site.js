const header = document.querySelector('.site-header');
const progress = document.querySelector('.scroll-progress span');
const year = document.querySelector('#year');
const rail = document.querySelector('#feature-rail');
const current = document.querySelector('#feature-current');
const featureCards = [...document.querySelectorAll('.feature-card')];

year.textContent = new Date().getFullYear();

function updateScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const ratio = max > 0 ? scrollY / max : 0;
  progress.style.transform = `scaleX(${ratio})`;
  header.classList.toggle('is-scrolled', scrollY > 24);
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
  const index = activeFeatureIndex();
  current.textContent = String(index + 1).padStart(2, '0');
  document.querySelector('#feature-prev').disabled = index === 0;
  document.querySelector('#feature-next').disabled = index === featureCards.length - 1;
}

function moveFeature(direction) {
  const next = Math.max(0, Math.min(featureCards.length - 1, activeFeatureIndex() + direction));
  featureCards[next].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

document.querySelector('#feature-prev').addEventListener('click', () => moveFeature(-1));
document.querySelector('#feature-next').addEventListener('click', () => moveFeature(1));
rail.addEventListener('scroll', updateFeatureCounter, { passive: true });

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
    document.querySelector('#filter-status').textContent = `Showing ${visible} ${filter === 'all' ? '' : button.textContent.replace(/\d+/g, '').trim().toLowerCase() + ' '}apps.`;
  });
});

updateFeatureCounter();
