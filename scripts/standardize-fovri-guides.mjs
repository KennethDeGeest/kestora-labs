import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const guidesRoot = path.join(root, 'fovri', 'guides');
const slugs = fs.readdirSync(guidesRoot).filter((slug) => fs.existsSync(path.join(guidesRoot, slug, 'index.html'))).sort();

const pick = (html, pattern, fallback = '') => html.match(pattern)?.[1]?.trim() || fallback;
const strip = (value = '') => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const originals = new Map(slugs.map((slug) => [slug, fs.readFileSync(path.join(guidesRoot, slug, 'index.html'), 'utf8')]));
const titles = new Map(slugs.map((slug) => [slug, strip(pick(originals.get(slug), /<h1>([\s\S]*?)<\/h1>/i, slug.replaceAll('-', ' ')))]));

for (const slug of slugs) {
  const old = originals.get(slug);
  if (old.includes('class="article-shell"')) {
    console.log(`${slug}: already standardized`);
    continue;
  }

  const title = strip(pick(old, /<title>([\s\S]*?)<\/title>/i));
  const h1 = strip(pick(old, /<h1>([\s\S]*?)<\/h1>/i));
  const description = pick(old, /<meta name="description" content="([^"]+)"/i);
  const canonical = pick(old, /<link rel="canonical" href="([^"]+)"/i);
  const kicker = strip(pick(old, /<p class="eyebrow">([\s\S]*?)<\/p>/i)).replace(/\s*·\s*Updated.*$/i, '');
  const lead = strip(pick(old, /<p class="dek">([\s\S]*?)<\/p>/i));
  const quick = strip(pick(old, /<section class="answer-strip">[\s\S]*?<p>([\s\S]*?)<\/p>\s*<\/div>/i, lead));
  const smartBanner = pick(old, /<meta name="apple-itunes-app" content="([^"]+)"/i);
  const socialTitle = pick(old, /<meta property="og:title" content="([^"]+)"/i, h1);
  const socialDescription = pick(old, /<meta property="og:description" content="([^"]+)"/i, description);
  const socialImage = pick(old, /<meta property="og:image" content="([^"]+)"/i, 'https://kestoralabs.com/assets/fovri/social-to-recipe.png');
  const jsonLd = [...old.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((match) => `  <script type="application/ld+json">${match[1].replace('"dateModified":"2026-11-05"', '"dateModified":"2026-11-11"')}</script>`).join('\n');
  const alternates = [...old.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi)].map((match) => ({ code: match[1], url: match[2] }));
  const alternateTags = alternates.map(({ code, url }) => `  <link rel="alternate" hreflang="${code}" href="${url}">`).join('\n');
  const languageLinks = alternates.filter(({ code }) => !['en', 'x-default'].includes(code)).map(({ code, url }) => `<a href="${url}" lang="${code}" hreflang="${code}" aria-label="Read in ${code.toUpperCase()}">${code.toUpperCase()}</a>`).join('');
  const footerLanguages = alternates.filter(({ code }) => !['en', 'x-default'].includes(code)).map(({ code, url }) => `<a href="${url}" lang="${code}" hreflang="${code}">${code === 'es' ? 'Español' : code === 'fr' ? 'Français' : code.toUpperCase()}</a>`).join('');

  let toc = pick(old, /<aside class="toc">[\s\S]*?<p>[^<]*<\/p>([\s\S]*?)<\/aside>/i);
  toc = toc.replace(/>\s*0\d\s+/g, '>');
  let content = pick(old, /<article class="prose">([\s\S]*?)<aside class="fovri-callout">/i);
  content = content
    .replace(/<section id="([^"]+)"><p class="section-kicker">[\s\S]*?<\/p><h2>/gi, '<h2 id="$1">')
    .replace(/<\/section>/gi, '')
    .replace(/class="check-list"/gi, 'class="paper-list"')
    .replace(/<div class="note-grid">/gi, '<div class="prompt-grid">')
    .replace(/<article>/gi, '<div class="prompt-card">')
    .replace(/<\/article>/gi, '</div>')
    .replace(/<table class="comparison">([\s\S]*?)<\/table>/gi, '<div class="comparison-scroll"><table class="comparison">$1</table></div>')
    .replace(/<([ou])l class="sources">/gi, '<ul class="source-list">')
    .replace(/<\/ol>(?=\s*(?:<div|$))/gi, '</ul>');

  const oldRelated = pick(old, /<section class="related">[\s\S]*?<div>([\s\S]*?)<\/div><\/section>/i);
  const related = [...oldRelated.matchAll(/<a href="([^"]+)"><span>([\s\S]*?)<\/span><strong>([\s\S]*?)<\/strong>[\s\S]*?<\/a>/gi)]
    .map((match) => `<a class="related-card" href="${match[1]}"><span>${strip(match[2])}</span><strong>${strip(match[3])}</strong></a>`).join('');
  const fallbackRelated = slugs.filter((candidate) => candidate !== slug).slice(0, 2).map((candidate) => `<a class="related-card" href="../${candidate}/"><span>Related guide</span><strong>${titles.get(candidate)}</strong></a>`).join('');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="theme-color" content="#fafafa">
  <meta name="apple-itunes-app" content="${smartBanner}">
  <link rel="canonical" href="${canonical}">
