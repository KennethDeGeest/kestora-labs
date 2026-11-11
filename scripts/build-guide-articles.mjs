import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const articles = [{
  app: 'Bump Echo',
  appSlug: 'bumpecho',
  slug: 'baby-heartbeat-apps-explained',
  appIcon: '/assets/bumpecho.png',
  title: 'Baby Heartbeat Apps: What a Phone Can and Cannot Do',
  h1: 'Baby heartbeat apps: what a phone can and cannot do',
  description: 'Learn what baby heartbeat apps can and cannot do, why phone audio is not fetal monitoring, and when to contact your maternity care team instead.',
  kicker: 'Bump Echo safety guide',
  lead: 'A phone microphone may capture many body and room sounds. It cannot reliably tell you that a sound is a fetal heartbeat, measure wellbeing or replace assessment by a trained professional.',
  published: '2026-11-05',
  modified: '2026-11-11',
  author: 'Kestora Labs, the maker of Bump Echo',
  socialImage: '/assets/guides/bumpecho-heartbeat-apps.png',
  languages: [
    { code: 'en', label: 'English', short: 'EN', url: '/bumpecho/guides/baby-heartbeat-apps-explained/' },
    { code: 'es', label: 'Español', short: 'ES', url: '/es/bumpecho/grabar-latido-bebe/' },
    { code: 'fr', label: 'Français', short: 'FR', url: '/fr/bumpecho/enregistrer-battement-bebe-telephone/' }
  ],
  quickAnswer: {
    question: 'Can a phone app reliably check a baby’s heartbeat?',
    answer: 'No. A phone recording should not be used to check fetal wellbeing. Sounds can be misidentified, and hearing something that seems like a heartbeat cannot show that a baby is well.'
  },
  safety: 'If your baby is moving less than usual, stops moving or the usual pattern changes, seek maternity advice immediately. Do not wait for an app, recording or home device to reassure you.',
  sections: [
    {
      id: 'difference',
      toc: 'Recording vs monitoring',
      title: 'Microphone recording and fetal monitoring are different',
      paragraphs: ['A phone microphone records pressure waves that reach the device. It may capture your own pulse, digestion, movement, clothing, voices and background noise. It does not know which sound came from where. Clinical fetal-heart assessment uses appropriate equipment, trained interpretation and the wider clinical picture.'],
      comparison: {
        can: ['Record voices, songs and meaningful everyday sounds', 'Preserve audio as a private personal keepsake', 'Play back the recording you captured'],
        cannot: ['Confirm that a sound is a fetal heartbeat', 'Measure fetal heart rate, movement or wellbeing', 'Replace advice or assessment from a maternity professional']
      }
    },
    {
      id: 'doppler',
      toc: 'Home Dopplers',
      title: 'What about a home Doppler?',
      paragraphs: ['The US Food and Drug Administration says over-the-counter fetal heartbeat monitoring systems should be used only by trained healthcare providers when medically necessary, because untrained use may involve prolonged exposure or incorrect interpretation. The NHS similarly warns that even hearing a heartbeat with a home Doppler does not mean a baby is well.'],
      citations: [
        { label: 'FDA guidance', url: 'https://www.fda.gov/radiation-emitting-products/medical-imaging/ultrasound-imaging' },
        { label: 'NHS guidance', url: 'https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/' }
      ]
    },
    {
      id: 'use',
      toc: 'Safe keepsake use',
      title: 'What a keepsake app can safely promise',
      paragraphs: ['An audio keepsake can record your voice, a loved one’s message, a song or meaningful everyday sounds. It should be honest about being a memory tool. Bump Echo does not isolate a fetal heartbeat, measure heart rate, monitor movement, diagnose a condition or assess pregnancy or fetal wellbeing.']
    },
    {
      id: 'help',
      toc: 'When to seek care',
      title: 'When to contact care',
      paragraphs: ['Use the instructions from your own maternity team. NHS guidance says to call immediately when movement is less than usual, cannot be felt or changes from the usual pattern, and not to wait until the next day. If you believe there is an emergency, use your local emergency service.'],
      citations: [{ label: 'NHS: your baby’s movements', url: 'https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/' }]
    }
  ],
  sources: [
    { label: 'NHS — Your baby’s movements', url: 'https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/' },
    { label: 'Newcastle Hospitals NHS — Reduced fetal movements and phone apps', url: 'https://www.newcastle-hospitals.nhs.uk/services/maternity/during-pregnancy/maternity-assessment-unit/reduced-fetal-movements/' },
    { label: 'US FDA — Ultrasound imaging and fetal heartbeat monitors', url: 'https://www.fda.gov/radiation-emitting-products/medical-imaging/ultrasound-imaging' },
    { label: 'University College London Hospitals — Your baby’s movements', url: 'https://www.uclh.nhs.uk/patients-and-visitors/patient-information-pages/your-babys-movements-easy-read' }
  ],
  appCallout: {
    kicker: 'A private pregnancy Soundbook',
    title: 'Keep the voices, not just the timeline.',
    text: 'Bump Echo keeps messages, songs and meaningful everyday sounds together on your iPhone. It is a keepsake app—not a medical device or health-monitoring tool.',
    url: 'https://apps.apple.com/app/apple-store/id6812684414?pt=128911414&mt=8&ct=bumpecho_heartbeat_apps_inline'
  },
  related: [
    { title: 'Pregnancy journal ideas for every trimester', url: '../pregnancy-journal/' },
    { title: 'Pregnancy memory book ideas beyond photos', url: '../pregnancy-memory-book/' }
  ]
}];

