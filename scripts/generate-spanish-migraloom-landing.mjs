import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const sourcePath = path.join(root, 'migraloom/index.html');
let html = fs.readFileSync(sourcePath, 'utf8');

const replacements = [
  ['<html lang="en" class="no-js">','<html lang="es" class="no-js">'],
  ['<title>MigraLoom — Private Migraine Diary & Headache Tracker</title>','<title>Diario de migraña y calendario de cefaleas | MigraLoom</title>'],
  ['Log migraine and headache episodes, understand patterns in your recorded history, and prepare clearer visit reports with MigraLoom for iPhone.','Registra episodios de migraña y cefalea, revisa patrones en tu historial y prepara informes claros para tu próxima consulta con MigraLoom para iPhone.'],
  ['<link rel="canonical" href="https://kestoralabs.com/migraloom/">','<link rel="canonical" href="https://kestoralabs.com/es/migraloom/">\n  <link rel="alternate" hreflang="en" href="https://kestoralabs.com/migraloom/">\n  <link rel="alternate" hreflang="es" href="https://kestoralabs.com/es/migraloom/">\n  <link rel="alternate" hreflang="x-default" href="https://kestoralabs.com/migraloom/">'],
  ['MigraLoom — A calmer migraine journal','MigraLoom — Un diario de migraña más sereno'],
  ['Keep the details that matter. See your recorded patterns. Bring a clearer history to your next appointment.','Guarda los detalles importantes, revisa los patrones registrados y lleva un historial más claro a tu próxima consulta.'],
  ['<meta property="og:url" content="https://kestoralabs.com/migraloom/">','<meta property="og:url" content="https://kestoralabs.com/es/migraloom/">'],
  ['ct=kestora_migraloom_landing','ct=kestora_migraloom_es_smart_banner'],
  ['href="../assets/migraloom.png"','href="/assets/migraloom.png"'],
  ['href="fonts/instrument-serif-latin.woff2"','href="/migraloom/fonts/instrument-serif-latin.woff2"'],
  ['href="fonts/dm-sans-latin.woff2"','href="/migraloom/fonts/dm-sans-latin.woff2"'],
  ['href="../assets/screens/migraloom-home.png"','href="/assets/screens/es/migraloom-01.webp"'],
  ['href="styles.css?v=20261105-2"','href="/migraloom/styles.css?v=20261105-2">\n  <link rel="stylesheet" href="/es/migraloom/styles-es.css?v=20261107-1"'],
  ['src="../site.js?v=20261104-analytics"','src="/site.js?v=20261104-analytics"'],
  ['src="../locale.js?v=20261107-3"','src="/locale.js?v=20261107-3"'],
  ['src="../assets/migraloom.png"','src="/assets/migraloom.png"'],
  ['"description": "A private migraine diary and symptom log for recording episodes, reviewing patterns in recorded history, and preparing visit reports."','"description": "Un diario privado de migraña y síntomas para registrar episodios, revisar patrones del historial y preparar informes para la consulta."'],
  ['"priceCurrency": "USD"','"priceCurrency": "EUR"'],
  ['Is MigraLoom a medical device or diagnostic tool?','¿MigraLoom es un dispositivo médico o una herramienta de diagnóstico?'],
  ['No. MigraLoom is a personal journal and appointment-preparation tool. It does not provide medical advice, diagnosis, treatment or emergency care.','No. MigraLoom es un diario personal y una herramienta para preparar consultas. No ofrece asesoramiento, diagnóstico, tratamiento ni atención de urgencia.'],
  ['Can I use MigraLoom without creating an account?','¿Puedo usar MigraLoom sin crear una cuenta?'],
  ['Yes. No MigraLoom account is required to use the journal.','Sí. No necesitas una cuenta de MigraLoom para utilizar el diario.'],
  ['What happens after five recorded episodes?','¿Qué ocurre después de cinco episodios registrados?'],
  ['A one-time in-app purchase unlocks continued episode recording. Saved history, Patterns, Reports and basic export remain available without a purchase.','Una compra única dentro de la app desbloquea el registro continuado. El historial guardado, Patrones, Informes y la exportación básica siguen disponibles sin comprar.'],
  ['Does MigraLoom determine migraine triggers?','¿MigraLoom determina los desencadenantes de la migraña?'],
  ['No. MigraLoom helps users review recurring details in their recorded history, but it does not infer causes or make medical conclusions.','No. MigraLoom ayuda a revisar detalles recurrentes del historial registrado, pero no deduce causas ni presenta conclusiones médicas.'],
  ['Can I share my migraine history with a healthcare professional?','¿Puedo compartir mi historial de migraña con un profesional sanitario?'],
  ['Users can prepare a structured visit summary and export a PDF when they decide to share it.','Puedes preparar un resumen estructurado para la consulta y exportar un PDF cuando decidas compartirlo.'],
  ['Skip to content','Ir al contenido'],['MigraLoom home','Inicio de MigraLoom'],['Primary navigation','Navegación principal'],
  ['How it works','Cómo funciona'],['Guides','Guías'],['Privacy','Privacidad'],['Questions','Preguntas'],
  ['Back to the Kestora Labs app portfolio','Volver al portfolio de apps de Kestora Labs'],['Get the app','Descargar'],
  ['Private migraine journal for iPhone','Diario privado de migraña para iPhone'],
  ['Remember less.<br><em>Bring a clearer record.</em>','Recuerda menos.<br><em>Lleva un historial más claro.</em>'],
  ['Migraine days can blur together. MigraLoom helps you capture what matters when you can, return to it later, and prepare a clearer history for your next conversation.','Los días de migraña pueden confundirse entre sí. MigraLoom te ayuda a guardar lo importante cuando puedes, completarlo después y preparar un historial más claro para la próxima consulta.'],
  ['Download on the App Store','Descargar en App Store'],['See how it works','Descubre cómo funciona'],
  ['No account required','Sin cuenta'],['Five episodes free','Cinco episodios gratis'],['One-time unlock','Desbloqueo con un solo pago'],
  ['Built for the days when even small tasks feel like too much.','Creada para los días en que incluso una tarea pequeña puede ser demasiado.'],
  ['01 / THE PROBLEM','01 / EL PROBLEMA'],
  ['A migraine is hard enough.<br><em>Remembering every detail later shouldn’t be another task.</em>','Una migraña ya es bastante difícil.<br><em>Recordar cada detalle después no debería ser otra tarea.</em>'],
  ['Timing, intensity, symptoms, possible triggers, medication, relief attempts—important context can disappear once the day moves on.','La hora, la intensidad, los síntomas, posibles desencadenantes, medicación y medidas de alivio pueden olvidarse a medida que avanza el día.'],
  ['MigraLoom starts with a fast first entry. The fuller record can wait until you have more space.','MigraLoom empieza con un registro rápido. Los detalles pueden esperar hasta que tengas más energía.'],
  ['02 / FROM THE MOMENT TO THE APPOINTMENT','02 / DEL MOMENTO A LA CONSULTA'],
  ['One calm path through your recorded history.','Un recorrido sereno por tu historial registrado.'],
  ['Each part of MigraLoom has one job. Capture the moment, understand what you recorded, then shape it into something easier to discuss.','Cada parte de MigraLoom tiene una función: registrar el momento, revisar lo anotado y convertirlo en algo más fácil de comentar.'],
  ['Record an episode','Registra un episodio'],['Start small.<br>Leave the rest for later.','Empieza por lo mínimo.<br>Deja el resto para después.'],
  ['Begin with timing and intensity. Add symptoms, pain location, medication, possible triggers, relief attempts and notes whenever it feels manageable.','Empieza con la hora y la intensidad. Añade síntomas, zona del dolor, medicación, posibles desencadenantes, medidas de alivio y notas cuando te resulte posible.'],
  ['Optional daily check-ins','Registros diarios opcionales'],['Past-episode logging','Episodios anteriores'],
  ['Review patterns','Revisa patrones'],['See what your history shows.<br>Nothing more.','Observa lo que muestra tu historial.<br>Nada más.'],
  ['Review episode frequency, duration, intensity and recurring details across 30 days, 90 days or one year. MigraLoom describes the records you made without guessing at causes.','Revisa la frecuencia, duración, intensidad y detalles recurrentes durante 30 días, 90 días o un año. MigraLoom describe lo que registraste sin atribuir causas.'],
  ['Recorded days stay distinct','Los días registrados se distinguen'],['Unknown stays unknown','Lo desconocido sigue siendo desconocido'],
  ['Prepare a visit report','Prepara un informe para la consulta'],['Turn your journal into a clearer conversation.','Convierte tu diario en una conversación más clara.'],
  ['Choose a date range, decide what to include, and create a structured summary. Export a PDF only when you choose to share it.','Elige un periodo, decide qué incluir y crea un resumen estructurado. Exporta un PDF solo cuando quieras compartirlo.'],
  ['You control the period','Tú eliges el periodo'],['You choose what to share','Tú eliges qué compartir'],
  ['03 / DESIGNED WITH RESTRAINT','03 / DISEÑADA CON PRUDENCIA'],
  ['A journal should support your memory.<br><em>It shouldn’t pretend to replace medical judgment.</em>','Un diario debe apoyar tu memoria.<br><em>No debe pretender sustituir el criterio médico.</em>'],
  ['Recorded, not assumed','Registrado, no supuesto'],['Unrecorded days remain unknown. MigraLoom does not label them symptom-free.','Los días no registrados siguen siendo desconocidos. MigraLoom no los marca como días sin síntomas.'],
  ['Patterns, not diagnoses','Patrones, no diagnósticos'],['Your history is summarized without presenting correlations as medical conclusions.','El historial se resume sin presentar correlaciones como conclusiones médicas.'],
  ['Useful, not overwhelming','Útil, sin abrumar'],['Important context is available without turning every entry into a long questionnaire.','Guarda el contexto importante sin convertir cada registro en un cuestionario interminable.'],
  ['04 / YOUR JOURNAL','04 / TU DIARIO'],['Personal by nature.<br><em>Private by design.</em>','Personal por naturaleza.<br><em>Privado desde el diseño.</em>'],
  ['No MigraLoom account is required. Journal entries are stored on your iPhone and may be included in Apple device backups according to your settings.','No necesitas una cuenta de MigraLoom. Las entradas se guardan en tu iPhone y pueden incluirse en las copias del dispositivo según tus ajustes de Apple.'],
  ['No advertising trackers','Sin rastreadores publicitarios'],['Optional diagnostics are off by default','Los diagnósticos opcionales están desactivados por defecto'],['PDF export happens when you choose','El PDF se exporta cuando tú decides'],
  ['Read the current privacy policy','Lee la política de privacidad vigente'],
  ['05 / START WITHOUT PRESSURE','05 / EMPIEZA SIN PRESIÓN'],['Five episodes free.<br><em>Keep going with one lifetime unlock.</em>','Cinco episodios gratis.<br><em>Continúa con un desbloqueo de por vida.</em>'],
  ['NO AUTO-RENEWING SUBSCRIPTION','SIN SUSCRIPCIÓN AUTORRENOVABLE'],
  ['Your saved history, Patterns, Reports and basic export remain available without a purchase. A one-time in-app purchase unlocks continued episode recording after the first five episodes.','El historial guardado, Patrones, Informes y la exportación básica siguen disponibles sin comprar. Una compra única desbloquea nuevos registros después de los primeros cinco episodios.'],
  ['Start with MigraLoom','Empieza con MigraLoom'],['06 / QUESTIONS','06 / PREGUNTAS'],['Before you begin.','Antes de empezar.'],
  ['Can I use the app without creating an account?','¿Puedo usar la app sin crear una cuenta?'],['What happens after five episodes?','¿Qué ocurre después de cinco episodios?'],['Does MigraLoom determine my triggers?','¿MigraLoom determina mis desencadenantes?'],['Can I share my history with a healthcare professional?','¿Puedo compartir mi historial con un profesional sanitario?'],
  ['You can unlock continued episode recording with a one-time in-app purchase. Existing history and the basic review tools remain available.','Puedes desbloquear nuevos registros mediante una compra única. El historial existente y las herramientas básicas de revisión siguen disponibles.'],
  ['No. It helps you review recurring details in what you recorded, but it does not infer causes or make medical conclusions.','No. Ayuda a revisar detalles recurrentes de lo registrado, pero no deduce causas ni presenta conclusiones médicas.'],
  ['You can prepare a structured visit summary and export a PDF when you decide to share it.','Puedes preparar un resumen estructurado para la consulta y exportar un PDF cuando decidas compartirlo.'],
  ['Your experience deserves a record you can return to.','Tu experiencia merece un registro al que puedas volver.'],['A little space.<br><em>Just for you.</em>','Un poco de espacio.<br><em>Solo para ti.</em>'],['Download MigraLoom','Descargar MigraLoom'],
  ['Requires iOS 17.0 or later · iPhone only','Requiere iOS 17.0 o posterior · Solo para iPhone'],['by Kestora Labs','de Kestora Labs'],['Footer navigation','Navegación del pie de página'],['Terms','Condiciones'],['Support','Soporte'],['Cookie settings','Configurar cookies'],
  ['MigraLoom is not medical advice, diagnosis, treatment or emergency care.','MigraLoom no ofrece asesoramiento, diagnóstico, tratamiento ni atención de urgencia.'],
  ['Your privacy, your choice','Tu privacidad, tu elección'],['Help us improve this page?','¿Nos ayudas a mejorar esta página?'],['Analytics stays off unless you accept.','Analytics permanece desactivado hasta que aceptes.'],['Website privacy','Privacidad del sitio'],['Essential only','Solo esenciales'],['Accept analytics','Aceptar Analytics']
];
for (const [from,to] of replacements) html = html.replaceAll(from,to);

