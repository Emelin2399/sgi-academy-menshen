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

/* La mascota oficial de Menshen: Capi Menshi (la letra "M" con casco) */
const MASCOTA = {
  nombre: "Capi Menshi",
  especie: "guardián de la calidad de Menshen",
  // Alineado con el espíritu de marca Menshen: calidad + sostenibilidad
  eslogan: "Calidad que se cuida, futuro que se protege 🌱",
  // Frases que Capi Menshi dice en distintos momentos
  frases: {
    bienvenida:
      "¡Hola, soy Capi Menshi! Juntos vamos a cuidar la calidad, la higiene y el ambiente en Menshen. ¿List@ para la aventura?",
    aciertoExamen: "¡Muy bien! Esa la tenías clarísima.",
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
    descripcion: "Identifica y clasifica los defectos en boquillas, tapas y cierres Menshen.",
    estado: "disponible",
    temas: [
      {
        titulo: "¿Por qué importa detectar defectos?",
        contenido:
          "Un defecto que llega al cliente genera reclamaciones, retrabajos y afecta la confianza en Menshen. Nuestro objetivo es entregar productos seguros y que cumplan con la legalidad y con los requisitos del cliente. ¡Detectar a tiempo es cuidar la calidad y la inocuidad!",
        tip: "Capi Menshi dice: una pieza defectuosa detectada en planta es un problema evitado para el cliente.",
      },
      {
        titulo: "Clasificación de defectos y niveles AQL",
        contenido:
          "Los defectos se clasifican por su gravedad y se inspeccionan con Nivel de Inspección II: • CRÍTICOS (AQL 0.1%): los más graves, casi no se tolera ninguno (ej. fisura en boquilla, contaminación con grasa, puntos incrustados). • MAYORES (AQL 1.0%): afectan la función o apariencia (ej. punto de inyección alto, exceso de material, rebabas mayores a 1 mm, rechupe). • MENORES (AQL 4.0%): defectos leves (ej. pequeñas diferencias de tonalidad).",
        tip: "Capi Menshi dice: a menor AQL, más estricto el control. ¡Los críticos casi no se perdonan!",
      },
      {
        titulo: "Defectos más comunes en nuestros productos",
        contenido:
          "• CONTAMINACIÓN: con grasa, aceite o puntos/manchas extrañas. • LLENADO INCOMPLETO: falta material (en cuerdas, base o tapa). • REBABA / FLASH: exceso de material sobrante, mayor a 1 mm. • EXCESO DE MATERIAL y RECHUPE: hundimientos por enfriamiento. • FISURA / PIEZA DEFORME / BASE ESTRELLADA. • DIFERENCIA DE TONALIDAD y RÁFAGA DE COLOR. • DEFECTOS DE SELLADO: sello incompleto, liner descentrado o volteado.",
        tip: "Capi Menshi dice: si la pieza no se ve, se siente o se arma como debe... ¡sepárala y repórtala!",
      },
    ],
    caso: {
      titulo: "Estudio de caso: La boquilla con fisura",
      situacion:
        "Durante la inspección, Andrés nota una pequeña fisura en la boquilla de un lote de Weldspout. Como 'solo es una entre muchas' y va retrasado, decide dejarla pasar y continuar empacando.",
      pregunta: "¿Qué debió hacer Andrés?",
      opciones: [
        "Dejarla pasar, una sola pieza no afecta",
        "Separar la pieza y reportar: una fisura en boquilla es un defecto CRÍTICO",
        "Empacarla aparte para el siguiente turno",
        "Esperar a que el supervisor la encuentre",
      ],
      correcta: 1,
      explicacion:
        "La fisura en boquilla es un defecto CRÍTICO (AQL 0.1%). Debe separarse y reportarse de inmediato, sin importar el afán. Dejarla pasar pone en riesgo al cliente y la inocuidad del producto.",
    },
    escapeRoom: {
      titulo: "🔎 Reto visual: Clasifica el defecto",
      intro:
        "Capi Menshi te muestra una mesa de inspección. Haz clic en los elementos que SON defectos reales de nuestras piezas. ¡Encuentra los 4 defectos!",
      pistas: [
        { id: "grasa", texto: "🛢️ Pieza contaminada con grasa", correcto: true, mensaje: "¡Defecto CRÍTICO! La contaminación con grasa no se tolera." },
        { id: "rebaba", texto: "➕ Rebaba mayor a 1 mm", correcto: true, mensaje: "¡Defecto MAYOR! El exceso de material sobrante es rebaba." },
        { id: "llenado", texto: "🕳️ Llenado incompleto en cuerdas", correcto: true, mensaje: "¡Defecto! Falta material, la pieza no sella bien." },
        { id: "rechupe", texto: "🌀 Rechupe (hundimiento)", correcto: true, mensaje: "¡Defecto MAYOR! Hundimiento por enfriamiento irregular." },
        { id: "ok1", texto: "✅ Pieza completa, limpia y sin rebabas", correcto: false, mensaje: "¡Esa está perfecta! No es defecto. Sigue buscando." },
        { id: "ok2", texto: "✅ Tonalidad uniforme y correcta", correcto: false, mensaje: "Esa cumple. No es defecto. Sigue buscando." },
      ],
    },
    examen: [
      {
        pregunta: "Una fisura en boquilla se clasifica como defecto:",
        opciones: ["Menor (AQL 4.0%)", "Mayor (AQL 1.0%)", "Crítico (AQL 0.1%)", "No es defecto"],
        correcta: 2,
      },
      {
        pregunta: "¿Cuál de estos es un defecto de contaminación?",
        opciones: ["Rebaba", "Pieza con grasa o aceite", "Rechupe", "Diferencia de tonalidad"],
        correcta: 1,
      },
      {
        pregunta: "La 'rebaba mayor a 1 mm' es un exceso de:",
        opciones: ["Color", "Material sobrante", "Temperatura", "Presión del cliente"],
        correcta: 1,
      },
      {
        pregunta: "Si encuentras una pieza con llenado incompleto debes:",
        opciones: [
          "Empacarla igual si tienes afán",
          "Separarla y reportarla",
          "Guardarla para ti",
          "Mezclarla con las buenas",
        ],
        correcta: 1,
      },
      {
        pregunta: "El Nivel de Inspección usado en nuestros defectos es:",
        opciones: ["Nivel I", "Nivel II", "Nivel V", "No se usa nivel"],
        correcta: 1,
      },
    ],
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
    descripcion: "Higiene personal, uniforme y reglas de ingreso a planta en Menshen.",
    estado: "disponible",
    temas: [
      {
        titulo: "¿Qué son las Buenas Prácticas de Higiene (BPH)?",
        contenido:
          "Son la combinación de procesos, personal y procedimientos de control cuyo objetivo es garantizar que los productos cumplan siempre con los niveles de higiene adecuados. En Menshen fabricamos empaques para las industrias cosmética, farmacéutica, química, detergente y alimentaria, por eso la higiene es un requisito indispensable.",
        tip: "Capi Menshi dice: la higiene no es opcional, ¡es parte de cómo cuidamos a nuestros clientes!",
      },
      {
        titulo: "Reglas de presentación personal",
        contenido:
          "SÍ: usar cofia, cubrebarba, ropa y calzado limpios, manos limpias y desinfectadas. NO: aretes u otros accesorios, uñas largas o pintadas, perfume, fumar, comer, estornudar o toser sobre el producto. El tapabocas es obligatorio solo en casos de gripa o sospecha de enfermedad infectocontagiosa.",
        tip: "Capi Menshi dice: antes de entrar, revísate de la cofia a las botas. ¡Eres la primera barrera de higiene!",
      },
      {
        titulo: "Ingreso a planta y cuidado del uniforme",
        contenido:
          "El uniforme se transporta en la bolsa de Menshen y debe estar sin roturas, con bolsillos y cierre en buen estado. Solo se ingresa con la dotación entregada (pantalón, botas de seguridad, camisa, cofia, cubrebocas y protección auditiva). Al entrar se limpia el calzado en el tapete. En el locker se respeta el código de colores: ropa de trabajo y ropa de calle SEPARADAS, en bolsas bien cerradas.",
        tip: "Capi Menshi dice: lava el uniforme con jabón neutro sin olor y plánchalo: el calor reduce la contaminación microbiológica.",
      },
      {
        titulo: "Lavado de manos: ¡no negociable!",
        contenido:
          "Lávate las manos en la unidad de higiene: al entrar a la planta, al cambiar de actividad, cada vez que recojas piezas del suelo, y al consumir alimentos o ir al baño. Técnica: moja, enjabona, frota palmas, dorsos, entre dedos, pulgares y uñas, enjuaga y seca con papel. Además: cubre las heridas e infórmalas, no comas en áreas de producción y no fumes en planta.",
        tip: "Capi Menshi dice: lavarse las manos, cubrir heridas, no comer y no fumar en planta son reglas ¡NO NEGOCIABLES!",
      },
    ],
    caso: {
      titulo: "Estudio de caso: El turno con afán",
      situacion:
        "Laura llega tarde, guarda el uniforme y la ropa de calle juntos en el mismo compartimiento del locker, entra con un arete puesto y no pasa por el tapete porque 'va de afán'.",
      pregunta: "¿Cuántas reglas de higiene incumplió Laura?",
      opciones: [
        "Ninguna, llegar tarde no es problema de higiene",
        "Tres: mezclar ropa, usar arete y no limpiar el calzado en el tapete",
        "Solo una: el arete",
        "Dos: el arete y llegar tarde",
      ],
      correcta: 1,
      explicacion:
        "Incumplió tres BPH: no separó ropa de trabajo y de calle (código de colores), ingresó con accesorios (arete) y no limpió el calzado en el tapete al entrar.",
    },
    examen: [
      {
        pregunta: "¿Cuál de estas SÍ es una buena práctica de higiene?",
        opciones: ["Usar perfume fuerte", "Uñas largas y pintadas", "Usar cofia y cubrebarba", "Comer en producción"],
        correcta: 2,
      },
      {
        pregunta: "El tapabocas en Menshen es obligatorio:",
        opciones: [
          "Siempre, todo el tiempo",
          "Nunca",
          "Solo en casos de gripa o sospecha de enfermedad infectocontagiosa",
          "Solo los lunes",
        ],
        correcta: 2,
      },
      {
        pregunta: "¿Cuándo debes lavarte las manos?",
        opciones: [
          "Solo al llegar en la mañana",
          "Al entrar a planta, cambiar de actividad, recoger piezas del suelo e ir al baño",
          "Solo si están visiblemente sucias",
          "Una vez por semana",
        ],
        correcta: 1,
      },
      {
        pregunta: "En el locker, la ropa de trabajo y la de calle deben:",
        opciones: ["Ir mezcladas", "Estar separadas según el código de colores", "Ir en el piso", "Compartir bolsa"],
        correcta: 1,
      },
      {
        pregunta: "¿Cómo se debe transportar el uniforme?",
        opciones: ["En la mano", "En la bolsa de Menshen", "En cualquier bolsa", "No importa"],
        correcta: 1,
      },
    ],
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
    titulo: "Documentación y Política del SGI",
    icono: "📑",
    color: "#d35400",
    descripcion: "La Política Integrada de Gestión de Menshen y el manejo de registros.",
    estado: "disponible",
    temas: [
      {
        titulo: "¿Qué es el Sistema de Gestión Integrado (SGI)?",
        contenido:
          "La Política Integrada de Gestión de Menshen está conformada por seis pilares: Calidad, Medio Ambiente, Energía, Higiene, Salud y Seguridad, y Cumplimiento. La Alta Dirección está expresamente comprometida con ella y vincula a todas las plantas del Grupo Menshen, incluida Menshen Colombia S.A.S.",
        tip: "Capi Menshi dice: 'Calidad' no es solo el producto, es una forma de pensar y una parte de nuestra cultura.",
      },
      {
        titulo: "Nuestro compromiso: clientes, sostenibilidad y personas",
        contenido:
          "El objetivo de la Dirección es llevar al mercado productos seguros y que cumplan con la legalidad. El cliente es el centro de nuestras acciones. Apostamos por la sostenibilidad (reducir nuestra huella de carbono, usar materiales reciclables y reciclados) y por nuestras personas: solo empleados calificados y motivados hacen crecer a la empresa, por eso la formación continua y la seguridad en el trabajo son prioridad.",
        tip: "Capi Menshi dice: cuidar el ambiente y las personas también es hacer calidad. ¡Solo tenemos una Tierra!",
      },
      {
        titulo: "Importancia de la documentación y los registros",
        contenido:
          "Los procesos claramente descritos son la base de la transparencia y la reproducibilidad en todo el grupo Menshen. En cada proceso se generan y evalúan datos para identificar puntos débiles, definir medidas y evaluar su efectividad. Por eso los registros deben llenarse completos, legibles, a tiempo y firmados: si no está documentado, para efectos del SGI no se hizo.",
        tip: "Capi Menshi dice: un registro sin firmar o incompleto es como no haberlo hecho. ¡Documenta bien!",
      },
    ],
    caso: {
      titulo: "Estudio de caso: El registro a medias",
      situacion:
        "Al cierre del turno, Diego llena el registro de control pero deja varias casillas vacías y no lo firma, pensando que 'alguien lo completará después'. En una revisión, no hay evidencia de que el control se realizó.",
      pregunta: "¿Cuál es el problema principal?",
      opciones: [
        "Ninguno, lo importante es que hizo el trabajo",
        "Un registro incompleto y sin firmar no sirve como evidencia: para el SGI 'no se hizo'",
        "Que usó lapicero azul",
        "Que lo llenó al final del turno",
      ],
      correcta: 1,
      explicacion:
        "La documentación da transparencia y trazabilidad. Un registro incompleto y sin firmar no demuestra que el control se realizó; debe llenarse completo, legible y firmado.",
    },
    examen: [
      {
        pregunta: "¿Cuántos pilares conforman la Política Integrada de Gestión de Menshen?",
        opciones: ["Tres", "Seis (Calidad, Ambiente, Energía, Higiene, Salud y Seguridad, Cumplimiento)", "Dos", "Diez"],
        correcta: 1,
      },
      {
        pregunta: "Para el SGI, un proceso o control que no está documentado:",
        opciones: ["Se considera realizado igual", "Se considera NO realizado (no hay evidencia)", "No importa", "Lo valida el cliente"],
        correcta: 1,
      },
      {
        pregunta: "¿Quién está comprometida expresamente con la Política Integrada de Gestión?",
        opciones: ["Solo el área de Calidad", "La Alta Dirección y todas las plantas del Grupo", "Solo los operarios", "Solo el cliente"],
        correcta: 1,
      },
      {
        pregunta: "Un registro bien hecho debe ser:",
        opciones: ["Incompleto pero rápido", "Completo, legible, a tiempo y firmado", "Solo firmado", "Llenado a lápiz y borrable"],
        correcta: 1,
      },
    ],
  },
];
