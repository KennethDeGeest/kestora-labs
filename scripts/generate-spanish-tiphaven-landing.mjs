import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const source = fs.readFileSync(path.join(root, 'tiphaven/index.html'), 'utf8');

const replacements = [
  ['<html lang="en">', '<html lang="es">'],
  ['<title>TipHaven — Tip Tracker for Servers & Hospitality Workers</title>', '<title>App para registrar propinas y turnos | TipHaven</title>'],
  ['Track tips, wages, hours and tip-outs, calculate what every shift was worth, and find your best-paying jobs and days with TipHaven for iPhone.', 'Registra propinas, salario, horas y reparto de propinas. Descubre cuánto valió cada turno y cuáles son tus trabajos y días mejor pagados con TipHaven para iPhone.'],
  ['<link rel="canonical" href="https://kestoralabs.com/tiphaven/">\n  <link rel="alternate" hreflang="en" href="https://kestoralabs.com/tiphaven/">\n  <link rel="alternate" hreflang="es" href="https://kestoralabs.com/es/tiphaven/">\n  <link rel="alternate" hreflang="x-default" href="https://kestoralabs.com/tiphaven/">', '<link rel="canonical" href="https://kestoralabs.com/es/tiphaven/">\n  <link rel="alternate" hreflang="en" href="https://kestoralabs.com/tiphaven/">\n  <link rel="alternate" hreflang="es" href="https://kestoralabs.com/es/tiphaven/">\n  <link rel="alternate" hreflang="x-default" href="https://kestoralabs.com/tiphaven/">'],
  ['TipHaven — Your tips. Finally clear.', 'TipHaven — Tus propinas, por fin claras.'],
  ['A private tip and shift tracker for servers, bartenders, baristas and hospitality workers.', 'Un registro privado de propinas y turnos para camareros, bartenders, baristas y profesionales de hostelería.'],
  ['<meta property="og:url" content="https://kestoralabs.com/tiphaven/">', '<meta property="og:url" content="https://kestoralabs.com/es/tiphaven/">'],
  ['TipHaven — your tips, finally clear', 'TipHaven — tus propinas, por fin claras'],
  ['../assets/', '/assets/'],
  ['href="styles.css?v=20261104-1"', 'href="/tiphaven/styles.css?v=20261104-1"'],
  ['src="../site.js?v=20261104-analytics"', 'src="/site.js?v=20261104-analytics"'],
  ['src="../locale.js?v=20261107-2"', 'src="/locale.js?v=20261107-2"'],
  ['src="shift-math.js?v=20261104-1"', 'src="/es/tiphaven/shift-math.js?v=20261107-1"'],
  ['"url":"https://kestoralabs.com/tiphaven/"', '"url":"https://kestoralabs.com/es/tiphaven/"'],
  ['"description":"A private tip, shift and earnings tracker for hospitality workers."', '"description":"Un registro privado de propinas, turnos e ingresos para profesionales de hostelería."'],
  ['Skip to content', 'Ir al contenido'],
  ['Primary navigation', 'Navegación principal'],
  ['How it works', 'Cómo funciona'],
  ['Insights', 'Estadísticas'],
  ['Tools', 'Herramientas'],
  ['Privacy', 'Privacidad'],
  ['FAQ', 'Preguntas'],
  ['Back to the Kestora Labs app portfolio', 'Volver al portfolio de apps de Kestora Labs'],
  ['Get TipHaven', 'Descargar TipHaven'],
  ['Tip & shift tracker for iPhone', 'Registro de propinas y turnos para iPhone'],
  ['Your tips.<br><em>Finally clear.</em>', 'Tus propinas.<br><em>Por fin claras.</em>'],
  ['Track tips, hours, wages and tip-outs in seconds—then see exactly what every shift was worth and where your time pays best.', 'Registra propinas, horas, salario y reparto en segundos. Después comprueba cuánto valió realmente cada turno y dónde se paga mejor tu tiempo.'],
  ['Download TipHaven on the App Store', 'Descargar TipHaven en App Store'],
  ['https://appure.io/badges/appstore/black/en.svg', 'https://appure.io/badges/appstore/black/es.svg'],
  ['Download on the App Store', 'Descárgalo en el App Store'],
  ['See how it works ↓', 'Descubre cómo funciona ↓'],
  ['Log your first five shifts free · One-time lifetime unlock · No account required', 'Registra gratis tus primeros cinco turnos · Desbloqueo de por vida con un solo pago · Sin cuenta'],
  ['TipHaven weekly earnings dashboard', 'Panel semanal de ingresos de TipHaven'],
  ['Last shift', 'Último turno'],
  ['total earnings', 'ingresos totales'],
  ['True hourly', 'Ingreso real por hora'],
  ['per hour', 'por hora'],
  ['TipHaven highlights', 'Ventajas de TipHaven'],
  ['Built for tipped work', 'Creada para trabajos con propinas'],
  ['Servers, bartenders, baristas & more', 'Camareros, bartenders, baristas y más'],
  ['Private by default', 'Privada por defecto'],
  ['Your shift records stay on your iPhone', 'Tus turnos se guardan en tu iPhone'],
  ['Pay once', 'Paga una vez'],
  ['Five shifts free, then unlock for life', 'Cinco turnos gratis y después acceso de por vida'],
  ['01 / The real question', '01 / La pregunta real'],
  ['Your paycheck does not tell the whole story', 'Tu nómina no cuenta toda la historia'],
  ['A busy shift is not always a good shift.', 'Un turno con mucho movimiento no siempre es un buen turno.'],
  ['Cash, card tips, tip-out and wages live in different places.', 'Las propinas en efectivo y tarjeta, el reparto y el salario suelen estar en lugares distintos.'],
  ['Hours alone cannot tell you which job or day pays your time best.', 'Las horas por sí solas no muestran qué trabajo o día paga mejor tu tiempo.'],
  ['TipHaven turns every completed shift into one number you can compare.', 'TipHaven convierte cada turno terminado en una cifra que puedes comparar.'],
  ['02 / How it works', '02 / Cómo funciona'],
  ['One quick entry. A much clearer picture.', 'Un registro rápido. Una visión mucho más clara.'],
  ['Record only what matters to you. TipHaven handles the shift maths and keeps the history useful.', 'Registra solo lo que te importa. TipHaven hace los cálculos del turno y mantiene un historial útil.'],
  ['Log the shift', 'Registra el turno'],
  ['Add cash and card tips, hours, wages and tip-out. Optional fields cover sales, covers, roles, sections and notes.', 'Añade propinas en efectivo y tarjeta, horas, salario y reparto. También puedes guardar ventas, comensales, puestos, secciones y notas.'],
  ['See the real total', 'Consulta el total real'],
  ['TipHaven calculates net tips, wage earnings, total earnings and what the shift paid per hour.', 'TipHaven calcula las propinas netas, el salario, los ingresos totales y cuánto pagó el turno por hora.'],
  ['Find the pattern', 'Encuentra el patrón'],
  ['Compare jobs, roles, weekdays and periods to see where your time has paid best.', 'Compara trabajos, puestos, días y periodos para saber dónde se ha pagado mejor tu tiempo.'],
  ['Try the shift maths', 'Prueba la calculadora del turno'],
  ['What was that shift actually worth?', '¿Cuánto valió realmente ese turno?'],
  ['Use sample numbers or enter your own. The calculation happens only in this browser and is not saved.', 'Usa los datos de ejemplo o introduce los tuyos. El cálculo se realiza en este navegador y no se guarda.'],
  ['cash + card − tip-out + wages = total earnings', 'efectivo + tarjeta − reparto + salario = ingresos totales'],
  ['Cash tips', 'Propinas en efectivo'],
  ['Card tips', 'Propinas con tarjeta'],
  ['Tip-out', 'Reparto de propinas'],
  ['Hourly wage', 'Salario por hora'],
  ['Hours worked', 'Horas trabajadas'],
  ['Calculate this shift', 'Calcular este turno'],
  ['Total earnings', 'Ingresos totales'],
  ['TipHaven features', 'Funciones de TipHaven'],
  ['Every detail, one result', 'Todos los detalles, un resultado'],
  ['Know what you actually made.', 'Descubre cuánto ganaste realmente.'],
  ['See the full path from cash and card tips through tip-out and wages to total earnings. No mental maths at the end of a long night.', 'Reúne las propinas en efectivo y tarjeta, el reparto y el salario en un total claro. Sin hacer cálculos mentales al final de una noche larga.'],
  ['Work patterns', 'Patrones de trabajo'],
  ['Find your best-paying shifts.', 'Encuentra tus turnos mejor pagados.'],
  ['Compare earnings per hour across jobs, weekdays and periods. See whether the busiest room is actually the best use of your time.', 'Compara los ingresos por hora entre trabajos, días y periodos. Comprueba si el local más ocupado realmente aprovecha mejor tu tiempo.'],
  ['Goals & history', 'Objetivos e historial'],
  ['Watch the work add up.', 'Mira cómo se acumula tu trabajo.'],
  ['Follow a monthly earnings goal, review your latest shift and search your complete ledger by date, job, role, section or notes.', 'Sigue un objetivo mensual, revisa tu último turno y busca en todo el historial por fecha, trabajo, puesto, sección o notas.'],
  ['03 / Private by design', '03 / Privada desde el diseño'],
  ['Your earnings are your business.', 'Tus ingresos son asunto tuyo.'],
  ['There is no TipHaven account. The shift details you enter stay on your iPhone unless you choose to export or back them up.', 'TipHaven no necesita una cuenta. Los datos de tus turnos permanecen en tu iPhone, salvo que decidas exportarlos o crear una copia de seguridad.'],
  ['No employer or bank connection', 'Sin conexión con tu empresa o banco'],
  ['TipHaven is your independent personal record.', 'TipHaven es tu registro personal e independiente.'],
  ['No cross-app tracking', 'Sin seguimiento entre apps'],
  ['Your financial entries are not used to follow you across other companies’ apps or websites.', 'Tus datos financieros no se utilizan para seguirte en apps o sitios web de otras empresas.'],
  ['Your files, your choice', 'Tus archivos, tu elección'],
  ['You decide when and where an export or backup is created.', 'Tú decides cuándo y dónde crear una exportación o copia de seguridad.'],
  ['Simple access', 'Acceso sencillo'],
  ['Start free. Unlock for life.', 'Empieza gratis. Desbloquéala para siempre.'],
  ['Log five shifts across all your jobs and use every feature. When you want to add more, one lifetime purchase unlocks unlimited shift logging. There is no subscription in the current offer.', 'Registra cinco turnos de cualquiera de tus trabajos y utiliza todas las funciones. Cuando quieras añadir más, una compra única desbloquea el registro ilimitado. La oferta actual no incluye suscripción.'],
  ['See TipHaven on the App Store ↗', 'Ver TipHaven en App Store ↗'],
  ['shifts free', 'turnos gratis'],
  ['then unlock unlimited', 'después, registros ilimitados'],
  ['Free tools', 'Herramientas gratuitas'],
  ['Useful before the shift is forgotten.', 'Útiles antes de que olvides el turno.'],
  ['Quick calculations and practical guides for understanding tipped work.', 'Cálculos rápidos y guías prácticas para entender los trabajos con propinas.'],
  ['Calculators', 'Calculadoras'],
  ['Practical guides', 'Guías prácticas'],
  ['Open calculator →', 'Abrir calculadora →'],
  ['Read →', 'Leer →'],
  ['04 / Questions', '04 / Preguntas'],
  ['Before your next shift.', 'Antes de tu próximo turno.'],
  ['Who is TipHaven for?', '¿Para quién está pensada TipHaven?'],
  ['What can I track?', '¿Qué puedo registrar?'],
  ['Does TipHaven connect to my employer or bank?', '¿TipHaven se conecta con mi empresa o banco?'],
  ['Where is my shift data stored?', '¿Dónde se guardan mis turnos?'],
  ['Can I use a different currency?', '¿Puedo usar otra moneda?'],
  ['How much does TipHaven cost?', '¿Cuánto cuesta TipHaven?'],
  ['How do I get help?', '¿Cómo obtengo ayuda?'],
  ['Every shift tells you something.', 'Cada turno te enseña algo.'],
  ['Start keeping the full picture.', 'Empieza a guardar la imagen completa.'],
  ['Thoughtful apps for everyday life.', 'Apps cuidadas para la vida cotidiana.'],
  ['Footer navigation', 'Navegación del pie de página'],
  ['Support', 'Soporte'],
  ['App privacy', 'Privacidad de la app'],
  ['Terms', 'Condiciones'],
  ['Website privacy', 'Privacidad del sitio'],
  ['Cookie settings', 'Configurar cookies'],
  ['Back to top ↑', 'Volver arriba ↑'],
  ['Your privacy, your choice', 'Tu privacidad, tu elección'],
  ['Help us make the page better?', '¿Nos ayudas a mejorar esta página?'],
  ['With your permission, Kestora Labs uses Google Analytics to understand which pages and App Store links are useful. Analytics stays off unless you accept.', 'Con tu permiso, Kestora Labs utiliza Google Analytics para saber qué páginas y enlaces de App Store resultan útiles. Analytics permanece desactivado hasta que aceptes.'],
  ['Read our privacy policy', 'Lee nuestra política de privacidad'],
  ['Essential only', 'Solo esenciales'],
  ['Accept analytics', 'Aceptar Analytics']
];

