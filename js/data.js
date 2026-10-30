/* ============================================================
   SGI Academy Menshen Colombia — Datos de contenido
   ------------------------------------------------------------
   Este archivo concentra TODO el contenido de la plataforma.
   Para agregar o editar módulos, temas, exámenes, estudios de
   caso o retos del escape room, SOLO debes modificar este
   archivo. No necesitas tocar el resto del código.
   ============================================================ */

/* Configuración general de la plataforma */
const CONFIG = {
  nombrePlataforma: "SGI Academy Menshen",
  // Contraseña del panel de administrador. CÁMBIALA por seguridad.
  adminPassword: "menshen2026",
};

/* La mascota guardiana de la calidad */
const MASCOTA = {
  nombre: "Capi",
  especie: "perro guardián de la calidad",
  // Alineado con el espíritu de marca Menshen: calidad + sostenibilidad
  eslogan: "Calidad que se cuida, futuro que se protege 🌱",
  // Frases que Capi dice en distintos momentos
  frases: {
    bienvenida:
      "¡Guau! Soy Capi, tu guardián de la calidad. Juntos vamos a cuidar que todo en Menshen se haga bien. ¿Listo para la aventura?",
    aciertoExamen: "¡Excelente olfato! Detectaste bien la respuesta.",
    falloExamen: "¡Ups! Esa se nos escapó. Revisemos por qué.",
    moduloCompleto: "¡Misión cumplida! Un guardián más fuerte en Menshen.",
    animo: "No te rindas, los mejores guardianes aprenden de cada pista.",
  },
};

/* ============================================================
   MÓDULOS
   Cada módulo tiene:
   - id, titulo, icono (emoji), color, descripcion
   - estado: "disponible" | "proximamente"
   - temas: bloques de contenido teórico/práctico
   - caso: estudio de caso (opcional)
   - examen: preguntas con calificación automática
   ============================================================ */