const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const prettyDate = value => new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
const absolute = value => value.startsWith('http') ? value : `https://kestoralabs.com${value}`;

function plainText(article) {
  return [article.h1, article.lead, article.quickAnswer.question, article.quickAnswer.answer, article.safety,
    ...article.sections.flatMap(section => [section.title, ...section.paragraphs, ...(section.comparison ? [...section.comparison.can, ...section.comparison.cannot] : [])])
  ].join(' ');
}

function renderCitations(citations = []) {
  if (!citations.length) return '';
  return `<p class="inline-citations">${citations.map(item => `<a class="inline-source" href="${escapeHtml(item.url)}" rel="noopener">${escapeHtml(item.label)} ↗</a>`).join(' · ')}</p>`;
}

function renderComparison(comparison) {
  if (!comparison) return '';
  const card = (label, items, className = '') => `<div class="capability-card ${className}"><span>${escapeHtml(label)}</span><ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>`;
  return `<div class="capability-grid" aria-label="What a phone recording can and cannot do">${card('A phone can', comparison.can)}${card('A phone cannot', comparison.cannot, 'cannot')}</div>`;
}

function renderArticle(article) {
  const canonicalPath = `/${article.appSlug}/guides/${article.slug}/`;
  const canonical = absolute(canonicalPath);
  const words = plainText(article).trim().split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.ceil(words / 200));
  const alternates = article.languages.map(language => `  <link rel="alternate" hreflang="${escapeHtml(language.code)}" href="${escapeHtml(absolute(language.url))}">`).join('\n');
  const languageLinks = article.languages.filter(language => language.code !== 'en').map(language => `<a href="${escapeHtml(language.url)}" lang="${escapeHtml(language.code)}" hreflang="${escapeHtml(language.code)}" aria-label="Read in ${escapeHtml(language.label)}">${escapeHtml(language.short)}</a>`).join('');
  const toc = article.sections.map(section => `<a href="#${escapeHtml(section.id)}">${escapeHtml(section.toc)}</a>`).join('');
  const sections = article.sections.map(section => `<h2 id="${escapeHtml(section.id)}">${escapeHtml(section.title)}</h2>${section.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}${renderCitations(section.citations)}${renderComparison(section.comparison)}`).join('');
  const schema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.description,
    image: absolute(article.socialImage), datePublished: article.published, dateModified: article.modified,
    author: { '@type': 'Organization', name: 'Kestora Labs' }, publisher: { '@type': 'Organization', name: 'Kestora Labs', url: 'https://kestoralabs.com/' },
    mainEntityOfPage: canonical, articleSection: `${article.app} guides`, about: ['pregnancy keepsakes', 'fetal heartbeat apps', 'phone audio recording'],
    citation: article.sources.map(source => source.url), isPartOf: { '@type': 'WebSite', name: 'Kestora Labs', url: 'https://kestoralabs.com/' }
  };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Kestora Labs', item: 'https://kestoralabs.com/' },
    { '@type': 'ListItem', position: 2, name: article.app, item: absolute(`/${article.appSlug}/`) },
    { '@type': 'ListItem', position: 3, name: 'Guides', item: absolute(`/${article.appSlug}/guides/`) },
    { '@type': 'ListItem', position: 4, name: article.title, item: canonical }
  ] };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(article.title)} | ${escapeHtml(article.app)}</title>
  <meta name="description" content="${escapeHtml(article.description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="theme-color" content="#fafafa">
  <meta name="apple-itunes-app" content="app-id=6812684414, affiliate-data=pt=128911414&amp;ct=bumpecho_heartbeat_apps">
  <link rel="canonical" href="${canonical}">
${alternates}
  <link rel="alternate" hreflang="x-default" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(article.title)}">
  <meta property="og:description" content="${escapeHtml(article.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${escapeHtml(absolute(article.socialImage))}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="${escapeHtml(article.appIcon)}">
  <link rel="stylesheet" href="/guide-article.css?v=20261111-2">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
