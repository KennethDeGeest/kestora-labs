import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const guidesRoot = path.join(root, 'bulkbro', 'guides');
const slugs = fs.readdirSync(guidesRoot).filter((slug) => fs.existsSync(path.join(guidesRoot, slug, 'index.html'))).sort();

const strip = (value = '') => value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const pick = (html, pattern, fallback = '') => html.match(pattern)?.[1]?.trim() || fallback;
const attr = (html, name) => pick(html, new RegExp(`<meta\\s+(?:[^>]*?)${name}="([^"]+)"`, 'i'));

const originals = new Map(slugs.map((slug) => [slug, fs.readFileSync(path.join(guidesRoot, slug, 'index.html'), 'utf8')]));
const titles = new Map(slugs.map((slug) => [slug, strip(pick(originals.get(slug), /<h1>([\s\S]*?)<\/h1>/i, slug.replaceAll('-', ' ')))]));
const publicSlugs = slugs.filter((slug) => slug !== 'editorial-policy');

for (const slug of slugs) {
  const old = originals.get(slug);
  if (old.includes('class="article-shell"')) {
    const currentH1 = strip(pick(old, /<h1>([\s\S]*?)<\/h1>/i));
    const refined = old.replace('<strong>Quick answer</strong>', `<strong>${currentH1}</strong>`);
    if (refined !== old) fs.writeFileSync(path.join(guidesRoot, slug, 'index.html'), refined);
    console.log(`${slug}: already standardized`);
    continue;
  }

  const title = strip(pick(old, /<title>([\s\S]*?)<\/title>/i));
  const h1 = strip(pick(old, /<h1>([\s\S]*?)<\/h1>/i));
  const description = pick(old, /<meta name="description" content="([^"]+)"/i);
  const canonical = pick(old, /<link rel="canonical" href="([^"]+)"/i);
  const kicker = strip(pick(old, /<p class="eyebrow">([\s\S]*?)<\/p>/i, 'BulkBro practical guide'));
  const lead = strip(pick(old, /<p class="seo-lead">([\s\S]*?)<\/p>/i));
  const readTime = pick(old, /·\s*(\d+ min read)/i, '4 min read');
  const jsonLd = [...old.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((match) => `  <script type="application/ld+json">${match[1]}</script>`).join('\n');
  const socialTitle = pick(old, /<meta property="og:title" content="([^"]+)"/i, title);
  const socialDescription = pick(old, /<meta property="og:description" content="([^"]+)"/i, description);
  const socialImage = pick(old, /<meta property="og:image" content="([^"]+)"/i, 'https://kestoralabs.com/assets/social/bulkbro-guides.png');
  const smartBanner = pick(old, /<meta name="apple-itunes-app" content="([^"]+)"/i);

  const tocHtml = pick(old, /<aside class="toc">[\s\S]*?<p>[^<]*<\/p>([\s\S]*?)<\/aside>/i);
  let content = pick(old, /<div class="article">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/i);
  if (!content) content = pick(old, /<article class="article">([\s\S]*?)<\/article>\s*<\/div>\s*<\/section>/i);
  const quick = content.match(/<div class="quick-answer" id="quick-answer"><strong>([\s\S]*?)<\/strong><p>([\s\S]*?)<\/p><\/div>/i);
  const rawQuickTitle = quick ? strip(quick[1]) : '';
  const quickTitle = rawQuickTitle.toLowerCase() === 'quick answer' ? h1 : rawQuickTitle || (slug === 'editorial-policy' ? 'How are BulkBro guides researched?' : 'What should you know first?');
  const quickText = quick ? strip(quick[2]) : lead;
  if (quick) content = content.replace(quick[0], '');
  content = content
    .replaceAll('class="article"', 'class="article-content"')
    .replaceAll('class="medical-note"', 'class="review-note"')
    .replace(/<table class="comparison">([\s\S]*?)<\/table>/gi, '<div class="comparison-scroll"><table class="comparison">$1</table></div>')
    .replace(/<ol class="source-list">/gi, '<ul class="source-list">')
    .replace(/<\/ol>(?=\s*<div class="review-note")/gi, '</ul>');

  const relatedPool = publicSlugs.filter((candidate) => candidate !== slug).slice(0, 2);
  const related = relatedPool.map((candidate) => `<a class="related-card" href="../${candidate}/"><span>Related guide</span><strong>${titles.get(candidate)}</strong></a>`).join('');
  const editorialRelated = slug === 'editorial-policy' ? '' : `<h2>Continue reading</h2><div class="related-grid">${related}</div>`;
  const appCallout = slug === 'editorial-policy' ? '' : `<section class="app-callout" aria-labelledby="app-callout-title"><img src="/assets/bulkbro.png" width="320" height="320" alt="BulkBro app icon"><div><p class="article-kicker">Adaptive weight-gain planning</p><h2 id="app-callout-title">Connect the plan with what actually happened.</h2><p>BulkBro keeps calorie targets, completed food logs and weight trends together on your iPhone so each adjustment has a reason.</p><a class="button" href="https://apps.apple.com/app/apple-store/id6770476671?pt=128911414&amp;mt=8&amp;ct=bulkbro_${slug.replaceAll('-', '_')}_inline">View BulkBro on the App Store ↗</a></div></section>`;
  const toc = tocHtml.replace(/<a href="#quick-answer">[\s\S]*?<\/a>/i, '') + (tocHtml.includes('#sources') ? '' : '<a href="#sources">Sources</a>');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="theme-color" content="#fafafa">
  ${smartBanner ? `<meta name="apple-itunes-app" content="${smartBanner}">` : ''}
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${socialTitle}">
  <meta property="og:description" content="${socialDescription}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${socialImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/assets/bulkbro.png">
  <link rel="stylesheet" href="/guide-article.css?v=20261111-3">