${alternateTags}
  <meta property="og:type" content="article">
  <meta property="og:title" content="${socialTitle}">
  <meta property="og:description" content="${socialDescription}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${socialImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/assets/fovri.png">
  <link rel="stylesheet" href="/guide-article.css?v=20261111-3">
${jsonLd}
</head>
<body>
  <a class="skip-link" href="#article">Skip to article</a>
  <header class="site-header"><a class="wordmark" href="/" aria-label="Kestora Labs app portfolio home"><span class="wordmark-name">Kestora Labs</span><span class="wordmark-label">Independent Apps</span></a><nav aria-label="Main navigation"><a href="/fovri/">Fovri</a><a href="/fovri/guides/">All guides</a>${languageLinks}</nav></header>
  <main class="article-main">
    <a class="article-back" href="/fovri/guides/">← Back to Fovri guides</a>
    <article class="article-shell" id="article">
      <header class="article-hero"><div><p class="article-kicker">${kicker}</p><h1>${h1}</h1><p class="article-lead">${lead}</p><p class="article-byline">Published by Kestora Labs, the maker of Fovri · Updated <time datetime="2026-11-11">November 11, 2026</time> · 3 min read</p></div><aside class="article-summary" aria-label="Quick answer"><span>Quick answer</span><strong>${h1}</strong><p>${quick}</p></aside></header>
      <div class="article-layout"><details class="article-toc" open><summary>On this page</summary><div>${toc}</div></details><div class="article-content">${content}<section class="app-callout" aria-labelledby="app-callout-title"><img src="/assets/fovri.png" width="320" height="320" alt="Fovri app icon"><div><p class="article-kicker">From saved idea to dinner</p><h2 id="app-callout-title">Keep the source. Make the recipe yours.</h2><p>Fovri turns supported public recipe links into editable recipes, then connects your cookbook to Cook next, groceries and guided cooking.</p><a class="button" href="https://apps.apple.com/app/apple-store/id6824272880?pt=128911414&amp;mt=8&amp;ct=fovri_${slug.replaceAll('-', '_')}_inline">View Fovri on the App Store ↗</a></div></section><h2>Continue reading</h2><div class="related-grid">${related || fallbackRelated}</div></div></div>
      <div class="article-note"><p>Imported and AI-assisted recipes are editable drafts. Review ingredients, quantities, allergens, handling and safe cooking temperatures before cooking.</p></div>
    </article>
  </main>
  <footer class="article-footer"><p>© <span id="year"></span> Kestora Labs</p><nav aria-label="Footer navigation"><a href="/fovri/">Fovri</a><a href="/fovri/guides/">Guides</a><a href="/fovri/privacy.html">Privacy</a><a href="/fovri/terms.html">Terms</a><a href="/fovri/support.html">Support</a><a href="/privacy.html">Website privacy</a>${footerLanguages}</nav></footer>
  <script>document.querySelector('#year').textContent = new Date().getFullYear();const toc=document.querySelector('.article-toc');const tocBreakpoint=matchMedia('(max-width: 860px)');const syncToc=()=>{if(tocBreakpoint.matches)toc.removeAttribute('open');else toc.setAttribute('open','');};syncToc();tocBreakpoint.addEventListener('change',syncToc);</script>
</body>
</html>`;

  fs.writeFileSync(path.join(guidesRoot, slug, 'index.html'), `${html.replace(/[ \t]+$/gm, '')}\n`);
  console.log(`${slug}: standardized`);
}
