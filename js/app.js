/* ============================================================
   SGI Academy Menshen — Lógica de la aplicación
   ------------------------------------------------------------
   Maneja: login de empleados, panel de administrador,
   navegación, render de módulos, exámenes con calificación
   automática, estudio de caso, escape room, puntaje y
   certificado.

   ALMACENAMIENTO (localStorage):
   - Usuarios y calificaciones se guardan por empleado.
   - Estructura:
     {
       usuarios: {
         "<idUsuario>": {
           nombre, area, puntos,
           completados: { "<idModulo>": { porcentaje, fecha } },
           ultimaActividad
         }
       },
       sesionActual: "<idUsuario>" | null
     }
   NOTA: localStorage es por navegador/equipo. Para compartir
   los datos entre varios computadores se necesitaría un
   servidor/BD; este archivo está preparado para migrar a eso
   (ver funciones de la capa "Almacen").
   ============================================================ */

/* ============================================================
   CAPA DE ALMACENAMIENTO (fácil de migrar a un backend)
   ============================================================ */
const DB_KEY = "sgi_menshen_db_v2";

const Almacen = {
  leer() {
    try {
      return JSON.parse(localStorage.getItem(DB_KEY)) || { usuarios: {}, sesionActual: null };
    } catch {
      return { usuarios: {}, sesionActual: null };
    }
  },
  escribir(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  },
};

let DB = Almacen.leer();

/* ---------------- Utilidades ---------------- */
const $ = (sel) => document.querySelector(sel);

function slug(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function usuarioActual() {
  if (!DB.sesionActual) return null;
  return DB.usuarios[DB.sesionActual] || null;
}

function guardar() {
  Almacen.escribir(DB);
}

/* ============================================================
   VOZ DE CAPI MENSHI (Web Speech API)
   Capi puede HABLAR en voz alta en PC y celulares, sin instalar
   nada. El usuario puede activar/silenciar la voz con un botón.
   ============================================================ */
const Voz = {
  soportada: typeof window !== "undefined" && "speechSynthesis" in window,
  activa: true, // el usuario puede silenciar
  vozEs: null,

  init() {
    if (!this.soportada) return;
    // Preferencia guardada de voz on/off
    const pref = localStorage.getItem("sgi_voz_activa");
    if (pref !== null) this.activa = pref === "1";
    // Buscar una voz en español cuando el navegador las cargue
    const elegir = () => {
      const voces = window.speechSynthesis.getVoices();
      this.vozEs =
        voces.find((v) => /es(-|_)?(CO|419|MX|ES)/i.test(v.lang)) ||
        voces.find((v) => /^es/i.test(v.lang)) ||
        null;
    };
    elegir();
    window.speechSynthesis.onvoiceschanged = elegir;
  },

  hablar(texto) {
    if (!this.soportada || !this.activa || !texto) return;
    // Quitar emojis para que no los lea
    const limpio = texto.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/gu, "").trim();
    if (!limpio) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(limpio);
    u.lang = "es-CO";
    if (this.vozEs) u.voice = this.vozEs;
    u.rate = 1;
    u.pitch = 1.15; // tono amigable
    window.speechSynthesis.speak(u);
  },

  silenciar() {
    if (this.soportada) window.speechSynthesis.cancel();
  },

  toggle() {
    this.activa = !this.activa;
    localStorage.setItem("sgi_voz_activa", this.activa ? "1" : "0");
    if (!this.activa) this.silenciar();
    return this.activa;
  },
};
Voz.init();

/* ============================================================
   LOGIN / SESIÓN
   ============================================================ */
function initLogin() {
  $("#loginSlogan").textContent = "“" + MASCOTA.eslogan + "”";

  $("#loginBtn").addEventListener("click", entrarEmpleado);
  $("#inpNombre").addEventListener("keydown", (e) => { if (e.key === "Enter") entrarEmpleado(); });
  $("#inpArea").addEventListener("keydown", (e) => { if (e.key === "Enter") entrarEmpleado(); });

  $("#adminToggle").addEventListener("click", () => {
    $("#adminLoginBox").classList.toggle("hidden");
  });
  $("#adminLoginBtn").addEventListener("click", entrarAdmin);
  $("#inpAdminPass").addEventListener("keydown", (e) => { if (e.key === "Enter") entrarAdmin(); });
}

