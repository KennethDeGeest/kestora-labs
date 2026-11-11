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
  bumpecho: 'Bump Echo',
  calmber: 'Calmber'
};
const pageFiles = ['privacy.html', 'terms.html', 'support.html', 'health.html'];
const overrides = {
  'bulkbro/support.html': {
    intro: 'Help with BulkBro, purchases, feedback and deleting your app data.',
    updated: '',
    sections: [
      `<h2>Contact support</h2><p>For questions, bug reports, purchase issues or privacy requests, email <a href="mailto:degeestkenneth@gmail.com?subject=BulkBro%20Support">degeestkenneth@gmail.com</a>. Include your iPhone model, iOS version, BulkBro version and a short description of what happened.</p><a class="email-button" href="mailto:degeestkenneth@gmail.com?subject=BulkBro%20Support">Email support</a>`,
      `<h2>App feedback</h2><p>BulkBro is built around feedback from people trying to gain weight. If something is unclear, broken or missing, email <a href="mailto:degeestkenneth@gmail.com?subject=BulkBro%20Feedback">degeestkenneth@gmail.com</a> and tell us what would make the app more useful.</p>`,
      `<h2>Delete your app data</h2><p>You can permanently delete your BulkBro data inside the app. Open <strong>BulkBro → Settings → Delete data</strong> and follow the confirmation steps.</p><p>If you no longer have access to the app, email <a href="mailto:degeestkenneth@gmail.com?subject=BulkBro%20Data%20Deletion%20Request">degeestkenneth@gmail.com</a> and we’ll help with your deletion request.</p>`,
      `<h2>Privacy and terms</h2><p>Read the current <a href="privacy.html">Privacy Policy</a>, <a href="terms.html">Terms of Use</a> and <a href="health.html">Health Disclaimer</a>.</p>`
    ]
  },
  'fovri/privacy.html': {
    intro: 'How Fovri handles your cookbook, recipe imports, optional AI assistance, purchases, analytics and support requests.',
    updated: 'Last updated 11 November 2026',
    sections: [
      `<h2>Who is responsible</h2><p>Fovri is provided by Kenneth Marcel S De Geest, a self-employed developer based in Spain. For privacy questions or requests, email <a href="mailto:degeestkenneth@gmail.com?subject=Fovri%20Privacy">degeestkenneth@gmail.com</a>.</p>`,
      `<h2>Your cookbook</h2><p>No personal Fovri account is required. Recipes, folders, favourites, meal plans, grocery information, notes and saved photos are stored on your iPhone. Fovri does not operate a cloud cookbook-sync service. Apple device backups may include app data according to your iPhone and iCloud settings.</p><p>You control exported cookbook files and any recipes or photos you choose to share.</p>`,
      `<h2>Recipe imports and optional AI help</h2><p>When you import a public recipe or cooking-video link, Fovri contacts the source and may process the available page text, captions, images or selected video information needed to create the recipe. Source websites receive ordinary connection information under their own privacy policies.</p><p>If optional AI import help is enabled and a normal import needs assistance, the relevant source material is sent securely to service providers that process it for Fovri. Your unrelated cookbook entries, personal notes and photos are not sent for this purpose. Do not import private or sensitive material unless you are comfortable with this processing.</p>`,
      `<h2>Purchases and subscriptions</h2><p>Apple processes App Store payments. RevenueCat helps Fovri display offers, confirm subscription access and restore purchases. These services may process purchase, product, entitlement, app and device information. Fovri does not receive your full payment-card details.</p>`,
      `<h2>Analytics and diagnostics</h2><p>Fovri uses privacy-conscious analytics and crash diagnostics to understand feature use and reliability. This may include app interactions, app version, device and operating-system information, approximate region and crash details. Analytics does not include recipe names, ingredients, grocery text, notes, photos or imported recipe content.</p><p>Fovri does not sell personal information, show third-party advertising or use your cookbook to track you across other companies’ apps and websites.</p>`,
      `<h2>Permissions and notifications</h2><p>Notifications are optional and may be used for import completion, grocery reminders and cooking timers. Photos or files you select are used only for the action you request. You can manage permissions in Fovri and iPhone Settings.</p>`,
      `<h2>Retention and deletion</h2><p>Local cookbook information remains until you delete it or remove the app. Exported files and device backups must be managed where they are stored. Service providers retain limited purchase, analytics, security and diagnostic information according to their settings, contracts and legal obligations. Support correspondence is retained as reasonably needed to answer the request and meet legal obligations.</p>`,
      `<h2>Your choices and rights</h2><p>Depending on where you live, you may request access, correction, deletion, portability or restriction of personal information under the developer’s control, object to certain processing or withdraw consent. Contact the email above. You may also complain to the Spanish Data Protection Agency or your local supervisory authority.</p>`,
      `<h2>Children, security and changes</h2><p>Fovri is not directed to children under 13. Reasonable technical and organisational safeguards are used, but no system can guarantee absolute security. This policy may be updated when Fovri’s features, providers or legal requirements change.</p>`
    ]
  },
  'fovri/terms.html': {
    intro: 'The rules for using Fovri, recipe imports, optional AI assistance and Fovri Pro.',
    updated: 'Last updated 11 November 2026',
    sections: [
      `<h2>The app and provider</h2><p>Fovri is provided by Kenneth Marcel S De Geest, a self-employed developer based in Spain. Fovri helps you collect and edit recipes, plan meals, prepare grocery lists and follow cooking steps. Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Standard End User License Agreement</a> also applies.</p>`,
      `<h2>Subscriptions and access</h2><p>Fovri Pro is offered through auto-renewing monthly and yearly subscriptions at the price shown before purchase. Any trial or introductory offer is shown in Apple’s confirmation sheet and is subject to Apple’s eligibility rules. Subscriptions renew unless cancelled through your Apple Account before the current period ends. Deleting Fovri does not cancel a subscription.</p><p>Restore Purchases can restore eligible access bought with the same Apple Account. Apple handles billing and refund requests. Mandatory consumer rights continue to apply.</p>`,
      `<h2>Your recipes and imported content</h2><p>You retain ownership of recipes, notes and photos you create. You are responsible for having permission to import, save, edit, export or share third-party material. Source content remains subject to its owner’s rights and terms.</p>`,
      `<h2>AI-assisted results and cooking information</h2><p>Imports and optional AI-assisted suggestions can be incomplete or inaccurate. Review ingredients, quantities, allergens, food-safety information and cooking instructions before relying on them. Fovri is a planning tool, not professional medical, dietary or food-safety advice.</p>`,
      `<h2>Acceptable use and availability</h2><p>Use Fovri lawfully and do not misuse, disrupt, reverse engineer or attempt unauthorised access to the app or its services except where applicable law permits it. Features may change, and uninterrupted or error-free availability is not guaranteed.</p>`,
      `<h2>Privacy, liability and changes</h2><p>The <a href="privacy.html">Privacy Policy</a> explains how information is handled. To the fullest extent permitted by law, Fovri is provided “as is” and the provider is not responsible for indirect or consequential loss. Nothing in these terms excludes liability or consumer rights that cannot legally be limited.</p><p>These terms may be updated when the app, purchases or legal requirements change. Questions may be sent to <a href="mailto:degeestkenneth@gmail.com?subject=Fovri%20Terms">degeestkenneth@gmail.com</a>.</p>`
    ]
  },
  'oqvi/privacy.html': {
    intro: 'How Oqvi handles photos used for identification, your private collection, purchases, diagnostics and support requests.',
    updated: 'Last updated 11 November 2026',
    sections: [
      `<h2>Who is responsible</h2><p>Oqvi is provided by Kenneth Marcel S De Geest, a self-employed developer based in Spain. Contact <a href="mailto:degeestkenneth@gmail.com?subject=Oqvi%20Privacy">degeestkenneth@gmail.com</a> with privacy questions or requests.</p>`,
      `<h2>Your private collection</h2><p>Saved discoveries, notes, favourites and precise map pins are stored on your iPhone. Oqvi does not operate an account-based cloud collection. Apple device backups may include app data according to your settings.</p>`,
      `<h2>Plant-identification requests</h2><p>When you request an identification, the selected photo and limited context needed for the request are sent securely to service providers that process the identification for Oqvi. Results are suggestions and may be inaccurate. Do not submit private or sensitive images.</p>`,
      `<h2>Location, photos and permissions</h2><p>Camera, photo-library and location permissions are requested only for features you choose. Precise saved map pins remain in your local collection. You can review or revoke permissions in iPhone Settings.</p>`,
      `<h2>Purchases, analytics and diagnostics</h2><p>Apple processes App Store payments, and purchase services help verify access and restore purchases. Oqvi may use limited analytics and crash diagnostics to understand reliability and general feature use. This information does not include your private collection, notes or precise saved locations.</p>`,
      `<h2>Retention and deletion</h2><p>Local collection data remains until you delete it or remove the app. Device backups and exported copies must be managed separately. Providers retain limited purchase, security, analytics and diagnostic information under their own retention rules and legal obligations.</p>`,
      `<h2>Your rights, security and changes</h2><p>Depending on your location, you may have rights to access, correct, delete, restrict or object to processing of personal information under the developer’s control. Contact the email above. Reasonable safeguards are used, but no system is completely secure. This policy may change when Oqvi’s features, providers or legal requirements change.</p>`
    ]
  },
  'migraloom/privacy.html': {
    intro: 'How MigraLoom handles your local headache journal, exports, purchases, optional diagnostics and support requests.',
    updated: 'Last updated 11 November 2026',
    sections: [
      `<h2>Who is responsible</h2><p>MigraLoom is provided by Kenneth Marcel S De Geest, a self-employed developer based in Spain. For privacy questions or requests, email <a href="mailto:degeestkenneth@gmail.com?subject=MigraLoom%20Privacy">degeestkenneth@gmail.com</a>.</p>`,
      `<h2>Your headache journal</h2><p>No personal account is required. Episodes, symptoms, triggers, medication notes and related journal information are stored on your iPhone. MigraLoom does not operate a cloud journal. Apple device backups may include app data according to your settings.</p>`,
      `<h2>Exports and sharing</h2><p>You choose whether to create or share an export. Exported files can contain sensitive health information. Store and share them carefully. Copies already sent to another person or service are governed by that destination.</p>`,
      `<h2>Purchases and optional diagnostics</h2><p>Apple processes App Store payments and purchase services help verify or restore access. If you enable optional diagnostics, limited app, device, performance and crash information may be processed to improve reliability. Journal entries, symptom notes and medication details are not intentionally included in diagnostics.</p>`,
      `<h2>Retention and deletion</h2><p>Journal information remains on your device until you delete it or remove the app. Device backups and exported files must be managed separately. Providers retain limited purchase and diagnostic information under their own retention rules and legal obligations.</p>`,
      `<h2>Your choices and rights</h2><p>You can keep diagnostics disabled, edit or delete journal entries, remove the app and control exports. Depending on where you live, you may also request access, correction, deletion, restriction or objection for personal information under the developer’s control. Contact the email above.</p>`,
      `<h2>Health notice, security and changes</h2><p>MigraLoom is a personal journal, not a medical device, diagnosis or substitute for professional care. Reasonable safeguards are used, but no system can guarantee absolute security. This policy may be updated when features, providers or legal requirements change.</p>`
    ]
  }
};
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
  const override = overrides[relative];
  const main = match(original, /<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const title = match(original, /<title>([\s\S]*?)<\/title>/i) || `${appName} — Kestora Labs`;
  const description = match(original, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = match(original, /<link\s+rel="canonical"\s+href="([^"]*)"/i) || `https://kestoralabs.com/${relative}`;
  const kickerRaw = match(main, /class="(?:[^"]*\s)?(?:legal-kicker|kicker|privacy-eyebrow)(?:\s[^"]*)?"[^>]*>([\s\S]*?)<\//i);
  const h1Raw = match(main, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const introRaw = override?.intro || match(main, /class="(?:[^"]*\s)?(?:legal-intro|intro|lead|lede|privacy-lead)(?:\s[^"]*)?"[^>]*>([\s\S]*?)<\//i);
  const updatedRaw = override?.updated || match(main, /class="(?:[^"]*\s)?(?:legal-updated|updated|privacy-meta)(?:\s[^"]*)?"[^>]*>([\s\S]*?)<\//i);
  const noteRaw = original.includes('class="legal-shell"') ? '' : match(main, /<div\s+class="legal-note"[^>]*>([\s\S]*?)<\/div>/i);
  const sections = override ? override.sections.map(content => `<section class="legal-section">${content}</section>`) : [];
  for (const found of override ? [] : main.matchAll(/<section\b([^>]*)>([\s\S]*?)<\/section>/gi)) {
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
  <script src="/site.js?v=20261111-contact" defer></script>
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