</head>
<body>
  <a class="skip-link" href="#article">Skip to article</a>
  <header class="site-header">
    <a class="wordmark" href="/" aria-label="Kestora Labs app portfolio home"><span class="wordmark-name">Kestora Labs</span><span class="wordmark-label">Independent Apps</span></a>
    <nav aria-label="Main navigation"><a href="/${article.appSlug}/">${escapeHtml(article.app)}</a><a href="/${article.appSlug}/guides/">All guides</a>${languageLinks}</nav>
  </header>
  <main class="article-main">
    <a class="article-back" href="/${article.appSlug}/guides/">← Back to ${escapeHtml(article.app)} guides</a>
    <article class="article-shell" id="article">
      <header class="article-hero">
        <div><p class="article-kicker">${escapeHtml(article.kicker)}</p><h1>${escapeHtml(article.h1)}</h1><p class="article-lead">${escapeHtml(article.lead)}</p><p class="article-byline">Published by ${escapeHtml(article.author)} · Updated <time datetime="${article.modified}">${prettyDate(article.modified)}</time> · ${readingMinutes} minute read</p></div>
        <aside class="article-summary" aria-label="Quick answer"><span>Quick answer</span><strong>${escapeHtml(article.quickAnswer.question)}</strong><p>${escapeHtml(article.quickAnswer.answer)}</p></aside>
      </header>
      <div class="article-layout">
        <details class="article-toc" open><summary>On this page</summary><div>${toc}<a href="#sources">Sources</a></div></details>
        <div class="article-content">
          <aside class="safety-note"><p><strong>${escapeHtml(article.safety.split(' Do not')[0])}</strong> Do not${escapeHtml(article.safety.split(' Do not')[1] || '')} <a class="inline-source" href="https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/" rel="noopener">NHS guidance ↗</a></p></aside>
          ${sections}
          <div class="review-note"><p><strong>Editorial note:</strong> This guide is general information, not medical advice. It was reviewed against the official sources below on ${prettyDate(article.modified)}. Always follow advice from your own qualified maternity care team.</p></div>
          <h2 id="sources">Official sources</h2><ul class="source-list">${article.sources.map(source => `<li><a href="${escapeHtml(source.url)}" rel="noopener">${escapeHtml(source.label)} ↗</a></li>`).join('')}</ul>
          <section class="app-callout" aria-labelledby="app-callout-title"><img src="${escapeHtml(article.appIcon)}" width="320" height="320" alt="${escapeHtml(article.app)} app icon"><div><p class="article-kicker">${escapeHtml(article.appCallout.kicker)}</p><h2 id="app-callout-title">${escapeHtml(article.appCallout.title)}</h2><p>${escapeHtml(article.appCallout.text)}</p><a class="button" href="${escapeHtml(article.appCallout.url)}">View ${escapeHtml(article.app)} on the App Store ↗</a></div></section>
          <h2>Continue reading</h2><div class="related-grid">${article.related.map(item => `<a class="related-card" href="${escapeHtml(item.url)}"><span>Related guide</span><strong>${escapeHtml(item.title)}</strong></a>`).join('')}</div>
        </div>
      </div>
      <div class="article-note"><p>${escapeHtml(article.app)} is an audio keepsake app. It is not a medical device and does not monitor, identify or assess fetal heartbeat, movement, pregnancy or wellbeing.</p></div>
    </article>
  </main>
  <footer class="article-footer"><p>© <span id="year"></span> Kestora Labs</p><nav aria-label="Footer navigation"><a href="/${article.appSlug}/">${escapeHtml(article.app)}</a><a href="/${article.appSlug}/guides/">Guides</a><a href="/${article.appSlug}/privacy.html">Privacy</a><a href="/${article.appSlug}/terms.html">Terms</a><a href="/${article.appSlug}/support.html">Support</a><a href="/privacy.html">Website privacy</a>${article.languages.filter(language => language.code !== 'en').map(language => `<a href="${escapeHtml(language.url)}" lang="${escapeHtml(language.code)}" hreflang="${escapeHtml(language.code)}">${escapeHtml(language.label)}</a>`).join('')}</nav></footer>
  <script>document.querySelector('#year').textContent = new Date().getFullYear();const toc=document.querySelector('.article-toc');const tocBreakpoint=matchMedia('(max-width: 860px)');const syncToc=()=>{if(tocBreakpoint.matches)toc.removeAttribute('open');else toc.setAttribute('open','');};syncToc();tocBreakpoint.addEventListener('change',syncToc);</script>
</body>
</html>`;
}

for (const article of articles) {
  const output = path.join(root, article.appSlug, 'guides', article.slug, 'index.html');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${renderArticle(article)}\n`);
  console.log(`${article.appSlug}/${article.slug}: generated`);
}