function mostrarErrorLogin(msg) {
  const box = $("#loginError");
  box.textContent = msg;
  box.classList.remove("hidden");
}

function entrarEmpleado() {
  const nombre = $("#inpNombre").value.trim();
  const area = $("#inpArea").value.trim();
  if (nombre.length < 3) {
    mostrarErrorLogin("Por favor escribe tu nombre completo.");
    return;
  }
  const id = slug(nombre);

  if (!DB.usuarios[id]) {
    DB.usuarios[id] = {
      nombre,
      area: area || "Sin especificar",
      puntos: 0,
      completados: {},
      creado: new Date().toISOString(),
      ultimaActividad: new Date().toISOString(),
    };
  } else {
    // Actualiza el área por si cambió
    if (area) DB.usuarios[id].area = area;
    DB.usuarios[id].ultimaActividad = new Date().toISOString();
  }
  DB.sesionActual = id;
  guardar();
  irAInicio();
}

function entrarAdmin() {
  const pass = $("#inpAdminPass").value;
  if (pass === CONFIG.adminPassword) {
    DB.sesionActual = "__admin__";
    irAAdmin();
  } else {
    mostrarErrorLogin("Contraseña del Área de Calidad incorrecta.");
  }
}

function cerrarSesion() {
  DB.sesionActual = null;
  guardar();
  $("#inpNombre").value = "";
  $("#inpArea").value = "";
  $("#inpAdminPass") && ($("#inpAdminPass").value = "");
  renderTopbar();
  mostrarVista("#view-login");
}

/* ============================================================
   ENCABEZADO DINÁMICO
   ============================================================ */
function renderTopbar() {
  const cont = $("#topbarRight");
  const u = usuarioActual();

  const btnVoz = Voz.soportada
    ? `<button class="btn-ghost" id="vozBtn" title="Activar o silenciar la voz de Capi Menshi">${Voz.activa ? "🔊" : "🔇"} Capi</button>`
    : "";

  if (DB.sesionActual === "__admin__") {
    cont.innerHTML = `
      <span class="user-chip">🛡️ Área de Calidad</span>
      ${btnVoz}
      <button class="btn-ghost" id="logoutBtn">Salir</button>
    `;
  } else if (u) {
    cont.innerHTML = `
      <span class="user-chip" title="${u.area}">👤 ${u.nombre}</span>
      <div class="score-chip" title="Tus puntos de guardián"><span aria-hidden="true">⭐</span> <span>${u.puntos}</span> pts</div>
      ${btnVoz}
      <button class="btn-ghost" id="logoutBtn">Salir</button>
    `;
  } else {
    cont.innerHTML = "";
    return;
  }
  const lb = $("#logoutBtn");
  if (lb) lb.addEventListener("click", cerrarSesion);
  const vb = $("#vozBtn");
  if (vb)
    vb.addEventListener("click", () => {
      const activa = Voz.toggle();
      vb.innerHTML = `${activa ? "🔊" : "🔇"} Capi`;
      if (activa) Voz.hablar("¡Hola! Ahora puedes escucharme.");
    });
}

function actualizarPuntajeTopbar() {
  renderTopbar();
}

function sumarPuntos(n) {
  const u = usuarioActual();
  if (!u) return;
  u.puntos += n;
  u.ultimaActividad = new Date().toISOString();
  guardar();
  actualizarPuntajeTopbar();
}

/* ============================================================
   NAVEGACIÓN DE VISTAS
   ============================================================ */
