(function () {
  document.documentElement.classList.add("js");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Áreas del último mes ---------- */
  const areas = [
    { t: "Finanzas y facturación", n: 16, items: [
      "Facturas desde la plataforma como borrador en GoHighLevel, con numeración propia.",
      "Importe en AED junto a EUR o USD, y nota de IVA en la factura.",
      "Factura del total al firmar, dividida en partes si hace falta; pagos sueltos y mixtos.",
      "Gastos con aviso de repetido, aviso de cuota próxima a vencer y renovaciones."] },
    { t: "Instagram, YouTube y competidores", n: 14, items: [
      "Sincronización de Instagram sin huecos y repartida entre las cuentas.",
      "Reintentos automáticos cuando Meta falla; ninguna cuenta queda bloqueada.",
      "KPIs mensuales que se rellenan solos con los datos de Instagram.",
      "Conversaciones ocultas recuperables y mensajes claros cuando falla un servicio."] },
    { t: "Equipo: tareas, Slack, formación y ventas", n: 14, items: [
      "Formación por rol (setter, SDR, closer, CSM) con progreso y feedback de la IA.",
      "Revisión semanal en la lista de clientes, con fechas de inicio y fin a la vista.",
      "Tareas con aviso en Slack y encuestas de seguimiento automáticas.",
      "Hotlist editable, con pestañas por origen y estrellas."] },
    { t: "Inteligencia artificial", n: 12, items: [
      "Revisión de documentos con IA, con los criterios del equipo y nota del 1 al 10.",
      "Informe mensual de los errores más repetidos de cada cliente.",
      "Conversaciones pegadas a mano que se guardan con su análisis.",
      "El Cerebro separa lo que ve el cliente de lo que ve el equipo."] },
    { t: "Plan de negocio y Plan de acción", n: 9, items: [
      "El Plan de negocio se genera con tres sesiones transcritas.",
      "Versión 2 con gráficos, subperfiles, lead magnets y hoja de ruta.",
      "La IA se activa para los clientes nuevos cuando su plan está listo."] },
    { t: "Onboarding y contratos", n: 6, items: [
      "El contrato firmado se abre desde la plataforma y avisa en Slack.",
      "Nuevo email de invitación al portal y control de duplicados."] },
    { t: "Seguridad y estabilidad", n: 6, items: [
      "Parches de seguridad, editor de documentos actualizado y captura de errores en producción."] }
  ];
  const areasEl = document.querySelector(".areas");
  if (areasEl) {
    areasEl.innerHTML = areas.map(a => `
      <div class="area reveal">
        <div class="area-head"><h3>${a.t}</h3><span>${a.n} cambios</span></div>
        <div class="track" style="--p:${(a.n / 16 * 100).toFixed(1)}%"><i></i></div>
        <ul>${a.items.map(i => `<li>${i}</li>`).join("")}</ul>
      </div>`).join("");
  }

  /* ---------- Recorrido por la plataforma ---------- */
  const k = (label, value) => `<div class="scr-kpi"><small>${label}</small><strong>${value}</strong></div>`;
  const row = (text, chip, tone) => `<div class="scr-row"><span>${text}</span><span class="chip ${tone || ""}">${chip}</span></div>`;
  const hero = (title, sub) => `<div class="scr-hero"><span class="scr-icon"></span><div><b>${title}</b><small>${sub}</small></div></div>`;
  const bars = hs => `<div class="scr-bars">${hs.map(h => `<i style="--h:${h}%"></i>`).join("")}</div>`;

  const tours = [
    { id: "panel", img: "capturas/panel-clientes.webp", w: 1568, h: 772, alt: "Lista de clientes del panel del negocio", tab: "Panel del negocio", url: "influenup.app/panel/clientes",
      title: "Panel del negocio",
      desc: "La ficha de cada cliente con todo lo que el equipo necesita: fechas, pagos, salud del cliente y su avance en el programa.",
      points: ["Semáforo de salud y alertas de clientes en riesgo", "Fechas de inicio, fin y renovación editables", "Revisión semanal y CSM asignado"],
      screen: hero("Clientes", "Quién necesita atención esta semana") +
        `<div class="scr-kpis">${k("Activos", "68")}${k("En riesgo", "5")}${k("Terminan este mes", "7")}</div>` +
        `<div class="scr-list">${row("Cliente ejemplo · Programa Advance", "Al día")}${row("Cliente ejemplo · Programa Core", "Revisar", "warn")}${row("Cliente ejemplo · Renovación", "Renovó", "info")}${row("Cliente ejemplo · Programa Core", "Al día")}</div>` },
    { id: "portal", img: "capturas/portal.webp", w: 1568, h: 772, alt: "Inicio del portal del cliente", tab: "Portal del cliente", url: "influenup.app/portal",
      title: "Portal del cliente",
      desc: "Donde tus clientes trabajan su negocio: documentos, plan de acción, métricas y su progreso en el programa.",
      points: ["Avatar, Oferta y Pilares con revisión de la IA", "Plan de acción por sesiones con casillas", "Descarga de documentos en Word"],
      screen: hero("Tu recorrido", "5 de 7 documentos completos") +
        `<div class="scr-list">${row("Tu Avatar Definitivo", "Aprobado")}${row("Tu Oferta Definitiva", "Nota 8/10")}${row("Pilares de contenido", "En revisión", "warn")}${row("Plan de negocio", "Listo", "info")}</div>` +
        `<div class="scr-kpis">${k("Hitos", "18/24")}${k("Sesiones", "3")}${k("Días en el programa", "41")}</div>` },
    { id: "ig", img: "capturas/conversaciones.webp", alt: "Empleado de Conversaciones con los DMs de un cliente", tab: "Instagram y ventas", url: "influenup.app/portal/redes/instagram/conversaciones",
      title: "Instagram y ventas",
      desc: "Las conversaciones de Instagram de cada cliente, sincronizadas y analizadas con IA para saber a quién responder y qué decirle.",
      points: ["Sincronización automática cada hora", "Resumen de las conversaciones con prioridad", "Análisis con el método de Javier y acción sugerida"],
      screen: hero("Conversaciones", "12 leads respondieron esta semana") +
        `<div class="scr-list">${row("Lead ejemplo · pidió precio", "Prioridad alta", "warn")}${row("Lead ejemplo · agendó llamada", "Seguir")}${row("Lead ejemplo · sin respuesta 3 días", "Recontactar", "info")}</div>` +
        `<div class="scr-chat"><div class="bubble ai">Situación: el lead pidió precio sin contexto. Acción sugerida: preguntar por su objetivo antes de hablar de inversión.</div></div>` },
    { id: "ia", img: "capturas/javier-ia.webp", w: 1568, h: 772, alt: "Conversación con Javier IA", tab: "Javier IA", url: "influenup.app/portal/influenup-ia",
      title: "Javier IA",
      desc: "Un asistente entrenado con tu método que responde a tus clientes las 24 horas, con sus propios documentos como contexto.",
      points: ["Responde con tu criterio y tus casos de referencia", "Lee el Plan de negocio y los documentos del cliente", "Topes diarios para controlar el coste"],
      screen: hero("Javier IA", "Disponible las 24 horas") +
        `<div class="scr-chat"><div class="bubble me">¿Cómo estructuro mi oferta si vendo mentorías de 3 meses?</div><div class="bubble ai">Empieza por el resultado concreto que promete tu avatar en 90 días. Con lo que tienes en tu Oferta Definitiva, te propongo tres bloques…</div><div class="bubble me">Y el precio, ¿lo pongo en la llamada o antes?</div></div>` },
    { id: "contenido", img: "capturas/copy.webp", w: 1568, h: 772, alt: "Empleado de Copy", tab: "Contenido y copy", url: "influenup.app/portal/copy",
      title: "Contenido y copy",
      desc: "Las herramientas para crear contenido: guiones, copies de anuncios y landings, transcripciones y análisis de competidores.",
      points: ["Empleado de Copy por canal y nivel de consciencia", "Guiones de contenido con plantillas del equipo", "Competidores con sus mejores piezas transcritas"],
      screen: hero("Empleado de Copy", "3 variantes listas para usar") +
        `<div class="scr-kpis">${k("Guiones", "33")}${k("Copies", "31")}${k("Transcripciones", "60")}</div>` +
        `<div class="scr-list">${row("Anuncio · problema consciente", "Variante A")}${row("Landing · VSL", "Variante B", "info")}${row("Email 2 de 5 · secuencia", "Guardado")}</div>` },
    { id: "kpis", img: "capturas/kpis.webp", alt: "KPIs del año de un cliente", tab: "KPIs", url: "influenup.app/panel/cliente/metricas",
      title: "KPIs del cliente",
      desc: "Los números de cada cliente con la forma de la planilla del equipo: el año entero, el detalle de un mes y los anuncios semana a semana.",
      points: ["Año completo con los % objetivo en verde o rojo", "Mes con variación, evolución de 6 meses y embudo", "KPIs de Ads que completa el propio cliente"],
      screen: hero("KPIs · Julio", "Comparado con junio") +
        `<div class="scr-kpis">${k("Inversión Ads", "525 €")}${k("Seguidores", "+462")}${k("ROAS", "2,21")}</div>` +
        bars([28, 34, 30, 44, 41, 70]) +
        `<div class="scr-list">${row("Ofertas aceptadas", "+100%")}${row("Videollamadas realizadas", "+50%", "info")}${row("Conversaciones", "-16%", "warn")}</div>` },
    { id: "calendario", img: "capturas/contenido.webp", alt: "Calendario de contenido de una cuenta", tab: "Calendario de contenido", url: "influenup.app/panel/contenido",
      title: "Calendario de contenido",
      desc: "El plan de contenido de las cuentas de Influenup: qué se publica, dónde y cuándo, con lo ya publicado y sus números al lado.",
      points: ["Vista mensual y semanal por cuenta", "Idea, formato, estado, gancho, copy y CTA en cada pieza", "Instagram conectado: lo publicado con me gusta y comentarios"],
      screen: hero("Cuenta de Influenup", "Noviembre · 12 piezas planificadas") +
        `<div class="scr-list">${row("Reel · 3 errores al vender por DM", "Grabado", "info")}${row("Carrusel · caso de cliente", "Idea")}${row("Reel · publicado el lunes", "1.240 me gusta")}${row("Historia · CTA a DM", "Programado", "info")}</div>` },
    { id: "finanzas", img: "capturas/pagos.webp", alt: "Pagos y cuotas con número de factura", tab: "Finanzas", url: "influenup.app/panel/pagos",
      title: "Finanzas y facturación",
      desc: "Cuotas, pagos, gastos y facturas en un solo sitio, conectados con GoHighLevel y con avisos antes de cada vencimiento.",
      points: ["Facturas como borrador en GoHighLevel, numeración propia", "Cuotas pendientes, pagadas y vencidas sin cálculos a mano", "Aviso en Slack antes de cada vencimiento"],
      screen: hero("Cobros del mes", "Lo que entra y lo que falta") +
        bars([42, 58, 50, 72, 64, 86, 78]) +
        `<div class="scr-list">${row("Cuota 2 de 3 · Cliente ejemplo", "Vence en 3 días", "warn")}${row("Factura S-0xx-2026", "Borrador en GHL", "info")}${row("Cuota 1 de 2 · Cliente ejemplo", "Pagada")}</div>` },
    { id: "ficha", img: "capturas/ficha-cliente.webp", alt: "Ficha de un cliente con su diagnóstico y acompañamiento", tab: "Ficha del cliente", url: "influenup.app/panel/cliente",
      title: "Ficha del cliente",
      desc: "Todo lo de un cliente en una pantalla: documentos, contenido, acompañamiento, Influenup IA y sus ventas por Instagram y llamadas.",
      points: ["Onboarding y documentos con su avance", "Plan de acción, implementación y Plan de negocio", "Conversaciones y llamadas analizadas por la IA"] },
    { id: "onboarding", img: "capturas/onboarding.webp", alt: "Onboarding automático paso a paso", tab: "Onboarding", url: "influenup.app/panel/onboarding",
      title: "Onboarding automático",
      desc: "Del contrato firmado a los accesos entregados sin que nadie tenga que perseguirlo: el equipo solo interviene cuando algo falla o toca aprobar.",
      points: ["Contrato y firma con GoHighLevel", "Ficha, cuotas, invitación y Skool en orden", "Aviso cuando un paso se traba"] },
    { id: "revision", img: "capturas/revision-ia.webp", alt: "Revisión con IA de un documento del cliente", tab: "Revisión de documentos", url: "influenup.app/panel/documentos-revision",
      title: "Revisión de documentos con IA",
      desc: "La IA revisa Avatar, Oferta y Pilares con tu criterio y le deja al equipo un resumen de tres líneas antes de que el cliente vea nada.",
      points: ["Sugerencia clara: aprobar o pedir cambios", "El equipo edita y envía cuando está bien", "Historial de cada revisión"] },
    { id: "llamadas", img: "capturas/llamadas.webp", alt: "Análisis de una llamada de venta por etapas", tab: "Feedback de llamadas", url: "influenup.app/panel/cliente/llamadas",
      title: "Feedback de llamadas",
      desc: "Cada llamada de venta del cliente se compara con el guion de Influenup, etapa por etapa, con los errores marcados.",
      points: ["Etapas bien, mal o salteadas", "Etiquetas como precio sin valor o cierre ausente", "Transcripción automática"] },
    { id: "informe", img: "capturas/informe-mensual.webp", alt: "Informe mensual por cliente", tab: "Informe mensual", url: "influenup.app/panel/informe-mensual",
      title: "Informe mensual",
      desc: "Dónde está fallando cada cliente según sus conversaciones y llamadas del mes, para saber qué ajustar con él.",
      points: ["Un informe por cliente y por mes", "Filtro por CSM", "Aviso de quién no tiene nada analizado"] },
    { id: "formacion", img: "capturas/formacion.webp", alt: "Plan de formación del Setter con puntos", tab: "Formación", url: "influenup.app/formacion",
      title: "Formación del equipo",
      desc: "El plan de cada rol con puntos y plazos, el avance de cada persona y feedback de la IA con el criterio de Javier.",
      points: ["Planes de Setter, SDR, Closer y CSM", "Puntos y pasos vencidos por persona", "Feedback con IA a conversaciones reales"] },
    { id: "mentor", img: "capturas/mentor.webp", alt: "Mentor Influenup respondiendo una consulta", tab: "Mentor", url: "influenup.app/mentor",
      title: "Mentor Influenup",
      desc: "El equipo le pregunta por un cliente concreto y responde como respondería Javier, con la metodología cargada.",
      points: ["Criterio de Javier en cada respuesta", "Conversaciones guardadas", "Cerebro editable por el equipo"] },
    { id: "ventas", img: "capturas/leads.webp", alt: "Leads de Influenup por fuente y rating", tab: "Leads", url: "influenup.app/panel/leads",
      title: "Leads y adquisición",
      desc: "Los prospectos de Influenup separados de los clientes, con fuente, nicho y rating, más el embudo de adquisición por canal.",
      points: ["Leads por Instagram DM y Masterclass", "Carga diaria de setters", "Embudo por canal con revenue y CAC"] },
    { id: "dinero", img: "capturas/ejecutivo.webp", alt: "Panel ejecutivo con cash del mes", tab: "Resumen del negocio", url: "influenup.app/panel/ejecutivo",
      title: "Resumen del negocio",
      desc: "Cuánto entró este mes, cuánto falta cobrar, cuotas vencidas y por vencer, en una sola vista.",
      points: ["Cash cobrado y su evolución", "Cuotas vencidas y por vencer en 7 días", "Gastos del mes"] },
    { id: "equipo", img: "capturas/tareas.webp", w: 1568, h: 772, alt: "Tablero de tareas del equipo", tab: "Equipo", url: "influenup.app/panel/tareas",
      title: "Equipo y operación",
      desc: "Lo que el equipo usa a diario para coordinarse: tareas, agenda, formación por rol y el centro operativo.",
      points: ["Tablero de tareas con aviso en Slack", "Formación por rol con feedback de la IA", "Centro operativo con los procesos del equipo"],
      screen: hero("Tareas", "Tablero del equipo") +
        `<div class="scr-list">${row("Revisar Plan de negocio · Cliente ejemplo", "Tomás", "info")}${row("Emitir facturas de noviembre", "Laura")}${row("Llamada de onboarding", "Tomás", "info")}${row("Grabar módulo de formación", "JR", "warn")}</div>` }
  ];

  const tabsEl = document.querySelector(".tour-tabs");
  const screenEl = document.getElementById("tour-screen");
  if (tabsEl && screenEl) {
    tabsEl.innerHTML = tours.map((t, i) =>
      `<button class="tour-tab" role="tab" id="tab-${t.id}" aria-selected="${i === 0}" data-i="${i}">${t.tab}</button>`).join("");
    const show = i => {
      const t = tours[i];
      document.getElementById("tour-title").textContent = t.title;
      document.getElementById("tour-desc").textContent = t.desc;
      document.getElementById("tour-points").innerHTML = t.points.map(p => `<li>${p}</li>`).join("");
      document.getElementById("tour-url").textContent = t.url;
      screenEl.classList.toggle("has-img", !!t.img);
      screenEl.innerHTML = t.img
        ? `<img src="${t.img}" alt="${t.alt}" width="${t.w || 1440}" height="${t.h || 644}" loading="lazy">`
        : t.screen;
      const cap = document.getElementById("tour-caption");
      if (cap) cap.textContent = t.img
        ? "Captura real de la plataforma. Nombres y notas de clientes difuminados."
        : "Pantalla de referencia con datos de ejemplo.";
      screenEl.classList.remove("swap"); void screenEl.offsetWidth; screenEl.classList.add("swap");
      tabsEl.querySelectorAll(".tour-tab").forEach((b, j) => b.setAttribute("aria-selected", String(j === i)));
    };
    let current = 0, timer = null, userPicked = false;
    tabsEl.addEventListener("click", e => {
      const b = e.target.closest(".tour-tab"); if (!b) return;
      userPicked = true; clearInterval(timer);
      current = Number(b.dataset.i); show(current);
    });
    show(0);
    const tour = document.querySelector(".tour");
    if (!reduce && "IntersectionObserver" in window) {
      new IntersectionObserver(([en]) => {
        clearInterval(timer);
        if (en.isIntersecting && !userPicked) {
          timer = setInterval(() => { current = (current + 1) % tours.length; show(current); }, 5000);
        }
      }, { threshold: .4 }).observe(tour);
    }
  }

  /* ---------- Contadores ---------- */
  const fmt = n => n.toLocaleString("es-ES");
  const countUp = el => {
    const target = Number(el.dataset.count);
    if (reduce || !target) { el.textContent = fmt(target); return; }
    const dur = 1400, start = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * e));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---------- Aparición al hacer scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(el => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add("in");
      el.querySelectorAll("[data-count]").forEach(countUp);
      if (el.matches("[data-count]")) countUp(el);
      io.unobserve(el);
    });
  }, { threshold: .15, rootMargin: "0px 0px -40px 0px" });
  // Escalonado entre hermanos para que no aparezca todo de golpe
  document.querySelectorAll(".stats, .build-grid, .crons, .plans, .terms, .areas, .savings").forEach(group => {
    [...group.children].forEach((c, i) => { c.style.transitionDelay = (i % 4) * 80 + "ms"; });
  });
  reveals.forEach(el => io.observe(el));
  // Los contadores que no están dentro de un .reveal
  document.querySelectorAll("[data-count]").forEach(el => {
    if (!el.closest(".reveal")) io.observe(el);
  });
})();
