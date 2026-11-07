import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const base = path.join(root, 'es/migraloom');
const app = 'https://apps.apple.com/app/apple-store/id6811065580?pt=128911414&mt=8';
const sources = {
  medline: 'https://medlineplus.gov/spanish/migraine.html',
  encyclopedia: 'https://www.medlineplus.gov/spanish/ency/article/000709.htm',
  who: 'https://www.who.int/es/news-room/fact-sheets/detail/headache-disorders',
  mayoAura: 'https://www.mayoclinic.org/es/diseases-conditions/migraine-with-aura/diagnosis-treatment/drc-20352077',
  mayoSymptoms: 'https://www.mayoclinic.org/es/diseases-conditions/migraine-headache/symptoms-causes/syc-20360201'
};

const guides = [
  {
    slug: 'sintomas-de-migrana', keyword: 'síntomas de migraña', en: 'migraine-symptom-tracker',
    title: 'Síntomas de migraña: qué registrar y cómo preparar tu consulta',
    description: 'Guía para registrar síntomas de migraña, su duración e impacto sin convertir un diario personal en un diagnóstico.',
    eyebrow: 'Guía de observación · Sin diagnóstico',
    hero: 'Síntomas de migraña: registra lo que ocurrió, no lo que crees que significa.',
    lead: 'Una estructura sencilla para anotar dolor, sensibilidad, náuseas, aura, duración e impacto y llevar un historial más claro a la consulta.',
    answer: '<strong>¿Qué síntomas merece la pena anotar?</strong><p>Registra únicamente lo que observaste: cuándo empezó, dónde sentiste dolor, intensidad, náuseas, sensibilidad a luz o sonido, alteraciones visuales o sensoriales, duración e impacto. No todas las personas presentan las mismas fases ni todos los síntomas.</p>',
    sections: `<h2>Una lista útil, no una lista obligatoria</h2><p>MedlinePlus explica que la migraña puede incluir dolor pulsátil, náuseas, vómitos y sensibilidad a la luz, el sonido u olores. Algunas personas tienen aura; otras no. Una lista sirve como recordatorio, pero dejar una casilla en blanco debe significar «no registrado», no «ausente».</p><h2>Qué registrar durante un episodio</h2><ul><li>Fecha y hora aproximada de inicio y final.</li><li>Zona, tipo e intensidad del dolor en tus propias palabras.</li><li>Síntomas asociados que realmente notaste.</li><li>Actividad afectada: trabajo, sueño, estudio o tareas habituales.</li><li>Medicación o medida de alivio, con hora y dosis si la conoces.</li><li>Qué anotaste en el momento y qué recordaste después.</li></ul><h2>Cuándo no esperar al diario</h2><p>Un registro no sustituye una valoración. Busca atención médica ante síntomas nuevos, intensos o preocupantes. Mayo Clinic enumera señales de alarma como un dolor repentino e intenso o dolor acompañado de fiebre, rigidez de cuello, confusión, convulsiones, visión doble, debilidad o entumecimiento.</p>`,
    sources: [[sources.medline,'MedlinePlus: Migraña'],[sources.mayoSymptoms,'Mayo Clinic: síntomas y causas']]
  },
  {
    slug: 'migrana-con-aura', keyword: 'migraña con aura', en: 'migraine-symptom-tracker',
    title: 'Migraña con aura: qué anotar en un diario personal',
    description: 'Qué registrar cuando hay migraña con aura: tipo de alteración, hora, duración, dolor posterior e información para la consulta.',
    eyebrow: 'Aura · Registro para la consulta', hero: 'Migraña con aura: separa lo que viste, sentiste y recordaste.',
    lead: 'Una guía prudente para describir alteraciones visuales o sensoriales y su relación temporal con el episodio, sin autodiagnosticarlas.',
    answer: '<strong>¿Qué conviene anotar sobre un aura?</strong><p>Describe el síntoma con tus palabras, la hora de inicio, cuánto duró, si cambió con el tiempo y cuándo apareció el dolor. Anota también si era la primera vez o si fue distinto de otros episodios y comunícalo a un profesional.</p>',
    sections: `<h2>El aura no es igual para todo el mundo</h2><p>MedlinePlus describe el aura como una fase posible, no universal, que puede producir alteraciones visuales u otros síntomas neurológicos. Mayo Clinic indica que la evaluación considera los síntomas, antecedentes y examen físico; no existe una única prueba específica para confirmarla.</p><h2>Una cronología clara</h2><ol><li>Anota la hora exacta o aproximada del primer cambio.</li><li>Describe lo observado o sentido sin elegir una causa.</li><li>Registra si evolucionó, se desplazó o desapareció.</li><li>Anota cuándo comenzó el dolor u otros síntomas.</li><li>Incluye cualquier diferencia respecto a episodios anteriores.</li></ol><h2>Primera vez o cambio importante</h2><p>Las alteraciones visuales, sensoriales o del lenguaje también pueden tener otras causas. Si son nuevas, diferentes, prolongadas o preocupantes, busca valoración médica. El diario puede apoyar la conversación, pero no decide qué ocurrió.</p>`,
    sources: [[sources.medline,'MedlinePlus: Migraña'],[sources.mayoAura,'Mayo Clinic: migraña con aura']]
  },
  {
    slug: 'diario-de-migrana', keyword: 'diario de migraña', en: 'migraine-diary-template',
    title: 'Diario de migraña: qué anotar y cómo mantenerlo',
    description: 'Cómo crear un diario de migraña sostenible con fecha, síntomas, duración, medicación, impacto y preguntas para la consulta.',
    eyebrow: 'Método práctico · Menos carga', hero: 'Un diario de migraña útil empieza con el mínimo que puedas mantener.',
    lead: 'No necesitas completar un cuestionario perfecto durante un episodio. Registra una base pequeña y vuelve a los detalles cuando puedas.',
    answer: '<strong>¿Cuál es el diario más útil?</strong><p>El que puedes mantener con cierta regularidad. Una entrada mínima puede ser fecha, hora, intensidad e impacto. Los detalles adicionales pueden completarse después y marcarse como recuerdos posteriores.</p>',
    sections: `<h2>La entrada mínima</h2><p>Empieza por cuatro datos: inicio, intensidad, duración aproximada e impacto. Si tienes energía, añade síntomas, zona del dolor, medicación, medidas de alivio y notas. Esta estructura evita que el diario se convierta en otra tarea difícil.</p><h2>Revisión semanal, no interpretación automática</h2><p>Una vez por semana, comprueba si faltan finales de episodio o dosis. Observa frecuencia y duración, pero evita convertir coincidencias en causas. Un profesional puede ayudarte a interpretar el historial dentro de tu situación clínica.</p><h2>Preparar una consulta</h2><p>Resume el periodo solicitado, los episodios más relevantes, los cambios y las preguntas que deseas hacer. MedlinePlus recomienda llevar un registro de los ataques y del contexto; el valor está en la historia concreta, no en tener todas las casillas llenas.</p>`,
    sources: [[sources.encyclopedia,'MedlinePlus: enciclopedia sobre migraña'],[sources.medline,'MedlinePlus: Migraña']]
  },
  {
    slug: 'calendario-de-migranas', keyword: 'calendario de migrañas', en: 'headache-calendar-app',
    title: 'Calendario de migrañas: frecuencia, duración y contexto mensual',
    description: 'Cómo usar un calendario de migrañas para resumir frecuencia, duración e intensidad sin perder los detalles de cada episodio.',
    eyebrow: 'Vista mensual · Historial personal', hero: 'Un calendario de migrañas muestra el mes; el diario explica cada día.',
    lead: 'Usa una vista mensual para ver la frecuencia y enlázala con notas de episodio para conservar duración, síntomas e impacto.',
    answer: '<strong>¿Qué debe mostrar un calendario de migrañas?</strong><p>Como mínimo, los días con un episodio registrado. Puedes añadir intensidad o duración con una clave sencilla. Los días en blanco deben tratarse como «sin información» salvo que hayas confirmado activamente que no hubo síntomas.</p>',
    sections: `<h2>Una leyenda que no te obligue a recordar</h2><p>Elige uno o dos códigos: por ejemplo, color para intensidad y un pequeño marcador para duración. Mantén la explicación junto al calendario. Evita demasiados símbolos porque hacen más difícil completar y revisar el mes.</p><h2>Calendario y registro detallado</h2><p>La vista mensual responde «cuándo» y «con qué frecuencia». Una ficha de episodio responde «qué ocurrió». Combinar ambas reduce el ruido: abre el detalle solo cuando lo necesites.</p><h2>Comparar periodos con prudencia</h2><p>Compara meses solo cuando el registro sea parecido. Si un mes tiene muchas lagunas, no lo trates como mejor. La OMS señala que la migraña y otras cefaleas pueden tener un impacto importante; un calendario ayuda a comunicar esa carga, no a diagnosticarla.</p>`,
    sources: [[sources.who,'OMS: Migraña y otras cefaleas'],[sources.medline,'MedlinePlus: Migraña']]
  },
  {
    slug: 'diario-de-cefaleas', keyword: 'diario de cefaleas', en: 'how-to-keep-a-headache-diary',
    title: 'Diario de cefaleas: una rutina sencilla para registrar episodios',
    description: 'Cómo mantener un diario de cefaleas con una rutina breve para frecuencia, intensidad, síntomas, medicación e impacto.',
    eyebrow: 'Rutina de registro · Cefaleas', hero: 'Un diario de cefaleas debe aclarar tu historia, no decidir el diagnóstico.',
    lead: 'Registra observaciones consistentes sobre distintos dolores de cabeza y conserva las diferencias que pueden ser útiles en una consulta.',
    answer: '<strong>¿Qué diferencia hay entre diario de cefaleas y diario de migraña?</strong><p>Un diario de cefaleas puede incluir cualquier episodio de dolor de cabeza. No exige que clasifiques el tipo. Un diario de migraña suele organizarse alrededor de episodios ya identificados o sospechados como migraña.</p>',
    sections: `<h2>Registra antes de clasificar</h2><p>Anota fecha, inicio, duración, localización, tipo de dolor, intensidad, síntomas acompañantes e impacto. Usa palabras sencillas. Clasificar una cefalea requiere contexto clínico; el diario aporta información, no una etiqueta.</p><h2>Una rutina de dos momentos</h2><ol><li>Durante el episodio: hora, intensidad y dato más importante.</li><li>Después: duración, medidas tomadas, efecto percibido e impacto.</li></ol><p>Revisa una vez por semana los campos incompletos y señala qué información procede del recuerdo.</p><h2>La frecuencia también importa</h2><p>La OMS distingue varios trastornos de cefalea y advierte sobre la cefalea por uso excesivo de medicamentos. Lleva una lista fiel de los días y medicamentos usados y coméntala con un profesional; no cambies el tratamiento basándote solo en una gráfica.</p>`,
    sources: [[sources.who,'OMS: Migraña y otras cefaleas'],[sources.encyclopedia,'MedlinePlus: migraña']]
  },
  {
    slug: 'calendario-de-cefaleas', keyword: 'calendario de cefaleas', en: 'headache-calendar-app',
    title: 'Calendario de cefaleas: plantilla mensual y forma de usarla',
    description: 'Cómo crear un calendario mensual de cefaleas que muestre días, intensidad y medicación sin convertir huecos en días sin dolor.',
    eyebrow: 'Resumen mensual · Cefaleas', hero: 'Un calendario de cefaleas convierte muchos episodios en una vista fácil de explicar.',
    lead: 'Marca solo lo que sabes, conserva una leyenda simple y enlaza cada día relevante con una nota de episodio.',
    answer: '<strong>¿Cómo se rellena?</strong><p>Marca cada día con cefalea registrada y añade un código de intensidad o duración. Si no registraste un día, déjalo como desconocido; no asumas que fue un día sin síntomas.</p>',
    sections: `<h2>Tres capas son suficientes</h2><ul><li>Día con cefalea registrada.</li><li>Intensidad máxima con una escala coherente.</li><li>Medicación o medida de alivio mediante un símbolo.</li></ul><p>Los síntomas y notas extensas pertenecen a la ficha del episodio, no al calendario.</p><h2>Qué revisar al final del mes</h2><p>Cuenta días registrados, no «días perfectos». Observa si hay semanas incompletas y si los episodios se solapan. Resume el impacto en actividades y las dudas para tu próxima consulta.</p><h2>Un resumen no sustituye el detalle</h2><p>Las cefaleas abarcan distintos trastornos y causas. La OMS recomienda mejorar su reconocimiento y atención. Utiliza el calendario como herramienta de comunicación y solicita valoración cuando el patrón cambie o te preocupe.</p>`,
    sources: [[sources.who,'OMS: Migraña y otras cefaleas'],[sources.encyclopedia,'MedlinePlus: migraña']]
  },
  {
    slug: 'registro-de-migranas', keyword: 'registro de migrañas', en: 'migraine-diary-template',
    title: 'Registro de migrañas: una ficha clara para cada episodio',
    description: 'Estructura un registro de migrañas por episodio con inicio, síntomas, medicación, medidas de alivio e impacto.',
    eyebrow: 'Ficha por episodio · Historial', hero: 'Un registro de migrañas conserva el orden de lo ocurrido.',
    lead: 'Separa el inicio, la fase activa y la recuperación para que el episodio sea más fácil de recordar y explicar.',
    answer: '<strong>¿Qué debe incluir una ficha?</strong><p>Fecha, inicio y final aproximados, intensidad, zona y tipo de dolor, síntomas observados, medicación o acciones, impacto y notas. Añade qué información se registró en el momento y cuál se completó después.</p>',
    sections: `<h2>Antes, durante y después</h2><p>Una cronología evita mezclar recuerdos. En «antes», anota cambios que realmente notaste. Durante el episodio, registra el mínimo. Después, completa duración, recuperación e impacto cuando tengas espacio.</p><h2>Medicación sin conclusiones rápidas</h2><p>Anota nombre, dosis y hora si los conoces, además del efecto que observaste. No uses una sola entrada para decidir que algo funciona o no funciona y no modifiques pautas sin orientación profesional.</p><h2>Del episodio al informe</h2><p>Al preparar una consulta, selecciona un periodo y resume frecuencia, duración, impacto y preguntas. MigraLoom puede agrupar tus registros y crear un PDF que tú eliges exportar; no interpreta ni diagnostica.</p>`,
    sources: [[sources.medline,'MedlinePlus: Migraña'],[sources.mayoAura,'Mayo Clinic: preparación para la consulta']]
  },
  {
    slug: 'diario-de-dolor-de-cabeza', keyword: 'diario de dolor de cabeza', en: 'headache-diary-template',
    title: 'Diario de dolor de cabeza: plantilla sencilla y ejemplos',
    description: 'Plantilla sencilla para un diario de dolor de cabeza con fecha, hora, intensidad, síntomas, medicación e impacto.',
    eyebrow: 'Plantilla simple · Sin registro', hero: 'Un diario de dolor de cabeza puede caber en una sola línea por episodio.',
    lead: 'Empieza con una tabla pequeña y añade una nota detallada solo cuando un episodio lo necesite.',
    answer: '<strong>¿Cuál es la plantilla mínima?</strong><p>Fecha | inicio y final | intensidad 0–10 | zona o tipo de dolor | otros síntomas | medicación o acción | impacto. Añade una columna de notas solo si la vas a utilizar.</p>',
    sections: `<h2>Ejemplo de una entrada</h2><p><strong>7 nov. · 14:20–18:00 · 6/10 · lado derecho, pulsátil · sensibilidad a la luz · medicación a las 15:00 · cancelé entrenamiento.</strong> Es un ejemplo de formato, no una interpretación clínica.</p><h2>Evita dos errores habituales</h2><p>No conviertas un campo vacío en «no». Tampoco reconstruyas todos los detalles como si se hubieran registrado en el momento. Señalar la incertidumbre hace el diario más honesto y útil.</p><h2>Papel, hoja de cálculo o app</h2><p>Elige el formato con menos fricción. El papel es inmediato, una hoja facilita ordenar y una app puede unir episodios, patrones e informes. La mejor opción es la que puedes mantener y proteger adecuadamente.</p>`,
    sources: [[sources.encyclopedia,'MedlinePlus: enciclopedia sobre migraña'],[sources.who,'OMS: cefaleas']]
  },
  {
    slug: 'app-para-migranas', keyword: 'app para migrañas', en: 'best-migraine-tracker-apps',
    title: 'App para migrañas: cómo elegir privacidad, informes y precio',
    description: 'Qué comparar al elegir una app para migrañas: carga de registro, privacidad, informes, exportación, precio y suscripciones.',
    eyebrow: 'Guía de compra · Comparación transparente', hero: 'La mejor app para migrañas es la que puedes usar y entender.',
    lead: 'Compara el esfuerzo de registro, el tratamiento de tus datos, los informes y el modelo de pago antes de comprometer tu historial.',
    answer: '<strong>¿Qué debería exigir a una app?</strong><p>Registro rápido, posibilidad de completar después, días no registrados claramente diferenciados, exportación útil, política de privacidad comprensible y precio visible. Ninguna app debería presentar correlaciones como diagnósticos.</p>',
    sections: `<h2>Seis preguntas antes de elegir</h2><ol><li>¿Puedo probar el flujo real antes de pagar?</li><li>¿Necesita cuenta o guarda el diario localmente?</li><li>¿Qué datos salen del teléfono?</li><li>¿Puedo exportar un informe y una copia completa?</li><li>¿Los huecos se muestran como desconocidos?</li><li>¿Es suscripción o compra única?</li></ol><h2>La diferencia de MigraLoom</h2><p>MigraLoom permite cinco episodios gratis y después ofrece un único desbloqueo no renovable. No exige cuenta, guarda el diario en el iPhone y separa patrones registrados de conclusiones médicas. El historial, Patrones, Informes y la exportación básica permanecen accesibles sin comprar.</p><h2>Prueba con un episodio real</h2><p>Antes de elegir, registra un episodio y comprueba cuánto tarda, si puedes completar datos después y si el informe expresa lo que realmente anotaste. Valora también accesibilidad, legibilidad y facilidad para borrar o exportar.</p>`,
    sources: [[sources.medline,'MedlinePlus: qué registrar'],[sources.who,'OMS: impacto de las cefaleas']]
  },
  {
    slug: 'desencadenantes-de-migrana', keyword: 'desencadenantes de migraña', en: 'migraine-symptom-tracker',
    title: 'Desencadenantes de migraña: cómo registrar posibles factores',
    description: 'Cómo registrar posibles desencadenantes de migraña sin confundir coincidencia con causa ni eliminar factores por tu cuenta.',
    eyebrow: 'Posibles factores · Registro prudente', hero: 'Un posible desencadenante es una observación, no una conclusión.',
    lead: 'Registra contexto y repetición con neutralidad. Evita eliminar alimentos, medicación o actividades basándote solo en coincidencias.',
    answer: '<strong>¿Qué puede registrarse como contexto?</strong><p>Sueño, comidas, hidratación, estrés, cambios hormonales, clima, actividad, alcohol, cafeína, luces, olores o cambios de rutina. Anota solo lo que conoces y evita listas interminables.</p>',
    sections: `<h2>Elige pocos campos</h2><p>MedlinePlus enumera distintos factores asociados a algunas personas, pero varían mucho. Selecciona dos o tres contextos relevantes para ti y regístralos de forma consistente durante un periodo acordado con un profesional.</p><h2>Coincidencia no significa causa</h2><p>Un factor puede aparecer antes de un episodio por azar, formar parte de una fase temprana o combinarse con otros. MigraLoom muestra detalles recurrentes en lo registrado, pero no determina desencadenantes.</p><h2>Decisiones seguras</h2><p>No suspendas medicación ni elimines grupos de alimentos sin consejo profesional. Lleva el historial a la consulta, explica qué observaste y pregunta cómo comprobar una hipótesis de forma segura.</p>`,
    sources: [[sources.medline,'MedlinePlus: Migraña y factores'],[sources.encyclopedia,'MedlinePlus: enciclopedia sobre migraña']]
  }
];