function mostrarVista(id) {
  document.querySelectorAll(".view").forEach((v) => v.classList.add("hidden"));
  $(id).classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function irAInicio() {
  renderTopbar();
  initHome();
  mostrarVista("#view-home");
}

function irAAdmin() {
  renderTopbar();
  renderAdmin();
  mostrarVista("#view-admin");
}

/* ============================================================
   INICIO (EMPLEADO)
   ============================================================ */
function initHome() {
  const u = usuarioActual();
  const nombreCorto = u ? u.nombre.split(" ")[0] : "";
  const saludo = `¡Hola, ${nombreCorto}! ` + MASCOTA.frases.bienvenida;
  $("#mascotBubble").textContent = saludo;
  $("#mascotSlogan").textContent = "“" + MASCOTA.eslogan + "”";
  Voz.hablar(saludo);
  renderModulos();
}

function renderModulos() {
  const u = usuarioActual();
  const grid = $("#moduleGrid");
  grid.innerHTML = "";

  MODULOS.forEach((mod) => {
    const card = document.createElement("div");
    const disponible = mod.estado === "disponible";
    const completado = u && u.completados[mod.id];

    card.className = "module-card" + (disponible ? "" : " locked");
    card.style.borderTopColor = mod.color;

    let estadoHtml;
    if (!disponible) {
      estadoHtml = '<span class="module-status status-soon">🔒 Próximamente</span>';
    } else if (completado) {
      estadoHtml = `<span class="module-status status-done">✅ Completado · ${completado.porcentaje}%</span>`;
    } else {
      estadoHtml = '<span class="module-status status-start">▶ Comenzar</span>';
    }

    card.innerHTML = `
      ${completado ? '<div class="ribbon">¡HECHO!</div>' : ""}
      <div class="module-icon">${mod.icono}</div>
      <h3>${mod.titulo}</h3>
      <p>${mod.descripcion}</p>
      ${estadoHtml}
    `;

    if (disponible) card.addEventListener("click", () => abrirModulo(mod.id));
    grid.appendChild(card);
  });
}

/* ============================================================
   VISTA DE MÓDULO
   ============================================================ */
function abrirModulo(modId) {
  const mod = MODULOS.find((m) => m.id === modId);
  if (!mod) return;

  const v = $("#view-module");
  let html = `
    <div class="module-header">
      <button class="back-btn" id="backBtn">← Volver</button>
      <div class="module-title-big">${mod.icono} ${mod.titulo}</div>
    </div>
  `;

  mod.temas.forEach((t, ti) => {
    const btnLeer = Voz.soportada
      ? `<button class="btn-leer" data-leer="tema-${ti}" title="Que Capi Menshi lo lea en voz alta">🔊 Escuchar</button>`
      : "";
    html += `
      <div class="card">
        <h3>${t.titulo}</h3>
        <p>${t.contenido}</p>
        ${
          t.tip
            ? `<div class="tip">
                 <img class="capi-mini" src="img/capi-menshi.svg" alt="Capi Menshi" />
                 <span data-tip="tema-${ti}">${t.tip}</span>
                 ${btnLeer}
               </div>`
            : ""
        }
      </div>
    `;
  });

  if (mod.caso) {
    html += `
      <div class="card" id="casoCard">
        <h3>📖 ${mod.caso.titulo}</h3>
        <p style="margin-bottom:12px">${mod.caso.situacion}</p>
        <p class="q-text">${mod.caso.pregunta}</p>
        <div id="casoOpciones"></div>
        <div id="casoFeedback"></div>
      </div>
    `;
  }

  if (mod.escapeRoom) {
    const totalNC = mod.escapeRoom.pistas.filter((p) => p.correcto).length;
    html += `
      <div class="card" id="escapeCard">
        <h3>${mod.escapeRoom.titulo}</h3>
        <p style="margin-bottom:12px">${mod.escapeRoom.intro}</p>
        <p class="escape-counter">Encontradas: <span id="escapeCount">0</span> / ${totalNC}</p>
        <div class="escape-scene" id="escapeScene"></div>
        <div id="escapeFeedback"></div>
      </div>
    `;
  }

  if (mod.examen && mod.examen.length) {
    html += `
      <div class="card" id="examenCard">
        <h3>📝 Examen de refuerzo</h3>
        <p style="margin-bottom:14px">Responde para demostrar lo aprendido. ¡Necesitas 70% para aprobar!</p>
        <div id="examenPreguntas"></div>
        <button class="btn success" id="calificarBtn">Calificar examen</button>
        <div id="examenResultado"></div>
      </div>
    `;
  }

  v.innerHTML = html;
  mostrarVista("#view-module");

  $("#backBtn").addEventListener("click", irAInicio);

  // Botones "Escuchar": Capi Menshi lee el consejo en voz alta
  document.querySelectorAll(".btn-leer").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-leer");
      const span = document.querySelector(`[data-tip="${id}"]`);
      if (span) Voz.hablar("Capi Menshi dice: " + span.textContent.replace(/Capi Menshi dice:/i, ""));
    });
  });

  if (mod.caso) renderCaso(mod);
  if (mod.escapeRoom) renderEscape(mod);
  if (mod.examen && mod.examen.length) renderExamen(mod);
}

