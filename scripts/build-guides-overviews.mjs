import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apps = {
  walkbop: {
    name: 'WalkBop',
    intro: 'Practical ideas for walking more, staying motivated and making step challenges fun with friends.',
    source: 'guides'
  },
  fovri: {
    name: 'Fovri',
    intro: 'Practical guides for saving recipes, building a personal cookbook, planning meals and cooking with less friction.',
    source: 'guides'
  },
  bulkbro: {
    name: 'BulkBro',
    intro: 'Straightforward guides for healthy weight gain, calorie tracking, meal planning and understanding your progress.',
    source: 'guides',
    skip: ['editorial-policy'],
    editorial: 'editorial-policy/'
  },
  tiphaven: {
    name: 'TipHaven',
    intro: 'Guides and calculators for tracking tips, understanding earnings, splitting tip pools and planning your take-home pay.',
    source: 'root',
    include: [
      'average-bartender-salary-with-tips',
      'best-tip-tracking-apps-for-servers',
      'how-much-do-servers-make-in-tips',
      'paycheck-calculator-with-tips',
      'server-tip-out-percentage',
      'server-tips-and-taxes',
      'splitting-tips-by-hours-worked',
      'tip-out-calculator',
      'tip-pool-calculator',
      'tip-split-calculator'
    ]
  },
  oqvi: {
    name: 'Oqvi',
    intro: 'Field-friendly guides for identifying plants, flowers, trees, bark and wood with better photos and better clues.',
    source: 'guides'
  },
  migraloom: {
    name: 'MigraLoom',
    intro: 'Simple guides and templates for keeping a useful headache or migraine journal without making it a burden.',
    source: 'guides'
  },
  bumpecho: {
    name: 'Bump Echo',
    intro: 'Gentle ideas for recording pregnancy memories, keeping a journal and creating messages for your future baby.',
    source: 'guides'
  }
};

const favicon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='15' fill='%23111111'/%3E%3Cpath d='M18 14v36h8V36l12 14h10L32 31l15-17H37L26 28V14z' fill='white'/%3E%3C/svg%3E";
const match = (html, pattern) => html.match(pattern)?.[1]?.trim() || '';
const cleanTitle = (title, appName) => title
  .replace(new RegExp(`\\s*[|—-]\\s*${appName.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}.*$`, 'i'), '')
  .replace(/&amp;/g, '&')
  .trim();
const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

for (const [slug, config] of Object.entries(apps)) {
  const guidesDir = path.join(dist, slug, 'guides');
  fs.mkdirSync(guidesDir, { recursive: true });
  const articleSlugs = config.source === 'root'
    ? config.include
    : fs.readdirSync(guidesDir, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name)
        .filter(name => !(config.skip || []).includes(name))
        .sort();

  const articles = articleSlugs.map(articleSlug => {
    const file = config.source === 'root'
      ? path.join(dist, slug, articleSlug, 'index.html')
      : path.join(guidesDir, articleSlug, 'index.html');
    if (!fs.existsSync(file)) throw new Error(`Missing guide: ${file}`);
    const html = fs.readFileSync(file, 'utf8');
    const rawTitle = match(html, /<title>([\s\S]*?)<\/title>/i);
    const description = match(html, /<meta\s+name="description"\s+content="([^"]*)"/i) || `Read the ${config.name} guide.`;
    return {
      title: cleanTitle(rawTitle, config.name),
      description,
      href: config.source === 'root' ? `../${articleSlug}/` : `${articleSlug}/`
    };
  });

  const cards = articles.length
    ? `<div class="guide-grid">${articles.map(article => `<a class="guide-card" href="${article.href}"><h2>${escape(article.title)}</h2><p>${escape(article.description)}</p><span>Read guide →</span></a>`).join('')}</div>`
    : `<section class="guide-empty"><h2>Guides are coming soon.</h2><p>We are preparing practical WalkBop guides. The overview is ready now, so new articles can be added without changing the app page again.</p></section>`;
  const editorial = config.editorial ? `<a href="${config.editorial}">Editorial policy</a>` : '';
  const robots = articles.length ? 'index,follow' : 'noindex,follow';
  const output = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escape(config.intro)}">
  <meta name="robots" content="${robots}">
  <link rel="canonical" href="https://kestoralabs.com/${slug}/guides/">
  <link rel="icon" type="image/svg+xml" href="${favicon}">
  <title>${config.name} Guides — Kestora Labs</title>
  <link rel="stylesheet" href="/guides-page.css?v=20261111-2">
</head>
<body>
  <a class="skip-link" href="#guides">Skip to guides</a>
  <header class="site-header">
    <a class="wordmark" href="/" aria-label="Kestora Labs app portfolio home"><span class="wordmark-name">Kestora Labs</span><span class="wordmark-label">Independent Apps</span></a>
    <nav aria-label="Main navigation"><a href="/">All apps</a></nav>
  </header>
  <main class="guides-main" id="guides">
    <a class="guides-back" href="/${slug}/">← Back to ${config.name}</a>
    <article class="guides-shell">
      <header class="guides-hero"><p class="guides-kicker">${config.name} guides</p><h1>Learn at your own pace.</h1><p class="guides-intro">${escape(config.intro)}</p></header>
      ${cards}
      <div class="guides-meta"><p>${articles.length ? `${articles.length} guide${articles.length === 1 ? '' : 's'} available` : 'New guides will appear here'}</p>${editorial}</div>
    </article>
  </main>
  <footer class="guides-footer"><p>© <span id="year"></span> Kestora Labs</p><nav aria-label="Footer navigation"><a href="/${slug}/">${config.name}</a><a href="/${slug}/privacy.html">Privacy</a><a href="/${slug}/support.html">Support</a><a href="/privacy.html">Website privacy</a></nav></footer>
  <script>document.querySelector('#year').textContent = new Date().getFullYear();</script>
</body>
</html>`;
  fs.writeFileSync(path.join(guidesDir, 'index.html'), output);
  console.log(`${slug}: ${articles.length} guides`);
}