let html = source;
for (const [from, to] of replacements) html = html.replaceAll(from, to);

const cleanup = [
  ['TipHaven calculates net tips, wage earnings, ingresos totales and what the shift paid por hora.', 'TipHaven calcula las propinas netas, el salario, los ingresos totales y lo que pagó el turno por hora.'],
  ['See the full path from cash and card tips through tip-out and wages to ingresos totales. No mental maths at the end of a long night.', 'Reúne las propinas en efectivo y tarjeta, el reparto y el salario en un total claro. Sin cálculos mentales al final de una noche larga.'],
  ['Compare earnings por hora across jobs, weekdays and periods. See whether the busiest room is actually the best use of your time.', 'Compara los ingresos por hora entre trabajos, días de la semana y periodos. Comprueba si el local más ocupado realmente aprovecha mejor tu tiempo.'],
  ['Calculate the shift you actually kept.', 'Calcula lo que realmente te quedó del turno.'],
  ['Tips or sales basis, wages and true hourly earnings.', 'Base de propinas o ventas, salario e ingreso real por hora.'],
  ['Tip pooling', 'Bote de propinas'],
  ['Split a pool by hours worked.', 'Reparte un bote según las horas trabajadas.'],
  ['Add the team and distribute every cent proportionally.', 'Añade al equipo y distribuye cada céntimo de forma proporcional.'],
  ['Tip sharing', 'Reparto por puestos'],
  ['Divide tips across roles.', 'Divide las propinas entre puestos.'],
  ['Assign role percentages and see each person’s share.', 'Asigna porcentajes por puesto y consulta la parte de cada persona.'],
  ['Paycheck estimate', 'Estimación de nómina'],
  ['Combine wages, overtime and tips.', 'Combina salario, horas extra y propinas.'],
  ['Estimate gross earnings and optional withholding.', 'Estima los ingresos brutos y una retención opcional.'],
  ['Earnings', 'Ingresos'], ['Records', 'Registros'], ['Buyer’s guide', 'Guía de compra'],
  ['How much do servers make in tips?', '¿Cuánto gana un camarero en propinas?'],
  ['Server tips and taxes', 'Propinas e impuestos para camareros'],
  ['Average bartender salary with tips', 'Sueldo medio de bartender con propinas'],
  ['What is a normal server tip-out percentage?', '¿Qué porcentaje de reparto de propinas es normal?'],
  ['Splitting tips by hours worked', 'Repartir propinas por horas trabajadas'],
  ['How to choose a tip tracking app', 'Cómo elegir una app para registrar propinas'],
  ['TipHaven is built for servers, bartenders, baristas, waiters, hospitality professionals and anyone whose earnings change from shift to shift.', 'TipHaven está pensada para camareros, bartenders, baristas, profesionales de hostelería y cualquier persona cuyos ingresos cambien de un turno a otro.'],
  ['Track cash tips, card tips, tip-out, hourly wage, hours, jobs and optional sales, covers, roles, sections and notes. You choose which optional fields appear.', 'Registra propinas en efectivo y tarjeta, reparto, salario por hora, horas y trabajos. También puedes añadir ventas, comensales, puestos, secciones y notas. Tú eliges qué campos opcionales aparecen.'],
  ['No. You enter the details you want to keep. TipHaven is a personal record—not payroll, tax, accounting, legal or financial advice.', 'No. Tú introduces los datos que quieres guardar. TipHaven es un registro personal, no una herramienta de nóminas ni asesoramiento fiscal, contable, jurídico o financiero.'],
  ['Tus turnos se guardan en tu iPhone. Kestora Labs cannot remotely view or recover them. You control exports, backups, edits and deletion.', 'Tus turnos se guardan en tu iPhone. Kestora Labs no puede verlos ni recuperarlos a distancia. Tú controlas las exportaciones, copias de seguridad, cambios y eliminación.'],
  ['Yes. Choose one supported currency for the ledger. Changing it relabels existing values and does not perform currency conversion.', 'Sí. Elige una de las monedas compatibles para el historial. Cambiarla modifica la etiqueta de los importes existentes, pero no realiza una conversión de divisas.'],
  ['Your first five shifts are free. After that, a one-time lifetime purchase unlocks unlimited logging. The App Store shows your local price before purchase.', 'Los primeros cinco turnos son gratuitos. Después, una compra única de por vida desbloquea registros ilimitados. App Store muestra el precio local antes de comprar.'],
  ['Visit <a href="support.html">TipHaven Soporte</a> or email <a href="mailto:degeestkenneth@gmail.com?subject=TipHaven%20Soporte">degeestkenneth@gmail.com</a>. Please do not include earnings, workplace details or backup files in a support message.', 'Visita el <a href="/tiphaven/support.html">soporte de TipHaven</a> o escribe a <a href="mailto:degeestkenneth@gmail.com?subject=Soporte%20TipHaven">degeestkenneth@gmail.com</a>. No incluyas ingresos, datos del lugar de trabajo ni copias de seguridad en el mensaje.'],
  ['TipHaven is a personal record and insight tool, not payroll, tax, accounting, legal or financial advice. Apple and the Apple logo are trademarks of Apple Inc.', 'TipHaven es una herramienta personal de registro y análisis, no una solución de nóminas ni asesoramiento fiscal, contable, jurídico o financiero. Apple y el logotipo de Apple son marcas comerciales de Apple Inc.'],
  ['cash + card − tip-out + wages = ingresos totales', 'efectivo + tarjeta − reparto + salario = ingresos totales'],
  ['Visit <a href="/tiphaven/support.html">TipHaven Soporte</a> or email <a href="mailto:degeestkenneth@gmail.com?subject=TipHaven%20Soporte">degeestkenneth@gmail.com</a>. Please do not include earnings, workplace details or backup files in a support message.', 'Visita el <a href="/tiphaven/support.html">soporte de TipHaven</a> o escribe a <a href="mailto:degeestkenneth@gmail.com?subject=Soporte%20TipHaven">degeestkenneth@gmail.com</a>. No incluyas ingresos, datos del lugar de trabajo ni copias de seguridad en el mensaje.'],
  ['TipHaven app icon', 'Icono de TipHaven'],
  ['TipHaven Today screen showing weekly tips, hourly earnings and hours worked', 'Panel semanal de TipHaven con propinas, ingresos por hora y horas trabajadas'],
  ['TipHaven shift entry showing cash tips, card tips, tip-out, hourly wage and shift time', 'Detalle de un turno de TipHaven con propinas en efectivo y tarjeta, reparto, salario e ingresos totales'],
  ['TipHaven Estadísticas comparing earnings por hora across jobs and days', 'Estadísticas de TipHaven comparando ingresos por hora entre trabajos y días'],
  ['TipHaven dashboard with weekly earnings and monthly goal progress', 'Panel de TipHaven con ingresos semanales y progreso del objetivo mensual']
];
for (const [from, to] of cleanup) html = html.replaceAll(from, to);