${jsonLd}
</head>
<body>
  <a class="skip-link" href="#article">Skip to article</a>
  <header class="site-header"><a class="wordmark" href="/" aria-label="Kestora Labs app portfolio home"><span class="wordmark-name">Kestora Labs</span><span class="wordmark-label">Independent Apps</span></a><nav aria-label="Main navigation"><a href="/bulkbro/">BulkBro</a><a href="/bulkbro/guides/">All guides</a></nav></header>
  <main class="article-main">
    <a class="article-back" href="/bulkbro/guides/">← Back to BulkBro guides</a>
    <article class="article-shell" id="article">
      <header class="article-hero"><div><p class="article-kicker">${kicker}</p><h1>${h1}</h1><p class="article-lead">${lead}</p><p class="article-byline">Published by Kestora Labs, the maker of BulkBro · Updated <time datetime="2026-11-11">November 11, 2026</time> · ${readTime}</p></div><aside class="article-summary" aria-label="Quick answer"><span>Quick answer</span><strong>${quickTitle}</strong><p>${quickText}</p></aside></header>
      <div class="article-layout"><details class="article-toc" open><summary>On this page</summary><div>${toc}</div></details><div class="article-content">${content}${appCallout}${editorialRelated}</div></div>
      <div class="article-note"><p>BulkBro provides general educational planning tools for adults. It is not medical advice, diagnosis or individualized dietetic care.</p></div>
    </article>
  </main>
  <footer class="article-footer"><p>© <span id="year"></span> Kestora Labs</p><nav aria-label="Footer navigation"><a href="/bulkbro/">BulkBro</a><a href="/bulkbro/guides/">Guides</a><a href="/bulkbro/calorie-surplus-calculator/">Calculator</a><a href="/bulkbro/privacy.html">Privacy</a><a href="/bulkbro/health.html">Health disclaimer</a><a href="/bulkbro/support.html">Support</a><a href="/privacy.html">Website privacy</a></nav></footer>
  <script>document.querySelector('#year').textContent = new Date().getFullYear();const toc=document.querySelector('.article-toc');const tocBreakpoint=matchMedia('(max-width: 860px)');const syncToc=()=>{if(tocBreakpoint.matches)toc.removeAttribute('open');else toc.setAttribute('open','');};syncToc();tocBreakpoint.addEventListener('change',syncToc);</script>
</body>
</html>`;

  fs.writeFileSync(path.join(guidesRoot, slug, 'index.html'), `${html.replace(/[ \t]+$/gm, '')}\n`);
  console.log(`${slug}: standardized`);
}