/* ---------------- Estudio de caso ---------------- */
function renderCaso(mod) {
  const cont = $("#casoOpciones");
  const fb = $("#casoFeedback");
  let respondido = false;

  mod.caso.opciones.forEach((op, i) => {
    const b = document.createElement("button");
    b.className = "option";
    b.textContent = op;
    b.addEventListener("click", () => {
      if (respondido) return;
      respondido = true;
      const botones = cont.querySelectorAll(".option");
      botones.forEach((bb) => (bb.disabled = true));
      if (i === mod.caso.correcta) {
        b.classList.add("correct");
        fb.innerHTML = `<div class="feedback ok">✅ ${MASCOTA.frases.aciertoExamen} ${mod.caso.explicacion}</div>`;
        Voz.hablar(MASCOTA.frases.aciertoExamen + " " + mod.caso.explicacion);
        sumarPuntos(10);
      } else {
        b.classList.add("wrong");
        botones[mod.caso.correcta].classList.add("correct");
        fb.innerHTML = `<div class="feedback no">❌ ${MASCOTA.frases.falloExamen} ${mod.caso.explicacion}</div>`;
        Voz.hablar(MASCOTA.frases.falloExamen + " " + mod.caso.explicacion);
      }
    });
    cont.appendChild(b);
  });
}

/* ---------------- Escape room ---------------- */
function renderEscape(mod) {
  const scene = $("#escapeScene");
  const fb = $("#escapeFeedback");
  const counter = $("#escapeCount");
  const totalCorrectas = mod.escapeRoom.pistas.filter((p) => p.correcto).length;
  let encontradas = 0;

  const pistas = [...mod.escapeRoom.pistas].sort(() => Math.random() - 0.5);

  pistas.forEach((pista) => {
    const el = document.createElement("div");
    el.className = "escape-item";
    el.textContent = pista.texto;
    el.addEventListener("click", () => {
      if (el.classList.contains("found")) return;
      if (pista.correcto) {
        el.classList.add("found");
        encontradas++;
        counter.textContent = encontradas;
        sumarPuntos(5);
        fb.innerHTML = `<div class="feedback ok">✅ ${pista.mensaje}</div>`;
        Voz.hablar(pista.mensaje);
        if (encontradas === totalCorrectas) {
          const msg = "¡Lo lograste! Encontraste todo. " + MASCOTA.frases.moduloCompleto;
          fb.innerHTML = `<div class="feedback ok">🎉 ¡Escapaste de la sala! Encontraste todas las no conformidades. ${MASCOTA.frases.moduloCompleto}</div>`;
          Voz.hablar(msg);
          sumarPuntos(15);
        }
      } else {
        el.classList.add("wrong");
        fb.innerHTML = `<div class="feedback no">👀 ${pista.mensaje}</div>`;
        Voz.hablar(pista.mensaje);
        setTimeout(() => el.classList.remove("wrong"), 700);
      }
    });
    scene.appendChild(el);
  });
}

/* ---------------- Examen ---------------- */
function renderExamen(mod) {
  const cont = $("#examenPreguntas");
  const seleccion = {};

  mod.examen.forEach((q, qi) => {
    const block = document.createElement("div");
    block.className = "question";
    block.innerHTML = `<p class="q-text">${qi + 1}. ${q.pregunta}</p>`;
    const opsCont = document.createElement("div");

    q.opciones.forEach((op, oi) => {
      const b = document.createElement("button");
      b.className = "option";
      b.textContent = op;
      b.addEventListener("click", () => {
        if (block.dataset.calificado) return;
        seleccion[qi] = oi;
        opsCont.querySelectorAll(".option").forEach((x) => x.classList.remove("selected"));
        b.classList.add("selected");
      });
      opsCont.appendChild(b);
    });

    block.appendChild(opsCont);
    cont.appendChild(block);
  });

  $("#calificarBtn").addEventListener("click", () => calificarExamen(mod, seleccion, cont));
}