const sourceList = (items) => `<ul class="source-list">${items.map(([href,label]) => `<li><a href="${href}" rel="noopener">${label}</a></li>`).join('')}</ul>`;
const related = (current) => guides.filter(g => g.slug !== current).slice(0, 3).map(g => `<a class="related-card" href="/es/migraloom/${g.slug}/"><span>Guía MigraLoom</span><strong>${g.keyword}</strong></a>`).join('');

function render(g) {
  const code = g.slug.replaceAll('-', '_');
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${g.title} | MigraLoom</title><meta name="description" content="${g.description}"><meta name="robots" content="index,follow,max-image-preview:large"><meta name="theme-color" content="#f7f3ef"><meta name="apple-itunes-app" content="app-id=6811065580, affiliate-data=pt=128911414&amp;ct=kestora_migraloom_es_${code}"><link rel="canonical" href="https://kestoralabs.com/es/migraloom/${g.slug}/"><link rel="alternate" hreflang="en" href="https://kestoralabs.com/migraloom/guides/${g.en}/"><link rel="alternate" hreflang="es" href="https://kestoralabs.com/es/migraloom/${g.slug}/"><link rel="alternate" hreflang="x-default" href="https://kestoralabs.com/migraloom/guides/${g.en}/"><meta property="og:type" content="article"><meta property="og:title" content="${g.title}"><meta property="og:description" content="${g.description}"><meta property="og:url" content="https://kestoralabs.com/es/migraloom/${g.slug}/"><meta property="og:image" content="https://kestoralabs.com/assets/screens/es/migraloom-01.webp"><link rel="icon" href="/assets/migraloom.png"><link rel="stylesheet" href="/migraloom/seo.css?v=20261105-5"><link rel="stylesheet" href="/es/migraloom/styles-es.css?v=20261107-1"><script src="/locale.js?v=20261107-3"></script><script src="/site.js?v=20261104-analytics" defer></script><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'Article',headline:g.title,datePublished:'2026-11-07',dateModified:'2026-11-07',author:{'@type':'Organization',name:'Kestora Labs'},mainEntityOfPage:`https://kestoralabs.com/es/migraloom/${g.slug}/`,inLanguage:'es'})}</script></head><body><a class="skip-link" href="#main">Ir al contenido</a><header class="site-header"><div class="shell"><a class="brand" href="/es/migraloom/"><img src="/assets/migraloom.png" alt=""><span>MigraLoom</span></a><nav><a class="portfolio-return" href="/es/">← Kestora Labs</a><a href="/es/migraloom/guias/">Todas las guías</a><a href="#fuentes">Fuentes</a><a class="nav-cta" href="${app}&ct=kestora_migraloom_es_${code}_header" data-app-name="MigraLoom" data-link-position="${code}_header">Descargar MigraLoom ↗</a></nav></div></header><main id="main"><nav class="breadcrumb shell" aria-label="Migas de pan"><ol><li><a href="/es/">Kestora Labs</a></li><li>›</li><li><a href="/es/migraloom/">MigraLoom</a></li><li>›</li><li><a href="/es/migraloom/guias/">Guías</a></li><li>›</li><li>${g.keyword}</li></ol></nav><section class="guide-hero"><div class="shell"><div><p class="eyebrow">${g.eyebrow}</p><h1>${g.hero}</h1><p class="seo-lead">${g.lead}</p><p class="byline">Publicado por Kestora Labs, creadora de MigraLoom · Actualizado el 7 de noviembre de 2026</p></div><aside class="guide-stat"><span>Tema</span><strong>${g.keyword}</strong><small>Información educativa para registrar y preparar una conversación sanitaria.</small></aside></div></section><section class="content-section"><div class="shell content-layout"><aside class="toc"><p>En esta página</p><a href="#respuesta">Respuesta breve</a><a href="#guia">Guía práctica</a><a href="#app">MigraLoom</a><a href="#fuentes">Fuentes</a></aside><article class="article"><div class="quick-answer" id="respuesta">${g.answer}</div><div id="guia">${g.sections}</div><div class="app-callout" id="app"><img src="/assets/migraloom.png" alt="Icono de MigraLoom"><div><p class="eyebrow">Un registro privado en iPhone</p><h3>Empieza con lo mínimo. Completa después.</h3><p>MigraLoom guarda el diario en tu iPhone, no exige cuenta y permite revisar únicamente los patrones de lo que registraste. Tras cinco episodios gratuitos, el registro continuado se desbloquea con una compra única, sin suscripción autorrenovable.</p><a class="button" href="${app}&ct=kestora_migraloom_es_${code}_inline" data-app-name="MigraLoom" data-link-position="${code}_inline">Ver MigraLoom ↗</a></div></div><h2 id="fuentes">Fuentes</h2>${sourceList(g.sources)}<p class="medical-note"><strong>Aviso médico:</strong> Esta guía es educativa y sirve para el registro personal. No ofrece asesoramiento, diagnóstico, tratamiento ni atención de urgencia.</p><h2>Recursos relacionados</h2><div class="related-grid">${related(g.slug)}</div></article></div></section></main><footer class="site-footer"><div class="shell"><div><strong>MigraLoom de Kestora Labs</strong><p>Registro personal y preparación de consultas. No es asesoramiento, diagnóstico, tratamiento ni atención de urgencia.</p></div><nav><a href="/es/migraloom/">MigraLoom</a><a href="/es/migraloom/guias/">Guías</a><a href="/es/migraloom/privacidad/">Privacidad</a><a href="/es/migraloom/terminos/">Condiciones</a><a href="/es/migraloom/soporte/">Soporte</a><button type="button" data-cookie-settings>Configurar cookies</button><a href="/migraloom/guides/${g.en}/" lang="en" hreflang="en" data-locale="en">English</a></nav><p class="copyright">© 2026 Kestora Labs.</p></div></footer><section class="consent-banner" data-consent-banner hidden><div><p class="consent-label">Tu privacidad, tu elección</p><h2>¿Nos ayudas a mejorar esta página?</h2><p>Analytics permanece desactivado hasta que aceptes. <a href="/es/privacidad/">Privacidad del sitio.</a></p></div><div class="consent-actions"><button class="consent-secondary" data-consent-reject>Solo esenciales</button><button class="consent-primary" data-consent-accept>Aceptar Analytics</button></div></section></body></html>`;
}

for (const g of guides) {
  const dir = path.join(base, g.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), render(g));
}

const cards = guides.map(g => `<a class="guide-card" href="/es/migraloom/${g.slug}/"><span>${g.eyebrow.split(' · ')[0]}</span><div><h2>${g.keyword}</h2><p>${g.description}</p></div><strong>Leer la guía →</strong></a>`).join('');
const hubDir = path.join(base, 'guias');
fs.mkdirSync(hubDir, { recursive: true });
fs.writeFileSync(path.join(hubDir, 'index.html'), `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Guías de migraña y diarios de cefaleas | MigraLoom</title><meta name="description" content="Guías prácticas en español para registrar migrañas y cefaleas, comprender lo anotado y preparar una consulta más clara."><meta name="robots" content="index,follow,max-image-preview:large"><meta name="theme-color" content="#f7f3ef"><link rel="canonical" href="https://kestoralabs.com/es/migraloom/guias/"><link rel="alternate" hreflang="en" href="https://kestoralabs.com/migraloom/guides/"><link rel="alternate" hreflang="es" href="https://kestoralabs.com/es/migraloom/guias/"><link rel="alternate" hreflang="x-default" href="https://kestoralabs.com/migraloom/guides/"><meta property="og:type" content="website"><meta property="og:title" content="Guías MigraLoom"><meta property="og:description" content="Recursos cuidadosos para registrar el historial de migraña y cefaleas."><meta property="og:url" content="https://kestoralabs.com/es/migraloom/guias/"><meta property="og:image" content="https://kestoralabs.com/assets/migraloom.png"><link rel="icon" href="/assets/migraloom.png"><link rel="stylesheet" href="/migraloom/seo.css?v=20261105-5"><script src="/locale.js?v=20261107-3"></script><script src="/site.js?v=20261104-analytics" defer></script></head><body><a class="skip-link" href="#main">Ir al contenido</a><header class="site-header"><div class="shell"><a class="brand" href="/es/migraloom/"><img src="/assets/migraloom.png" alt=""><span>MigraLoom</span></a><nav><a class="portfolio-return" href="/es/">← Kestora Labs</a><a href="/es/migraloom/">La app</a><a href="/es/migraloom/privacidad/">Privacidad</a><a class="nav-cta" href="${app}&ct=kestora_migraloom_es_guides_header" data-app-name="MigraLoom" data-link-position="guides_header">Descargar MigraLoom ↗</a></nav></div></header><main id="main"><nav class="breadcrumb shell"><ol><li><a href="/es/">Kestora Labs</a></li><li>›</li><li><a href="/es/migraloom/">MigraLoom</a></li><li>›</li><li>Guías</li></ol></nav><section class="hub-hero shell"><p class="eyebrow">Recursos MigraLoom</p><h1>Un historial más claro empieza con una forma más serena de registrarlo.</h1><p class="seo-lead">Guías prácticas para anotar lo ocurrido, revisar lo que realmente registraste y llevar contexto útil a una conversación sanitaria.</p></section><section class="hub-grid shell" aria-label="Guías de MigraLoom">${cards}</section></main><footer class="site-footer"><div class="shell"><div><strong>MigraLoom de Kestora Labs</strong><p>Registro personal y preparación de consultas. No es atención médica.</p></div><nav><a href="/es/migraloom/">MigraLoom</a><a href="/es/migraloom/privacidad/">Privacidad</a><a href="/es/migraloom/terminos/">Condiciones</a><a href="/es/migraloom/soporte/">Soporte</a><button type="button" data-cookie-settings>Configurar cookies</button><a href="/migraloom/guides/" lang="en" hreflang="en" data-locale="en">English</a></nav><p class="copyright">© 2026 Kestora Labs.</p></div></footer><section class="consent-banner" data-consent-banner hidden><div><p class="consent-label">Tu privacidad, tu elección</p><h2>¿Nos ayudas a mejorar esta página?</h2><p>Analytics permanece desactivado hasta que aceptes. <a href="/es/privacidad/">Privacidad del sitio.</a></p></div><div class="consent-actions"><button class="consent-secondary" data-consent-reject>Solo esenciales</button><button class="consent-primary" data-consent-accept>Aceptar Analytics</button></div></section></body></html>`);

const primaryPairs = {
  'migraine-symptom-tracker': 'sintomas-de-migrana',
  'migraine-diary-template': 'diario-de-migrana',
  'headache-calendar-app': 'calendario-de-cefaleas',
  'how-to-keep-a-headache-diary': 'diario-de-cefaleas',
  'headache-diary-template': 'diario-de-dolor-de-cabeza',
  'best-migraine-tracker-apps': 'app-para-migranas'
};
for (const [englishSlug, spanishSlug] of Object.entries(primaryPairs)) {
  const filePath = path.join(root, 'migraloom', 'guides', englishSlug, 'index.html');
  let html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('hreflang="es"')) html = html.replace(/(<link rel="canonical"[^>]+>)/, `$1<link rel="alternate" hreflang="en" href="https://kestoralabs.com/migraloom/guides/${englishSlug}/"><link rel="alternate" hreflang="es" href="https://kestoralabs.com/es/migraloom/${spanishSlug}/"><link rel="alternate" hreflang="x-default" href="https://kestoralabs.com/migraloom/guides/${englishSlug}/">`);
  if (!html.includes('/locale.js')) html = html.replace('<script src="../../../site.js?v=20261104-analytics" defer></script>', '<script src="../../../locale.js?v=20261107-3"></script><script src="../../../site.js?v=20261104-analytics" defer></script>');
  fs.writeFileSync(filePath, html);
}

const englishHub = path.join(root, 'migraloom', 'guides', 'index.html');
let hubHtml = fs.readFileSync(englishHub, 'utf8');
if (!hubHtml.includes('hreflang="es"')) hubHtml = hubHtml.replace('<link rel="canonical" href="https://kestoralabs.com/migraloom/guides/">', '<link rel="canonical" href="https://kestoralabs.com/migraloom/guides/"><link rel="alternate" hreflang="en" href="https://kestoralabs.com/migraloom/guides/"><link rel="alternate" hreflang="es" href="https://kestoralabs.com/es/migraloom/guias/"><link rel="alternate" hreflang="x-default" href="https://kestoralabs.com/migraloom/guides/">');
if (!hubHtml.includes('/locale.js')) hubHtml = hubHtml.replace('<script src="../../site.js?v=20261104-analytics" defer></script>', '<script src="../../locale.js?v=20261107-3"></script><script src="../../site.js?v=20261104-analytics" defer></script>');
fs.writeFileSync(englishHub, hubHtml);

console.log(`Generated ${guides.length} Spanish MigraLoom keyword pages and the guides hub.`);
