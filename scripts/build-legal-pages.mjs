import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apps = {
  walkbop: 'WalkBop',
  fovri: 'Fovri',
  bulkbro: 'BulkBro',
  tiphaven: 'TipHaven',
  oqvi: 'Oqvi',
  migraloom: 'MigraLoom',
  bumpecho: 'Bump Echo'
};
const pageFiles = ['privacy.html', 'terms.html', 'support.html', 'health.html'];
const files = [path.join(dist, 'privacy.html')];
for (const slug of Object.keys(apps)) for (const page of pageFiles) {
  const file = path.join(dist, slug, page);
  if (fs.existsSync(file)) files.push(file);
}

const favicon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='15' fill='%23111111'/%3E%3Cpath d='M18 14v36h8V36l12 14h10L32 31l15-17H37L26 28V14z' fill='white'/%3E%3C/svg%3E";
const match = (html, pattern) => html.match(pattern)?.[1]?.trim() || '';
const text = value => value
  .replace(/<br\s*\/?\s*>/gi, ' ')
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&')
  .replace(/&nbsp;/g, ' ')
  .replace(/&#39;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/\s+/g, ' ')
  .trim();
const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const relative = path.relative(dist, file).split(path.sep).join('/');
  const parts = relative.split('/');
  const slug = parts.length === 2 ? parts[0] : null;
  const appName = slug ? apps[slug] : 'Kestora Labs';
  const page = path.basename(file, '.html');
  const main = match(original, /<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const title = match(original, /<title>([\s\S]*?)<\/title>/i) || `${appName} — Kestora Labs`;
  const description = match(original, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = match(original, /<link\s+rel="canonical"\s+href="([^"]*)"/i) || `https://kestoralabs.com/${relative}`;
  const kickerRaw = match(main, /class="(?:[^"]*\s)?(?:legal-kicker|kicker|privacy-eyebrow)(?:\s[^"]*)?"[^>]*>([\s\S]*?)<\//i);
  const h1Raw = match(main, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const introRaw = match(main, /class="(?:[^"]*\s)?(?:legal-intro|intro|lead|lede|privacy-lead)(?:\s[^"]*)?"[^>]*>([\s\S]*?)<\//i);
  const updatedRaw = match(main, /class="(?:[^"]*\s)?(?:legal-updated|updated|privacy-meta)(?:\s[^"]*)?"[^>]*>([\s\S]*?)<\//i);
  const noteRaw = original.includes('class="legal-shell"') ? '' : match(main, /<div\s+class="legal-note"[^>]*>([\s\S]*?)<\/div>/i);
  const sections = [];
  for (const found of main.matchAll(/<section\b([^>]*)>([\s\S]*?)<\/section>/gi)) {
    const attrs = found[1];
    const content = found[2].trim();
    if (/class="[^"]*legal-hero/.test(attrs)) continue;
    const sectionClass = /(?:support-card|contact-block|privacy-choice)/.test(attrs) ? ` ${match(attrs, /class="([^"]*)"/)}` : '';
    sections.push(`<section class="legal-section${sectionClass}">${content}</section>`);
  }
  if (noteRaw) sections.unshift(`<section class="legal-section"><div class="legal-note">${noteRaw}</div></section>`);
  if (!sections.length) throw new Error(`No content sections found in ${relative}`);

  const current = page === 'health' ? 'health' : page;
  const tabs = slug ? [
    ['privacy', 'Privacy'], ['terms', 'Terms'], ['support', 'Support'], ...(slug === 'bulkbro' ? [['health', 'Health']] : [])
  ].map(([href, label]) => `<a href="${href}.html"${current === href ? ' aria-current="page"' : ''}>${label}</a>`).join('') :
    '<a href="/privacy.html" aria-current="page">Website privacy</a>';
  const backHref = slug ? `/${slug}/` : '/';
  const backLabel = slug ? 'Back to app' : 'All apps';
  const footerTabs = slug ? `<a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="support.html">Support</a>` : '<a href="/privacy.html">Website privacy</a>';

  const output = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escape(description)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${escape(canonical)}">
  <link rel="icon" type="image/svg+xml" href="${favicon}">
  <title>${title}</title>
  <link rel="stylesheet" href="/legal-page.css?v=20261111-1">
  <script src="/site.js?v=20261111-language-switch-v2" defer></script>
</head>
<body>
  <a class="skip-link" href="#content">Skip to content</a>
  <header class="site-header">
    <a class="wordmark" href="/" aria-label="Kestora Labs app portfolio home"><span class="wordmark-name">Kestora Labs</span><span class="wordmark-label">Independent Apps</span></a>
    <nav aria-label="Main navigation"><a href="/">All apps</a></nav>
  </header>
  <main class="legal-main" id="content">
    <div class="legal-tools">
      <a class="legal-back" href="${backHref}">← ${backLabel}</a>
      <nav class="legal-tabs${slug === 'bulkbro' ? ' has-health' : ''}" aria-label="${slug ? 'App information' : 'Website information'}">${tabs}</nav>
    </div>
    <article class="legal-shell">
      <header class="legal-hero">
        <p class="legal-kicker">${escape(text(kickerRaw) || appName)}</p>
        <h1>${escape(text(h1Raw) || title)}</h1>
        ${introRaw ? `<p class="legal-intro">${escape(text(introRaw))}</p>` : ''}
        ${updatedRaw ? `<p class="legal-updated">${escape(text(updatedRaw))}</p>` : ''}
      </header>
      <div class="legal-content">${sections.join('\n')}</div>
    </article>
  </main>
  <footer class="legal-site-footer">
    <p>© <span id="year"></span> Kestora Labs</p>
    <nav aria-label="Footer navigation">${footerTabs}<a href="/privacy.html">Website privacy</a><button type="button" data-cookie-settings>Cookie settings</button><a href="#content">Back to top ↑</a></nav>
  </footer>
  <section class="consent-banner" data-consent-banner hidden>
    <div><p class="consent-label">Your privacy, your choice</p><h2>Help us improve this page?</h2><p>Analytics stays off unless you accept. <a href="/privacy.html">Website privacy</a>.</p></div>
    <div class="consent-actions"><button class="consent-secondary" type="button" data-consent-reject>Essential only</button><button class="consent-primary" type="button" data-consent-accept>Accept analytics</button></div>
  </section>
  <script>document.querySelector('#year').textContent = new Date().getFullYear();</script>
</body>
</html>`;
  fs.writeFileSync(file, output.replace(/[ \t]+\n/g, '\n'));
  console.log(`${relative}: ${sections.length} sections`);
}
