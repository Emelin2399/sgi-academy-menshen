# 🐶 SGI Academy Menshen

Plataforma web de capacitación **gamificada** sobre el **Sistema de Gestión Integrado (SGI)** para Menshen Colombia. Diseñada para que el personal construya cultura del SGI de forma **dinámica, práctica y divertida**, con nuestra mascota guardiana de la calidad: **Capi** 🐶🛡️.

> *“Calidad que se cuida, futuro que se protege 🌱”*

---

## ✨ ¿Qué incluye?

- **Login de empleados** (por nombre + área/cargo) y **panel de administrador**.
- **Guardado de usuarios y calificaciones** por empleado (puntos, módulos completados, promedios).
- **Panel de administrador** con estadísticas, tabla de seguimiento y **exportación a CSV** (abre en Excel).
- Mecánicas interactivas:
  - 📖 **Estudios de caso** reales de planta.
  - 🧩 **Preguntas de refuerzo** con calificación automática.
  - 🕵️ **Simulacro de auditor interno**.
  - 🚪 **Escape room** ("encuentra las no conformidades").
  - 🏅 **Certificado** de Guardián de la Calidad al aprobar.
  - ⭐ **Puntos** y seguimiento de progreso.

### Módulos
**Listos (contenido de ejemplo, editable):**
1. 🦠 Contaminación Cruzada — temas + estudio de caso + examen.
2. 🕵️ Simulacro: Auditor Interno — temas + escape room + examen.

**Estructura lista para llenar (marcados como "Próximamente"):**
ISO 9001, ISO 14001, BRCGS, Defectos en Productos, Control de Plagas y Roedores, Buenas Prácticas de Higiene, Buenas Prácticas de Manufactura, Documentación del SGI.

---

## 📱💻 Funciona en PC y celulares

La plataforma es **totalmente responsive**: se adapta a computador, tablet y celular.
- **PC:** módulos en cuadrícula, tabla de administrador completa.
- **Celular:** menú apilado, módulos en una sola columna, botones grandes fáciles de tocar, inputs que **no hacen zoom raro en iPhone**, y la tabla del admin con desplazamiento lateral.
- Incluye etiquetas para que, al "agregar a la pantalla de inicio" del celular, se vea como una app (color de barra, pantalla completa).

## ▶️ Cómo usarla (sin conocimientos técnicos, sin internet)

Es una web de archivos (HTML/CSS/JS): **no requiere instalación, ni servidor, ni cuenta de nada.**

### Opción 1 — En un PC (la más simple)
1. Copia la carpeta completa del proyecto al computador (que tenga `index.html`, y las carpetas `css` y `js`).
2. **Doble clic en `index.html`** → se abre en el navegador (Chrome/Edge). ¡Listo!

### Opción 2 — Para que todos los empleados la usen (PC y celulares)
Como no todos los celulares pueden abrir archivos sueltos, para uso general conviene ponerla en un lugar compartido. Elige lo que más te sirva:
- **Carpeta de red de la empresa:** copia la carpeta a una unidad compartida; cada PC abre `index.html`.
- **Memoria USB:** cópiala a una USB y ábrela en cualquier PC.
- **Publicación gratuita (recomendada para celulares):** sube la carpeta a un servicio gratuito como **Netlify Drop** (https://app.netlify.com/drop) — se arrastra la carpeta y te da un enlace que abres en cualquier celular. No requiere programar.
  - 💡 En el celular, al abrir el enlace, usa **"Agregar a pantalla de inicio"** para tener un acceso tipo app.

> ℹ️ Si más adelante quieres que yo (Kiro) publique la plataforma por ti, solo necesitarías una cuenta gratuita de GitHub; pero **no es obligatorio** para usarla.

### Acceso del Área de Calidad (rol administrador)
- Clic en **“🔐 Soy del Área de Calidad”** en la pantalla de inicio.
- Contraseña por defecto: `menshen2026`
- ⚠️ **Cámbiala** en `js/data.js` → `CONFIG.adminPassword`.

---

## ✏️ Cómo agregar o editar contenido

**Todo el contenido vive en un solo archivo:** `js/data.js`. No necesitas tocar el código.

- Para **activar un módulo "Próximamente"**: cambia su `estado` de `"proximamente"` a `"disponible"` y llena `temas` y `examen`.
- Para **agregar preguntas**: añade objetos a `examen` con `pregunta`, `opciones` (lista) y `correcta` (índice de la respuesta correcta, empezando en 0).
- Para **cambiar el eslogan, la mascota o sus frases**: edita el objeto `MASCOTA`.
- Para **cambiar colores**: edita las variables en `css/styles.css` (bloque `:root`).

---

## 🗄️ Sobre el guardado de datos (IMPORTANTE)

Actualmente los datos de usuarios y calificaciones se guardan con **`localStorage` del navegador**. Esto significa:

- ✅ Funciona sin servidor y es inmediato.
- ⚠️ Los datos quedan **en el navegador de cada computador**. No se comparten automáticamente entre equipos distintos.

**Para centralizar los datos de los 30 empleados en un solo lugar** (recomendado para RR.HH./Calidad), el siguiente paso es conectar un backend. El código ya está preparado: toda la lectura/escritura pasa por la capa `Almacen` en `js/app.js`, por lo que solo habría que reemplazar `Almacen.leer()` y `Almacen.escribir()` por llamadas a una API/base de datos. Avísame y lo implementamos.

---

## 📁 Estructura del proyecto

```
.
├── index.html        # Estructura de la plataforma (login, inicio, módulo, admin)
├── css/
│   └── styles.css     # Identidad visual (azul Menshen + verde sostenibilidad)
└── js/
    ├── data.js        # TODO el contenido: módulos, exámenes, mascota, config
    └── app.js         # Lógica: sesión, exámenes, escape room, panel admin
```

---

Hecho con 🐾 para los Guardianes de la Calidad de **Menshen Colombia**.