// Earlier short replacements can partially translate longer phrases.
html = html.replaceAll('Cinco episodios gratis.<br><em>Keep going with one lifetime unlock.</em>','Cinco episodios gratis.<br><em>Continúa con un desbloqueo de por vida.</em>');
html = html.replaceAll('aria-label="Product highlights"','aria-label="Características principales"');
html = html.replaceAll('aria-label="MigraLoom philosophy"','aria-label="Filosofía de MigraLoom"');

html = html
  .replaceAll('href="guides/"','href="/es/migraloom/guias/"')
  .replaceAll('href="privacy.html"','href="/es/migraloom/privacidad/"')
  .replaceAll('href="terms.html"','href="/es/migraloom/terminos/"')
  .replaceAll('href="support.html"','href="/es/migraloom/soporte/"')
  .replaceAll('href="../"','href="/es/"')
  .replaceAll('href="../privacy.html"','href="/es/privacidad/"')
  .replaceAll('ct=migraloom_header','ct=kestora_migraloom_es_header')
  .replaceAll('ct=migraloom_hero','ct=kestora_migraloom_es_hero')
  .replaceAll('ct=migraloom_pricing','ct=kestora_migraloom_es_pricing')
  .replaceAll('ct=migraloom_final','ct=kestora_migraloom_es_final')
