(() => {
  const preferenceKey = 'kestora-language';
  const path = location.pathname.replace(/\/index\.html$/, '/');
  const pairs = {
    '/': '/es/',
    '/privacy.html': '/es/privacidad/',
    '/bulkbro/': '/es/bulkbro/',
    '/bulkbro/privacy.html': '/es/bulkbro/privacidad/',
    '/bulkbro/terms.html': '/es/bulkbro/terminos/',
    '/bulkbro/health.html': '/es/bulkbro/salud/',
    '/bulkbro/support.html': '/es/bulkbro/soporte/',
    '/bulkbro/calorie-surplus-calculator/': '/es/bulkbro/calculadora-de-calorias/',
    '/bulkbro/guides/': '/es/bulkbro/guias/',
    '/bulkbro/guides/editorial-policy/': '/es/bulkbro/guias/politica-editorial/',
    '/bulkbro/guides/how-many-calories-to-gain-weight/': '/es/bulkbro/guias/cuantas-calorias-para-ganar-peso/',
    '/bulkbro/guides/why-am-i-not-gaining-weight/': '/es/bulkbro/guias/por-que-no-aumento-de-peso/',
    '/bulkbro/guides/how-fast-should-you-gain-weight/': '/es/bulkbro/guias/cuanto-peso-ganar-por-semana/',
    '/bulkbro/guides/calorie-surplus-for-muscle-gain/': '/es/bulkbro/guias/superavit-calorico-para-ganar-masa-muscular/',
    '/bulkbro/guides/how-to-track-calories-for-weight-gain/': '/es/bulkbro/guias/como-contar-calorias-para-ganar-peso/',
    '/bulkbro/guides/how-often-should-you-weigh-yourself/': '/es/bulkbro/guias/cada-cuanto-pesarse/',
    '/bulkbro/guides/best-foods-for-healthy-weight-gain/': '/es/bulkbro/guias/alimentos-para-engordar/',
    '/bulkbro/guides/clean-bulk-vs-dirty-bulk/': '/es/bulkbro/guias/volumen-limpio-vs-sucio/',
    '/bulkbro/guides/how-to-build-a-weight-gain-meal-plan/': '/es/bulkbro/guias/dieta-para-engordar/',
    '/tiphaven/': '/es/tiphaven/',
    '/tiphaven/tip-out-calculator/': '/es/tiphaven/calculadora-reparto-propinas/',
    '/tiphaven/tip-pool-calculator/': '/es/tiphaven/calculadora-bote-propinas/',
    '/tiphaven/tip-split-calculator/': '/es/tiphaven/calculadora-dividir-propinas/',
    '/tiphaven/paycheck-calculator-with-tips/': '/es/tiphaven/calculadora-nomina-con-propinas/',
    '/tiphaven/how-much-do-servers-make-in-tips/': '/es/tiphaven/cuanto-gana-camarero-propinas/',
    '/tiphaven/server-tips-and-taxes/': '/es/tiphaven/propinas-impuestos-camareros/',
    '/tiphaven/average-bartender-salary-with-tips/': '/es/tiphaven/sueldo-bartender-con-propinas/',
    '/tiphaven/server-tip-out-percentage/': '/es/tiphaven/porcentaje-reparto-propinas-camareros/',
    '/tiphaven/splitting-tips-by-hours-worked/': '/es/tiphaven/repartir-propinas-horas-trabajadas/',
    '/tiphaven/best-tip-tracking-apps-for-servers/': '/es/tiphaven/mejores-apps-registrar-propinas/',
    '/tiphaven/privacy.html': '/es/tiphaven/privacidad/',
    '/tiphaven/terms.html': '/es/tiphaven/terminos/',
    '/tiphaven/support.html': '/es/tiphaven/soporte/',
    '/migraloom/': '/es/migraloom/',
    '/migraloom/privacy.html': '/es/migraloom/privacidad/',
    '/migraloom/terms.html': '/es/migraloom/terminos/',
    '/migraloom/support.html': '/es/migraloom/soporte/',
    '/migraloom/guides/': '/es/migraloom/guias/',
    '/migraloom/guides/migraine-symptom-tracker/': '/es/migraloom/sintomas-de-migrana/',
    '/migraloom/guides/migraine-diary-template/': '/es/migraloom/diario-de-migrana/',
    '/migraloom/guides/headache-calendar-app/': '/es/migraloom/calendario-de-cefaleas/',
    '/migraloom/guides/how-to-keep-a-headache-diary/': '/es/migraloom/diario-de-cefaleas/',
    '/migraloom/guides/headache-diary-template/': '/es/migraloom/diario-de-dolor-de-cabeza/',
    '/migraloom/guides/best-migraine-tracker-apps/': '/es/migraloom/app-para-migranas/'
  };

  const reversePairs = Object.fromEntries(Object.entries(pairs).map(([english, spanish]) => [spanish, english]));
  const explicitPreference = localStorage.getItem(preferenceKey);
  const browserUsesSpanish = (navigator.languages || [navigator.language || 'en'])
    .some(language => String(language).toLowerCase().startsWith('es'));

  // Detect only from an English/default URL. A direct Spanish URL is treated as intentional.
  if (pairs[path] && explicitPreference !== 'en' && (explicitPreference === 'es' || (!explicitPreference && browserUsesSpanish))) {
    location.replace(pairs[path] + location.search + location.hash);
    return;
  }

  addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-locale]').forEach(link => {
      link.addEventListener('click', () => localStorage.setItem(preferenceKey, link.dataset.locale));
    });

    const alternate = document.querySelector('[data-current-language]');
    if (alternate) alternate.textContent = reversePairs[path] ? 'Español' : 'English';
  });
})();
