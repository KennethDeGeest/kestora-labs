(() => {
  const favicon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='15' fill='%23111111'/%3E%3Cpath d='M18 14v36h8V36l12 14h10L32 31l15-17H37L26 28V14z' fill='white'/%3E%3C/svg%3E";
  const icon = document.querySelector('link[rel="icon"]') || document.head.appendChild(document.createElement('link'));
  icon.rel = 'icon';
  icon.type = 'image/svg+xml';
  icon.href = favicon;

  const path = location.pathname;
  const parts = path.split('/').filter(Boolean);
  const appSlug = parts.length > 1 ? parts[0] : null;
  const page = (parts.at(-1) || 'privacy.html').replace('.html', '');
  const main = document.querySelector('main');
  if (!main) return;

  document.body.classList.add('unified-legal-page');
  main.classList.add('unified-legal-main');

  document.querySelectorAll('footer p').forEach(paragraph => {
    paragraph.innerHTML = paragraph.innerHTML
      .replace('Kenneth M. S. De Geest', 'Kestora Labs')
      .replace('Kenneth Marcel S De Geest', 'Kestora Labs');
  });

  const header = document.createElement('header');
  header.className = 'site-header legal-site-header';
  header.innerHTML = `
    <a class="wordmark" href="/" aria-label="Kestora Labs app portfolio home">
      <span class="wordmark-name">Kestora Labs</span><span class="wordmark-label">Independent Apps</span>
    </a>
    <nav aria-label="Main navigation"><a href="/">All apps</a></nav>`;
  main.before(header);

  const tools = document.createElement('div');
  tools.className = 'legal-page-tools';
  const appHome = appSlug ? `/${appSlug}/` : '/';
  const healthTab = appSlug === 'bulkbro' ? '<a href="health.html">Health</a>' : '';
  tools.innerHTML = appSlug ? `
    <a class="legal-app-back" href="${appHome}">← Back to app</a>
    <nav class="legal-tabs" aria-label="App information">
      <a href="privacy.html" ${page === 'privacy' ? 'aria-current="page"' : ''}>Privacy</a>
      <a href="terms.html" ${page === 'terms' ? 'aria-current="page"' : ''}>Terms</a>
      <a href="support.html" ${page === 'support' ? 'aria-current="page"' : ''}>Support</a>
      ${healthTab.replace('href="health.html"', `href="health.html" ${page === 'health' ? 'aria-current="page"' : ''}`)}
    </nav>` : `
    <a class="legal-app-back" href="/">← All apps</a>
    <nav class="legal-tabs" aria-label="Website information"><a href="/privacy.html" aria-current="page">Website privacy</a></nav>`;
  main.prepend(tools);

  const shell = document.createElement('div');
  shell.className = 'legal-document-shell';
  const contentNodes = [...main.childNodes].filter(node => node !== tools);
  contentNodes.forEach(node => shell.appendChild(node));
  main.appendChild(shell);
})();