html = html
  .replaceAll('/assets/screens/tiphaven-today.png', '/assets/screens/tiphaven-es-today.png?v=20261107-2')
  .replaceAll('/assets/screens/tiphaven-shift.png', '/assets/screens/tiphaven-es-shift.png?v=20261107-2')
  .replaceAll('/assets/screens/tiphaven-insights.png', '/assets/screens/tiphaven-es-insights.png?v=20261107-2')
  .replaceAll('width="1206" height="2622"', 'width="414" height="900"')
  .replaceAll('<strong>$300</strong>', '<strong>300 €</strong>')
  .replaceAll('<strong>$50</strong>', '<strong>50 €</strong>')
  .replaceAll('<b>$</b>', '<b>€</b>')
  .replaceAll('<strong>$300.00</strong>', '<strong>300,00 €</strong>')
  .replaceAll('<small>$50.00 por hora</small>', '<small>50,00 € por hora</small>')
  .replaceAll('ct=kestora_tiphaven_home_header&amp;mt=8', 'ct=kestora_tiphaven_es_home_header&amp;mt=8')
  .replaceAll('ct=kestora_tiphaven_home_hero&amp;mt=8', 'ct=kestora_tiphaven_es_home_hero&amp;mt=8')
  .replaceAll('ct=kestora_tiphaven_home_pricing&amp;mt=8', 'ct=kestora_tiphaven_es_home_pricing&amp;mt=8')
  .replaceAll('ct=kestora_tiphaven_home_final&amp;mt=8', 'ct=kestora_tiphaven_es_home_final&amp;mt=8')
  .replaceAll('ct=kestora_tiphaven_home&amp;mt=8', 'ct=kestora_tiphaven_es_home&amp;mt=8')
  .replace('data-link-position="header"', 'data-link-position="header_es"')
  .replace('data-link-position="hero"', 'data-link-position="hero_es"')
  .replace('data-link-position="pricing"', 'data-link-position="pricing_es"')
  .replace('data-link-position="final_cta"', 'data-link-position="final_cta_es"')
  .replace('<a href="/es/tiphaven/" lang="es" hreflang="es" data-locale="es">Español</a>', '')
  .replace('<a href="#main">Volver arriba ↑</a>', '<a href="/tiphaven/" lang="en" hreflang="en" data-locale="en">English</a><a href="#main">Volver arriba ↑</a>')
  .replaceAll('href="../"', 'href="/es/"')
  .replaceAll('href="support.html"', 'href="/tiphaven/support.html"')
  .replaceAll('href="privacy.html"', 'href="/tiphaven/privacy.html"')
  .replaceAll('href="terms.html"', 'href="/tiphaven/terms.html"')
  .replaceAll('href="../privacy.html"', 'href="/es/privacidad/"');