function calificarExamen(mod, seleccion, cont) {
  const total = mod.examen.length;
  if (Object.keys(seleccion).length < total) {
    $("#examenResultado").innerHTML =
      `<div class="feedback no">⚠️ Responde todas las preguntas antes de calificar.</div>`;
    return;
  }

  let aciertos = 0;
  const bloques = cont.querySelectorAll(".question");

  mod.examen.forEach((q, qi) => {
    const bloque = bloques[qi];
    bloque.dataset.calificado = "1";
    const opciones = bloque.querySelectorAll(".option");
    opciones.forEach((o) => (o.disabled = true));

    const elegida = seleccion[qi];
    if (elegida === q.correcta) {
      aciertos++;
      opciones[elegida].classList.remove("selected");
      opciones[elegida].classList.add("correct");
    } else {
      opciones[elegida].classList.remove("selected");
      opciones[elegida].classList.add("wrong");
      opciones[q.correcta].classList.add("correct");
    }
  });

  const porcentaje = Math.round((aciertos / total) * 100);
  const aprobado = porcentaje >= 70;
  const puntosExamen = aciertos * 10;
  sumarPuntos(puntosExamen);

  const u = usuarioActual();
  if (aprobado && u) {
    const previo = u.completados[mod.id];
    // Guarda/actualiza la mejor calificación
    if (!previo || porcentaje > previo.porcentaje) {
      u.completados[mod.id] = {
        porcentaje,
        fecha: new Date().toLocaleDateString("es-CO"),
      };
      if (!previo) sumarPuntos(20); // bono la primera vez que aprueba
      guardar();
    }
  }

  $("#examenResultado").innerHTML = `
    <div class="exam-result">
      <div class="score-big">${porcentaje}%</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${porcentaje}%"></div></div>
      <p style="font-weight:800;color:${aprobado ? "var(--verde-oscuro)" : "#991b1b"}">
        ${aprobado ? "🎉 ¡Aprobado! " + MASCOTA.frases.moduloCompleto : "💪 " + MASCOTA.frases.animo + " (Necesitas 70%)"}
      </p>
      <p>Acertaste ${aciertos} de ${total} · Ganaste ${puntosExamen} pts</p>
      ${aprobado ? renderCertificado(mod, porcentaje) : `<button class="btn" id="reintentarBtn">Reintentar examen</button>`}
      <div style="margin-top:14px"><button class="btn secondary" id="volverBtn">Volver al inicio</button></div>
    </div>
  `;

  // Capi Menshi anuncia el resultado en voz alta
  Voz.hablar(
    aprobado
      ? `¡Aprobaste con ${porcentaje} por ciento! ${MASCOTA.frases.moduloCompleto}`
      : `Obtuviste ${porcentaje} por ciento. ${MASCOTA.frases.animo} Necesitas 70 por ciento para aprobar.`
  );

  const reintentar = $("#reintentarBtn");
  if (reintentar) reintentar.addEventListener("click", () => abrirModulo(mod.id));
  $("#volverBtn").addEventListener("click", irAInicio);
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

/* ---------------- Certificado ---------------- */
function renderCertificado(mod, porcentaje) {
  const u = usuarioActual();
  const nombre = u ? u.nombre : "Guardián de la Calidad";
  return `
    <div class="cert" style="margin-top:18px">
      <div class="cert-emoji">🏅</div>
      <h2>Certificado de Guardián de la Calidad</h2>
      <p style="font-weight:700;margin:6px 0">Otorgado a <strong>${nombre}</strong></p>
      <p>Por completar el módulo</p>
      <p style="font-size:20px;font-weight:800;color:${mod.color}">${mod.icono} ${mod.titulo}</p>
      <p style="margin-top:8px">Calificación: <strong>${porcentaje}%</strong> · ${new Date().toLocaleDateString("es-CO")}</p>
      <p style="margin-top:8px;font-style:italic;color:var(--morado)">“${MASCOTA.eslogan}” — ${MASCOTA.nombre}</p>
    </div>
  `;
}

/* ============================================================
   PANEL DE ADMINISTRADOR
   ============================================================ */
function listaUsuarios() {
  return Object.entries(DB.usuarios).map(([id, u]) => ({ id, ...u }));
}

function totalModulosDisponibles() {
  return MODULOS.filter((m) => m.estado === "disponible").length;
}

function promedioUsuario(u) {
  const vals = Object.values(u.completados).map((c) => c.porcentaje);
  if (!vals.length) return null;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

function renderAdmin() {
  const usuarios = listaUsuarios();
  const totalMods = totalModulosDisponibles();

  // Estadísticas generales
  const totalEmpleados = usuarios.length;
  const activos = usuarios.filter((u) => Object.keys(u.completados).length > 0).length;
  const promGeneralVals = usuarios.map(promedioUsuario).filter((v) => v !== null);
  const promGeneral = promGeneralVals.length
    ? Math.round(promGeneralVals.reduce((a, b) => a + b, 0) / promGeneralVals.length)
    : 0;

  $("#adminStats").innerHTML = `
    <div class="stat-card"><div class="stat-num">${totalEmpleados}</div><div class="stat-label">Empleados registrados</div></div>
    <div class="stat-card"><div class="stat-num">${activos}</div><div class="stat-label">Con módulos aprobados</div></div>
    <div class="stat-card"><div class="stat-num">${promGeneral}%</div><div class="stat-label">Promedio general</div></div>
    <div class="stat-card"><div class="stat-num">${totalMods}</div><div class="stat-label">Módulos disponibles</div></div>
  `;

  const tbody = $("#adminTableBody");
  tbody.innerHTML = "";

  if (!usuarios.length) {
    $("#adminEmpty").textContent = "Aún no hay empleados registrados. Cuando el personal ingrese con su nombre, aparecerá aquí.";
  } else {
    $("#adminEmpty").textContent = "";
    // Ordenar por puntos descendente
    usuarios.sort((a, b) => b.puntos - a.puntos);
    usuarios.forEach((u) => {
      const prom = promedioUsuario(u);
      const completados = Object.keys(u.completados).length;
      const fecha = u.ultimaActividad
        ? new Date(u.ultimaActividad).toLocaleDateString("es-CO")
        : "—";
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${u.nombre}</strong></td>
        <td>${u.area || "—"}</td>
        <td>${completados} / ${totalMods}</td>
        <td>${prom === null ? "—" : prom + "%"}</td>
        <td>⭐ ${u.puntos}</td>
        <td>${fecha}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  $("#exportBtn").onclick = exportarCSV;
  $("#adminResetBtn").onclick = () => {
    if (confirm("¿Seguro que deseas BORRAR TODOS los datos de todos los empleados? Esta acción no se puede deshacer.")) {
      DB = { usuarios: {}, sesionActual: "__admin__" };
      guardar();
      renderAdmin();
    }
  };
}

function exportarCSV() {
  const usuarios = listaUsuarios();
  const totalMods = totalModulosDisponibles();
  const modsDisp = MODULOS.filter((m) => m.estado === "disponible");

  // Encabezados: datos + una columna por módulo disponible
  const headers = ["Empleado", "Area/Cargo", "Modulos completados", "Promedio (%)", "Puntos", "Ultima actividad"];
  modsDisp.forEach((m) => headers.push(m.titulo + " (%)"));

  const filas = [headers];
  usuarios.forEach((u) => {
    const prom = promedioUsuario(u);
    const fila = [
      u.nombre,
      u.area || "",
      `${Object.keys(u.completados).length}/${totalMods}`,
      prom === null ? "" : prom,
      u.puntos,
      u.ultimaActividad ? new Date(u.ultimaActividad).toLocaleDateString("es-CO") : "",
    ];
    modsDisp.forEach((m) => {
      const c = u.completados[m.id];
      fila.push(c ? c.porcentaje : "");
    });
    filas.push(fila);
  });

  // Convertir a CSV (con comillas por si hay comas)
  const csv = filas
    .map((f) => f.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  // BOM para que Excel reconozca acentos
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `calificaciones_sgi_menshen_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ============================================================
   ARRANQUE
   ============================================================ */
function iniciar() {
  initLogin();
  renderTopbar();

  // Restaurar sesión previa
  if (DB.sesionActual === "__admin__") {
    irAAdmin();
  } else if (usuarioActual()) {
    irAInicio();
  } else {
    mostrarVista("#view-login");
  }
}

iniciar();