;
if (!html.includes('/locale.js')) html = html.replace('  <script src="/site.js?v=20261104-analytics" defer></script>','  <script src="/locale.js?v=20261107-3"></script>\n  <script src="/site.js?v=20261104-analytics" defer></script>');

html = html.replace(/      <div class="hero-visual"[\s\S]*?      <\/div>\n    <\/section>/, `      <div class="hero-visual" aria-label="Capturas en español de MigraLoom"><div class="loom-rings" aria-hidden="true"></div><div class="hero-store-grid"><img src="/assets/screens/es/migraloom-01.webp" width="720" height="1565" fetchpriority="high" alt="MigraLoom en español mostrando el registro de migrañas"><img src="/assets/screens/es/migraloom-02.webp" width="720" height="1565" alt="MigraLoom en español mostrando la evolución registrada"></div><div class="spanish-screen-note">Pantallas reales de la app · Datos de ejemplo</div></div>\n    </section>`);

const screenReplacements = [
  [/<div class="feature-screen coral-panel">[\s\S]*?<\/div>\n      <\/article>/,`<div class="feature-screen coral-panel"><img class="store-shot" loading="lazy" decoding="async" src="/assets/screens/es/migraloom-04.webp" width="720" height="1565" alt="Registros diarios de MigraLoom en español"></div>\n      </article>`],
  [/<div class="feature-screen violet-panel">[\s\S]*?<\/div>\n      <\/article>/,`<div class="feature-screen violet-panel"><img class="store-shot" loading="lazy" decoding="async" src="/assets/screens/es/migraloom-02.webp" width="720" height="1565" alt="Evolución de migrañas en MigraLoom en español"></div>\n      </article>`],
  [/<div class="feature-screen mint-panel">[\s\S]*?<\/div>\n      <\/article>/,`<div class="feature-screen mint-panel"><img class="store-shot" loading="lazy" decoding="async" src="/assets/screens/es/migraloom-03.webp" width="720" height="1565" alt="Informe para la consulta médica en MigraLoom en español"></div>\n      </article>`]
];
for (const [pattern,value] of screenReplacements) html = html.replace(pattern,value);
html = html.replace(/<div class="privacy-visual reveal">[\s\S]*?<\/div>\n      <div class="privacy-copy/,`<div class="privacy-visual reveal"><img class="store-shot" loading="lazy" decoding="async" src="/assets/screens/es/migraloom-06.webp" width="720" height="1565" alt="Privacidad local de MigraLoom explicada en español"></div>\n      <div class="privacy-copy`);
html = html.replace('      <a href="/es/migraloom/" lang="es" hreflang="es" data-locale="es">Español</a>\n','');
html = html.replace('<a href="/es/">Kestora Labs</a>','<a href="/migraloom/" lang="en" hreflang="en" data-locale="en">English</a><a href="/es/">Kestora Labs</a>');
fs.mkdirSync(path.join(root,'es/migraloom'),{recursive:true});
fs.writeFileSync(path.join(root,'es/migraloom/index.html'),html);

let english = fs.readFileSync(sourcePath,'utf8');
if(!english.includes('hreflang="es"')) english = english.replace('<link rel="canonical" href="https://kestoralabs.com/migraloom/">','<link rel="canonical" href="https://kestoralabs.com/migraloom/">\n  <link rel="alternate" hreflang="en" href="https://kestoralabs.com/migraloom/">\n  <link rel="alternate" hreflang="es" href="https://kestoralabs.com/es/migraloom/">\n  <link rel="alternate" hreflang="x-default" href="https://kestoralabs.com/migraloom/">');
if(!english.includes('/locale.js')) english = english.replace('<script src="../site.js?v=20261104-analytics" defer></script>','<script src="../locale.js?v=20261107-3"></script>\n  <script src="../site.js?v=20261104-analytics" defer></script>');
if(!english.includes('data-locale="es"')) english = english.replace('<a href="../">Kestora Labs</a>','<a href="/es/migraloom/" lang="es" hreflang="es" data-locale="es">Español</a>\n      <a href="../">Kestora Labs</a>');
fs.writeFileSync(sourcePath,english);

console.log('Generated the Spanish MigraLoom landing page and updated English locale links.');