const localizedPages = {
  'tip-out-calculator': 'calculadora-reparto-propinas',
  'tip-pool-calculator': 'calculadora-bote-propinas',
  'tip-split-calculator': 'calculadora-dividir-propinas',
  'paycheck-calculator-with-tips': 'calculadora-nomina-con-propinas',
  'how-much-do-servers-make-in-tips': 'cuanto-gana-camarero-propinas',
  'server-tips-and-taxes': 'propinas-impuestos-camareros',
  'average-bartender-salary-with-tips': 'sueldo-bartender-con-propinas',
  'server-tip-out-percentage': 'porcentaje-reparto-propinas-camareros',
  'splitting-tips-by-hours-worked': 'repartir-propinas-horas-trabajadas',
  'best-tip-tracking-apps-for-servers': 'mejores-apps-registrar-propinas'
};
for (const [english, spanish] of Object.entries(localizedPages)) html = html.replaceAll(`href="${english}/"`, `href="/es/tiphaven/${spanish}/"`);
html = html
  .replaceAll('href="/tiphaven/support.html"', 'href="/es/tiphaven/soporte/"')
  .replaceAll('href="/tiphaven/privacy.html"', 'href="/es/tiphaven/privacidad/"')
  .replaceAll('href="/tiphaven/terms.html"', 'href="/es/tiphaven/terminos/"');

const target = path.join(root, 'es/tiphaven/index.html');
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, html);

fs.writeFileSync(path.join(root, 'es/tiphaven/shift-math.js'), `const form=document.querySelector('#shift-math-form');const result=document.querySelector('#shift-math-result');const money=value=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(value);form?.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);const value=name=>Math.max(0,Number(data.get(name))||0);const total=Math.max(0,value('cash')+value('card')-value('tipout')+value('wage')*value('hours'));const hourly=value('hours')>0?total/value('hours'):0;result.innerHTML=\`<span>Ingresos totales</span><strong>\${money(total)}</strong><small>\${money(hourly)} por hora</small>\`;result.focus()});`);

console.log('Generated Spanish TipHaven landing page.');