const MODULOS = [
  /* ---------- MÓDULO 1: CONTAMINACIÓN CRUZADA (completo) ---------- */
  {
    id: "contaminacion-cruzada",
    titulo: "Contaminación Cruzada",
    icono: "🦠",
    color: "#e74c3c",
    descripcion:
      "Aprende a identificar y prevenir que un peligro pase de un producto, superficie o persona a otro.",
    estado: "disponible",
    temas: [
      {
        titulo: "¿Qué es la contaminación cruzada?",
        contenido:
          "Es el paso o transferencia de un peligro (biológico, químico, físico o alérgeno) desde una fuente contaminada hacia un producto, superficie, equipo o persona que estaba limpio. Ocurre muchas veces sin que nos demos cuenta: con las manos, los utensilios, la ropa o incluso el aire.",
        tip: "Capi dice: la contaminación no siempre se ve. ¡Por eso hay que prevenirla, no solo detectarla!",
      },
      {
        titulo: "Tipos de contaminación cruzada",
        contenido:
          "1) BIOLÓGICA: bacterias, virus, hongos (ej. pasar microbios de una superficie sucia a una limpia). 2) QUÍMICA: residuos de detergentes, lubricantes o desinfectantes. 3) FÍSICA: fragmentos de metal, vidrio, plástico, cabellos. 4) POR ALÉRGENOS: cuando un alérgeno contamina un producto que no debería contenerlo.",
        tip: "Capi dice: un mismo trapo mal usado puede causar los 4 tipos. ¡Ojo con eso!",
      },
      {
        titulo: "Cómo prevenirla",
        contenido:
          "• Separar zonas, utensilios y equipos por tipo de producto. • Lavado y desinfección de manos correcto y frecuente. • Código de colores para utensilios de limpieza. • No mezclar materiales crudos con terminados. • Respetar el flujo de proceso (de zona sucia a zona limpia, nunca al revés). • Reportar de inmediato cualquier riesgo detectado.",
        tip: "Capi dice: el flujo correcto es tu mejor amigo. ¡Nunca retrocedas de limpio a sucio!",
      },
    ],
    caso: {
      titulo: "Estudio de caso: El turno de la tarde",
      situacion:
        "Camila termina de limpiar una máquina con un trapo rojo y, como tiene afán, usa el mismo trapo para secar la banda donde van las tapas ya terminadas. Minutos después, el supervisor nota residuos extraños en varias tapas listas para empacar.",
      pregunta: "¿Cuál fue el error principal de Camila?",
      opciones: [
        "Limpió la máquina demasiado rápido",
        "Usó el mismo trapo para una zona sucia y luego para producto terminado",
        "No usó guantes",
        "Trabajó en el turno de la tarde",
      ],
      correcta: 1,
      explicacion:
        "El trapo pasó de una zona/elemento sucio al producto terminado, transfiriendo contaminación. Se debe usar código de colores y nunca el mismo utensilio entre zonas limpias y sucias.",
    },
    examen: [
      {
        pregunta:
          "¿Cuál de estas NO es un tipo de contaminación cruzada?",
        opciones: ["Biológica", "Química", "Emocional", "Por alérgenos"],
        correcta: 2,
      },
      {
        pregunta:
          "El flujo de proceso correcto para evitar contaminación cruzada va de:",
        opciones: [
          "Zona limpia a zona sucia",
          "Zona sucia a zona limpia",
          "No importa el flujo",
          "Depende del turno",
        ],
        correcta: 1,
      },
      {
        pregunta: "El código de colores en utensilios de limpieza sirve para:",
        opciones: [
          "Que se vea más bonito",
          "Separar su uso por zonas y evitar mezclas",
          "Identificar al dueño del utensilio",
          "Nada en particular",
        ],
        correcta: 1,
      },
      {
        pregunta: "Si detectas un riesgo de contaminación cruzada debes:",
        opciones: [
          "Ignorarlo si tienes afán",
          "Esperar al día siguiente",
          "Reportarlo de inmediato",
          "Resolverlo tú solo sin avisar",
        ],
        correcta: 2,
      },
    ],
  },

  /* ---------- MÓDULO 2: SIMULACRO AUDITOR INTERNO (completo) ---------- */
  {
    id: "auditor-interno",
    titulo: "Simulacro: Auditor Interno",
    icono: "🕵️",
    color: "#8e44ad",
    descripcion:
      "Ponte en los zapatos de un auditor interno y detecta las no conformidades en la planta.",
    estado: "disponible",
    temas: [
      {
        titulo: "¿Qué hace un auditor interno?",
        contenido:
          "Verifica que los procesos se cumplan según lo definido en el Sistema de Gestión Integrado y las normas (ISO 9001, ISO 14001, BRCGS). Observa, pregunta, revisa registros y detecta 'no conformidades' (incumplimientos) para que se corrijan antes de una auditoría externa o de un problema real.",
        tip: "Capi dice: un auditor no busca culpables, busca mejorar. ¡Ojo de guardián, corazón de aliado!",
      },
      {
        titulo: "¿Qué es una no conformidad?",
        contenido:
          "Es el incumplimiento de un requisito: algo que debería hacerse de cierta forma y no se está cumpliendo. Puede ser mayor (riesgo grave o sistémico) o menor (puntual). Ejemplo: un registro sin firmar, un extintor vencido, un producto sin identificación.",
        tip: "Capi dice: si no está documentado, ¡para el auditor no se hizo!",
      },
    ],
    // El escape room / simulacro es un reto especial (se renderiza aparte)
    escapeRoom: {
      titulo: "🚪 Escape de Sala: Encuentra las 4 no conformidades",
      intro:
        "Capi te encierra (con cariño) en la Sala de Producción. Para salir, debes encontrar las 4 no conformidades escondidas en la escena. ¡Haz clic en lo que esté mal!",
      // Cada 'pista' es un elemento clickeable. correcto=true si es una no conformidad.
      pistas: [
        {
          id: "extintor",
          texto: "🧯 Extintor con fecha de recarga vencida",
          correcto: true,
          mensaje: "¡No conformidad! Un extintor vencido es un riesgo de seguridad.",
        },
        {
          id: "registro",
          texto: "📋 Registro de limpieza sin firmar",
          correcto: true,
          mensaje: "¡No conformidad! Si no está firmado, no hay evidencia de que se hizo.",
        },
        {
          id: "basura",
          texto: "🗑️ Caneca de residuos destapada junto a producto",
          correcto: true,
          mensaje: "¡No conformidad! Riesgo de contaminación cruzada.",
        },
        {
          id: "epp",
          texto: "🧤 Operario sin cofia ni guantes en zona limpia",
          correcto: true,
          mensaje: "¡No conformidad! No se cumplen las buenas prácticas de higiene.",
        },
        {
          id: "mesa",
          texto: "🪑 Mesa de trabajo limpia y ordenada",
          correcto: false,
          mensaje: "Eso está bien, ¡no es una no conformidad! Sigue buscando.",
        },
        {
          id: "senal",
          texto: "🚸 Señalización de ruta de evacuación visible",
          correcto: false,
          mensaje: "Eso está correcto. ¡Buen ambiente de trabajo! Sigue buscando.",
        },
      ],
    },
    examen: [
      {
        pregunta: "Una no conformidad es:",
        opciones: [
          "Un empleado con mal genio",
          "El incumplimiento de un requisito",
          "Una auditoría externa",
          "Un tipo de producto",
        ],
        correcta: 1,
      },
      {
        pregunta: "El objetivo principal de un auditor interno es:",
        opciones: [
          "Buscar culpables y sancionar",
          "Mejorar y verificar el cumplimiento",
          "Detener la producción",
          "Hacer más papeleo",
        ],
        correcta: 1,
      },
      {
        pregunta: "Un registro de limpieza sin firmar es considerado:",
        opciones: [
          "Algo normal",
          "Una no conformidad",
          "Responsabilidad del cliente",
          "Un documento opcional",
        ],
        correcta: 1,
      },
    ],
  },

  /* ---------- MÓDULOS PRÓXIMAMENTE (estructura lista para llenar) ---------- */
  {
    id: "iso-9001",
    titulo: "ISO 9001 — Calidad",
    icono: "🏆",
    color: "#f39c12",
    descripcion: "Fundamentos del sistema de gestión de calidad.",
    estado: "proximamente",
    temas: [],
    examen: [],
  },
  {
    id: "iso-14001",
    titulo: "ISO 14001 — Ambiental",
    icono: "🌱",
    color: "#27ae60",
    descripcion: "Gestión ambiental y cuidado de nuestro entorno.",
    estado: "proximamente",
    temas: [],
    examen: [],
  },
  {
    id: "brcgs",
    titulo: "BRCGS — Seguridad Alimentaria",
    icono: "🛡️",
    color: "#2980b9",
    descripcion: "Estándar global de seguridad para empaques y productos.",
    estado: "proximamente",
    temas: [],
    examen: [],
  },
  {
    id: "defectos-producto",
    titulo: "Defectos en Productos",
    icono: "🔍",
    color: "#c0392b",
    descripcion: "Identificación y manejo de defectos en el producto.",
    estado: "proximamente",
    temas: [],
    examen: [],
  },
  {
    id: "plagas-roedores",
    titulo: "Control de Plagas y Roedores",
    icono: "🐀",
    color: "#7f8c8d",
    descripcion: "Prevención y control de plagas en la planta.",
    estado: "proximamente",
    temas: [],
    examen: [],
  },
  {
    id: "bph",
    titulo: "Buenas Prácticas de Higiene",
    icono: "🧼",
    color: "#16a085",
    descripcion: "Higiene personal y del entorno de trabajo.",
    estado: "proximamente",
    temas: [],
    examen: [],
  },
  {
    id: "bpm",
    titulo: "Buenas Prácticas de Manufactura",
    icono: "🏭",
    color: "#2c3e50",
    descripcion: "Condiciones y procedimientos para producir con calidad.",
    estado: "proximamente",
    temas: [],
    examen: [],
  },
  {
    id: "documentacion",
    titulo: "Documentación del SGI",
    icono: "📑",
    color: "#d35400",
    descripcion: "Manejo correcto de registros y documentos.",
    estado: "proximamente",
    temas: [],
    examen: [],
  },
];
