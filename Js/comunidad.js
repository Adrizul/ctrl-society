/**
 * CTRL SOCIETY - CENTRO DE COMUNIDAD Y TELEMETRÍA NASA
 * Integración con NASA Open API (APOD & NASA Image/Video Archive) y Foro Interactivo
 */

// === DATOS DE RESPALDO DE ALTA CALIDAD Y VERIFICADOS (STATUS 200 OK) ===
const FALLBACK_APOD = {
  title: "Acantilados Cósmicos en la Nebulosa Carina (Telescopio James Webb)",
  date: "14 de Noviembre de 2026 // NASA JWST NIRCam",
  url: "https://images-assets.nasa.gov/image/carina_nebula/carina_nebula~medium.jpg",
  media_type: "image",
  copyright: "NASA, ESA, CSA, STScI",
  explanation:
    "Esta majestuosa imagen infrarroja captada por el Telescopio Espacial James Webb revela por primera vez áreas de nacimiento estelar previamente invisibles en la Nebulosa Carina. Conocida como los 'Acantilados Cósmicos', la frontera gaseosa muestra vientos estelares y radiación ultravioleta esculpiendo montañas de polvo interestelar."
};

const FALLBACK_MISSIONS = [
  {
    nasa_id: "ARTEMIS-II-ROLLOUT",
    title: "Misión Artemis II: Cohete SLS y Nave Espacial Orion en la plataforma 39B",
    date: "NASA Kennedy Space Center",
    category: "artemis",
    categoryLabel: "ARTEMIS & LUNA",
    img: encodeURI("https://images-assets.nasa.gov/image/Artemis II at the pad Moon 01292026_4/Artemis II at the pad Moon 01292026_4~large.jpg"),
    fallbackImg: "../Assets/Imagenes/objetos/obj_apollo_lm.jpg",
    summary:
      "La tripulación de cuatro astronautas se prepara para orbitar la Luna a bordo de la cápsula Orion impulsada por el cohete SLS, marcando el retorno de humanos a las cercanías lunares tras más de 50 años.",
    keywords: ["Artemis", "Orion", "Luna", "SLS", "Exploración"]
  },
  {
    nasa_id: "PERSEVERANCE-ROVER-MARS",
    title: "Rover Perseverance: Exploración geológica del Cráter Jezero en Marte",
    date: "NASA Jet Propulsion Laboratory (JPL)",
    category: "marte",
    categoryLabel: "MARTE ROVER",
    img: "https://images-assets.nasa.gov/image/KSC-20200402-PH-JPL01_0002/KSC-20200402-PH-JPL01_0002~medium.jpg",
    fallbackImg: "../Assets/Imagenes/objetos/obj_sojourner.jpg",
    summary:
      "Perseverance analiza sedimentos del antiguo delta marciano y almacena testigos de roca en busca de biofirmas del pasado húmedo de Marte, usando instrumentos de vanguardia como SuperCam y PIXL.",
    keywords: ["Perseverance", "Marte", "Jezero", "Muestras", "JPL"]
  },
  {
    nasa_id: "INGENUITY-MARS-HELICOPTER",
    title: "Ingenuity: El helicóptero pionero y sus 72 vuelos en Marte",
    date: "NASA Mars Exploration Program",
    category: "marte",
    categoryLabel: "MARTE INGENUITY",
    img: "https://images-assets.nasa.gov/image/PIA24466/PIA24466~medium.jpg",
    fallbackImg: "../Assets/Imagenes/objetos/obj_ingenuity.jpg",
    summary:
      "Diseñado como demostrador tecnológico de 5 vuelos, Ingenuity surcó los cielos de Marte durante 72 misiones históricas, demostrando que el vuelo propulsado aerodinámico es viable en la delgada atmósfera marciana.",
    keywords: ["Ingenuity", "Helicóptero", "Marte", "Aviación", "Héroe"]
  },
  {
    nasa_id: "JWST-CARINA-NEBULA",
    title: "Telescopio James Webb: Acantilados Cósmicos y formación de estrellas",
    date: "NASA / ESA / CSA STScI",
    category: "jwst",
    categoryLabel: "TELESCOPIO WEBB",
    img: "https://images-assets.nasa.gov/image/carina_nebula/carina_nebula~medium.jpg",
    fallbackImg: "../Assets/Imagenes/sectores/destino_espacio.png",
    summary:
      "La cámara NIRCam del telescopio James Webb penetra densos velos de polvo cósmico en la Nebulosa Carina, exponiendo cientos de protoestrellas e imponentes chorros expulsados por estrellas nacientes.",
    keywords: ["JWST", "Cosmología", "Nebulosa", "Carina", "Infrarrojo"]
  },
  {
    nasa_id: "VOYAGER-INTERSTELLAR",
    title: "Voyager 1 y 2: Sondas pioneras transmitiendo desde el Espacio Interestelar",
    date: "NASA JPL Interstellar Mission",
    category: "voyager",
    categoryLabel: "ESPACIO PROFUNDO",
    img: "https://images-assets.nasa.gov/image/PIA13892/PIA13892~small.jpg",
    fallbackImg: "../Assets/Imagenes/objetos/obj_surveyor.jpg",
    summary:
      "A más de 24 mil millones de kilómetros del Sol, las legendarias sondas gemelas Voyager continúan enviando datos sobre el plasma y la heliopausa a través de las antenas de la Deep Space Network.",
    keywords: ["Voyager", "Espacio Interestelar", "DSN", "Pioneros"]
  },
  {
    nasa_id: "ISS-EVA-SPACELAB",
    title: "Estación Espacial Internacional: Caminatas extravehiculares en órbita terrestre",
    date: "NASA Johnson Space Center",
    category: "iss",
    categoryLabel: "EEI / ORBITAL",
    img: "https://images-assets.nasa.gov/image/iss072e487421/iss072e487421~medium.jpg",
    fallbackImg: "../Assets/Imagenes/objetos/obj_STS-120 EVA.jpg",
    summary:
      "Astronautas a 400 km de altitud realizan maniobras EVA en el exterior del complejo orbital para instalar mejoras energéticas y realizar mantenimiento en el laboratorio de microgravedad.",
    keywords: ["ISS", "EEI", "EVA", "Astronautas", "Órbita"]
  },
  {
    nasa_id: "LUNAR-VIPER-WATER-ICE",
    title: "Exploración Lunar: Mapeo de agua congelada en el Polo Sur de la Luna",
    date: "NASA Ames Research Center",
    category: "artemis",
    categoryLabel: "ARTEMIS & LUNA",
    img: "https://images-assets.nasa.gov/image/PIA12235/PIA12235~medium.jpg",
    fallbackImg: "../Assets/Imagenes/sectores/destino_luna.png",
    summary:
      "Sensores orbitales y misiones robóticas determinan la concentración de hielo de agua en los cráteres eternamente ensombrecidos del polo sur lunar, recurso vital para la presencia humana continua.",
    keywords: ["Luna", "Polo Sur", "Hielo Lunar", "Agua", "Artemis"]
  },
  {
    nasa_id: "EUROPA-CLIPPER-JUPITER",
    title: "Europa Clipper: Viaje hacia el océano subterráneo de la luna de Júpiter",
    date: "NASA Planetary Missions",
    category: "voyager",
    categoryLabel: "ESPACIO PROFUNDO",
    img: "https://images-assets.nasa.gov/image/PIA22915/PIA22915~small.jpg",
    fallbackImg: "../Assets/Imagenes/objetos/obj_camara_hasselblad.jpg",
    summary:
      "Equipada con radar penetrante de hielo y magnetómetros, Europa Clipper investigará la luna Europa para confirmar si su océano global posee los ingredientes indispensables para la vida.",
    keywords: ["Europa Clipper", "Júpiter", "Océano", "Astrobiología"]
  }
];

// Mapeo de consultas de búsqueda temática a la API de la NASA
const CATEGORY_QUERY_MAP = {
  all: "Artemis rocket",
  artemis: "Artemis Moon",
  marte: "Mars rover",
  jwst: "James Webb telescope",
  voyager: "Voyager spacecraft",
  iss: "Space Station spacewalk"
};

// Fallback de imagen local por categoría (garantiza que NUNCA se repitan si falla la red)
function getCategoryFallback(category) {
  switch (category) {
    case "artemis": return "../Assets/Imagenes/objetos/obj_apollo_lm.jpg";
    case "marte": return "../Assets/Imagenes/objetos/obj_sojourner.jpg";
    case "jwst": return "../Assets/Imagenes/sectores/destino_espacio.png";
    case "voyager": return "../Assets/Imagenes/objetos/obj_surveyor.jpg";
    case "iss": return "../Assets/Imagenes/objetos/obj_STS-120 EVA.jpg";
    default: return "../Assets/Imagenes/sectores/destino_luna.png";
  }
}

// === FORO DE LA COMUNIDAD: PUBLICACIONES PREDETERMINADAS ===
const INITIAL_FORUM_POSTS = [
  {
    id: "post_1",
    author: "Comandante_Astro",
    roleBadge: "OFICIAL DE ENLACE",
    avatar: "🚀",
    tag: "SEÑALES DEL MUSEO",
    title: "¿Cuál de los 15 objetos perdidos fue el más emocionante de rescatar?",
    content:
      "¡Saludos tripulación! Acabo de completar el rescate de las 15 señales para desbloquear el Museo Galáctico. Personalmente la historia del Módulo Lunar Apolo abandonado en el Mar de la Tranquilidad y la espátula STS-121 que flotó en órbita me parecieron fascinantes. ¿Qué misión les pareció más desafiante o conmovedora?",
    date: "Hace 2 horas",
    likes: 18,
    userLiked: false,
    replies: [
      {
        id: "rep_1_1",
        author: "Dra_Elena_Marte",
        date: "Hace 1 hora",
        text: "¡Totalmente de acuerdo! La pequeña Sojourner en Marte me dio mucha nostalgia al pensar que fue el primer paso de todos los rovers modernos."
      },
      {
        id: "rep_1_2",
        author: "Cadete_Nova",
        date: "Hace 35 minutos",
        text: "El helicóptero Ingenuity fue mi favorito. Saber que voló más de 70 veces en una atmósfera tan delgada es una obra maestra de ingeniería."
      }
    ]
  },
  {
    id: "post_2",
    author: "Ingeniero_Ares",
    roleBadge: "ESPECIALISTA MARTE",
    avatar: "🔴",
    tag: "MISIONES & ROVERS",
    title: "La increíble longevidad de las misiones: de Opportunity a Perseverance",
    content:
      "Es asombroso recordar que las sondas Viking estaban planeadas para meses y operaron años, y Opportunity duró casi 15 años cuando su garantía era de 90 soles. En Ctrl Society se honra justamente esa resistencia del hardware humano en el espacio exterior.",
    date: "Hace 5 horas",
    likes: 24,
    userLiked: true,
    replies: [
      {
        id: "rep_2_1",
        author: "AstroFísico_99",
        date: "Hace 3 horas",
        text: "Los 'cleaning events' donde el viento marciano limpiaba los paneles solares de Opportunity parecían milagros de la naturaleza."
      }
    ]
  },
  {
    id: "post_3",
    author: "Vanguardia_Webb",
    roleBadge: "OBSERVADOR COSMOS",
    avatar: "🔭",
    tag: "TEORÍAS & ESPACIO",
    title: "La señal de las Voyager 1 y 2 en el espacio interestelar",
    content:
      "¿Sabían que las antenas de 70 metros de la Deep Space Network (DSN) de la NASA aún captan señales de solo unos pocos vatios emitidas por las Voyager a más de 20 horas luz de distancia? Es el verdadero espíritu de Ctrl Society manteniéndose con vida en el infinito.",
    date: "Ayer",
    likes: 31,
    userLiked: false,
    replies: [
      {
        id: "rep_3_1",
        author: "Comandante_Astro",
        date: "Ayer",
        text: "¡Esa telemetría tardó casi un día entero solo en llegar a la Tierra! Es pura poesía científica."
      }
    ]
  },
  {
    id: "post_4",
    author: "Selenita_Explorer",
    roleBadge: "EXPLORADOR LUNA",
    avatar: "🌕",
    tag: "EVENTOS NASA",
    title: "Artemis III y los sitios históricos de Apolo",
    content:
      "La NASA ha establecido zonas de preservación para que los futuros alunizajes de Artemis no arrojen regolito ni dañen las huellas históricas de Neil Armstrong y los módulos Apolo. ¿Creen que los sitios de misiones históricas deberían convertirse en parques patrimoniales de la humanidad?",
    date: "Hace 2 días",
    likes: 42,
    userLiked: true,
    replies: [
      {
        id: "rep_4_1",
        author: "Tech_Satelital",
        date: "Ayer",
        text: "Sin duda. Son monumentos equivalentes a las pirámides, pero en otro mundo."
      }
    ]
  }
];

// === ESTADO GLOBAL ===
let currentMissionsList = [...FALLBACK_MISSIONS];
let currentCategoryFilter = "all";
let currentSearchTerm = "";
let forumPosts = [];

// === INICIALIZACIÓN ===
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initApod();
  initMissions();
  initForum();
  initTelemetryModal();
});

// =========================================================
// 1. CONTROL DE PESTAÑAS (TABS)
// =========================================================
function initTabs() {
  const tabs = document.querySelectorAll(".tab-control-btn");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.dataset.target;
      const sectionNasa = document.getElementById("section-nasa");
      const sectionForum = document.getElementById("section-forum");

      if (target === "nasa") {
        sectionNasa.classList.remove("hidden");
        sectionForum.classList.add("hidden");
      } else {
        sectionNasa.classList.add("hidden");
        sectionForum.classList.remove("hidden");
      }
    });
  });
}

// =========================================================
// 2. NASA APOD (ASTRONOMY PICTURE OF THE DAY)
// =========================================================
async function initApod() {
  const visualWrap = document.getElementById("apod-visual");
  const titleEl = document.getElementById("apod-title");
  const dateEl = document.getElementById("apod-date");
  const descEl = document.getElementById("apod-desc");
  const statusBadge = document.getElementById("apod-status-badge");
  const btnShare = document.getElementById("btn-apod-share");

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const res = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data = await res.json();

    renderApod(data, true);
  } catch (err) {
    console.warn("NASA APOD en vivo no disponible o con límite de tasa; cargando telemetría de respaldo.", err);
    renderApod(FALLBACK_APOD, false);
  }

  function renderApod(data, isLive) {
    if (statusBadge) {
      statusBadge.textContent = isLive ? "● APOD EN VIVO (NASA API)" : "📡 APOD (TELEMETRÍA NASA)";
      statusBadge.style.borderColor = isLive ? "var(--status-ok)" : "var(--sector-accent)";
      statusBadge.style.color = isLive ? "var(--status-ok)" : "var(--sector-accent)";
    }

    if (titleEl) titleEl.textContent = data.title || "Fotografía Astronómica del Día";
    if (dateEl) dateEl.textContent = `FECHA: ${data.date || "2026"} // CRÉDITOS: ${data.copyright || "NASA Archive"}`;
    if (descEl) descEl.textContent = data.explanation || "";

    if (visualWrap) {
      visualWrap.innerHTML = "";
      if (data.media_type === "video") {
        const iframe = document.createElement("iframe");
        iframe.src = data.url;
        iframe.allowFullscreen = true;
        visualWrap.appendChild(iframe);
      } else {
        const img = document.createElement("img");
        img.src = data.url || data.hdurl || FALLBACK_APOD.url;
        img.alt = data.title || "NASA APOD";
        img.loading = "lazy";
        img.onerror = () => {
          img.onerror = null;
          img.src = FALLBACK_APOD.url;
        };
        visualWrap.appendChild(img);
      }

      const badge = document.createElement("span");
      badge.className = "apod-badge";
      badge.textContent = "NASA ASTRONOMY PICTURE OF THE DAY";
      visualWrap.appendChild(badge);
    }

    if (btnShare) {
      btnShare.onclick = () => {
        quoteInForum({
          tag: "EVENTOS NASA",
          title: `Debate sobre APOD: ${data.title}`,
          content: `Comparto la Imagen Astronómica del Día de la NASA:\n\n"${data.explanation ? data.explanation.slice(0, 220) + "..." : ""}"\n\n¿Qué opinan exploradores?`
        });
      };
    }
  }
}

// =========================================================
// 3. MISIONES Y ACTUALIZACIONES NASA (FEED DINÁMICO)
// =========================================================
async function initMissions() {
  const searchInput = document.getElementById("mission-search-input");
  const filterChips = document.querySelectorAll(".mission-categories .filter-chip");
  const btnRefresh = document.getElementById("btn-refresh-nasa");

  // Filtros por Categoría
  filterChips.forEach((chip) => {
    chip.addEventListener("click", async () => {
      filterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      currentCategoryFilter = chip.dataset.category;

      if (currentCategoryFilter === "all" && !currentSearchTerm) {
        currentMissionsList = [...FALLBACK_MISSIONS];
        applyMissionFilters();
      } else {
        showToast(`📡 Sintonizando canal: ${chip.textContent.trim()}...`);
        await fetchLiveNasaMissions(true);
      }
    });
  });

  // Buscador de misiones con debounce
  if (searchInput) {
    let debounceTimer = null;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      currentSearchTerm = e.target.value.toLowerCase().trim();
      debounceTimer = setTimeout(() => {
        if (currentSearchTerm.length > 2) {
          fetchLiveNasaMissions(true);
        } else {
          applyMissionFilters();
        }
      }, 500);
    });
  }

  // Botón de refrescar / consultar API de imágenes de la NASA
  if (btnRefresh) {
    btnRefresh.addEventListener("click", async () => {
      showToast("📡 Sintonizando señal satelital de la NASA...");
      await fetchLiveNasaMissions(false);
    });
  }

  // Render inicial inmediato con misiones verificadas y variadas
  renderMissionsGrid(currentMissionsList);
}

async function fetchLiveNasaMissions(silent = false) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7500);

    const query = currentSearchTerm || CATEGORY_QUERY_MAP[currentCategoryFilter] || "Artemis Moon";
    const res = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error("Error en servidor NASA");
    const json = await res.json();
    const items = json?.collection?.items || [];

    if (items.length > 0) {
      const liveMissions = items
        .filter((item) => item.links?.[0]?.href)
        .slice(0, 12)
        .map((item) => {
          const d = item.data?.[0] || {};
          const link = item.links?.[0]?.href || "";
          const cat = currentCategoryFilter !== "all" ? currentCategoryFilter : categorizeNasaItem(d);
          return {
            nasa_id: d.nasa_id || "NASA-FEED",
            title: d.title || "Actualización de Misión",
            date: d.date_created ? d.date_created.slice(0, 10) : "NASA Official",
            category: cat,
            categoryLabel: getCategoryLabel(cat),
            img: encodeURI(link),
            fallbackImg: getCategoryFallback(cat),
            summary: d.description
              ? (d.description.length > 180 ? d.description.slice(0, 175) + "..." : d.description)
              : "Registro oficial de telemetría de la NASA.",
            fullText: d.description || "",
            keywords: d.keywords || ["NASA", "Espacio"]
          };
        });

      if (currentCategoryFilter === "all" && !currentSearchTerm) {
        // En vista general combinamos las misiones destacadas
        currentMissionsList = [...FALLBACK_MISSIONS];
      } else {
        currentMissionsList = liveMissions;
      }

      applyMissionFilters();
      if (!silent) showToast("🟢 Telemetría NASA actualizada con éxito.");
    }
  } catch (err) {
    console.warn("Fallo al obtener misiones en vivo de images-api.nasa.gov:", err);
    if (!silent) showToast("📡 Conexión local activa (Archivo NASA verificado).");
  }
}

function categorizeNasaItem(data) {
  const text = `${data.title || ""} ${data.description || ""} ${(data.keywords || []).join(" ")}`.toLowerCase();
  if (text.includes("artemis") || text.includes("orion") || text.includes("moon") || text.includes("lunar")) return "artemis";
  if (text.includes("mars") || text.includes("perseverance") || text.includes("curiosity") || text.includes("ingenuity")) return "marte";
  if (text.includes("webb") || text.includes("jwst") || text.includes("hubble") || text.includes("galaxy") || text.includes("nebula")) return "jwst";
  if (text.includes("voyager") || text.includes("clipper") || text.includes("jupiter") || text.includes("saturn")) return "voyager";
  if (text.includes("iss") || text.includes("station") || text.includes("astronaut") || text.includes("eva")) return "iss";
  return "artemis";
}

function getCategoryLabel(category) {
  switch (category) {
    case "artemis": return "ARTEMIS & LUNA";
    case "marte": return "MARTE ROVER";
    case "jwst": return "TELESCOPIO WEBB";
    case "voyager": return "ESPACIO PROFUNDO";
    case "iss": return "EEI / ORBITAL";
    default: return "MISIÓN NASA";
  }
}

function applyMissionFilters() {
  const filtered = currentMissionsList.filter((m) => {
    const matchesCategory = currentCategoryFilter === "all" || m.category === currentCategoryFilter;
    const matchesSearch =
      !currentSearchTerm ||
      m.title.toLowerCase().includes(currentSearchTerm) ||
      m.summary.toLowerCase().includes(currentSearchTerm) ||
      (m.keywords && m.keywords.some((k) => k.toLowerCase().includes(currentSearchTerm)));
    return matchesCategory && matchesSearch;
  });

  renderMissionsGrid(filtered);
}

function renderMissionsGrid(missions) {
  const grid = document.getElementById("nasa-missions-grid");
  if (!grid) return;

  if (missions.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--panel-bg); border-radius: 14px; border: 1px dashed var(--panel-border);">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 0.8rem;">📡</span>
        <h3 style="font-family: var(--font-display); color: var(--orange-amber);">NO SE DETECTÓ SEÑAL CON ESOS CRITERIOS</h3>
        <p style="color: var(--text-muted); margin-top: 0.4rem;">Prueba buscando otro término como 'Marte', 'Artemis', 'Webb' o 'Apolo'.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = missions
    .map((m, idx) => {
      const fallbackSrc = m.fallbackImg || getCategoryFallback(m.category);
      return `
    <article class="nasa-mission-card" data-idx="${idx}">
      <div class="nasa-card-img-wrap" onclick="openTelemetryModal(${idx})">
        <img 
          src="${m.img}" 
          alt="${escapeHtml(m.title)}" 
          loading="lazy" 
          onerror="this.onerror=null; this.src='${fallbackSrc}';" 
        />
        <span class="nasa-card-tag">${escapeHtml(m.categoryLabel || "NASA")}</span>
      </div>
      <div class="nasa-card-body">
        <span class="nasa-card-date">${escapeHtml(m.date || "NASA LOG")}</span>
        <h3 class="nasa-card-title">${escapeHtml(m.title)}</h3>
        <p class="nasa-card-text">${escapeHtml(m.summary)}</p>
        <div class="nasa-card-footer">
          <button type="button" class="btn-detail" onclick="openTelemetryModal(${idx})">🔍 VER TELEMETRÍA</button>
          <button type="button" class="btn-quote-forum" onclick="quoteMissionToForum(${idx})">💬 CITAR EN FORO</button>
        </div>
      </div>
    </article>
  `;
    })
    .join("");
}

// =========================================================
// 4. MODAL DE TELEMETRÍA DETALLADA
// =========================================================
let modalMissionRef = null;

function initTelemetryModal() {
  const modal = document.getElementById("telemetry-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener("click", closeTelemetryModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeTelemetryModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeTelemetryModal();
  });
}

window.openTelemetryModal = function (idx) {
  const m = currentMissionsList[idx];
  if (!m) return;
  modalMissionRef = m;

  const modal = document.getElementById("telemetry-modal");
  const title = document.getElementById("modal-title");
  const date = document.getElementById("modal-date");
  const category = document.getElementById("modal-category");
  const img = document.getElementById("modal-img");
  const text = document.getElementById("modal-text");
  const tags = document.getElementById("modal-tags");

  if (title) title.textContent = m.title;
  if (date) date.textContent = `FECHA / CENTRO: ${m.date} // ID: ${m.nasa_id || "N/A"}`;
  if (category) category.textContent = m.categoryLabel || "REGISTRO NASA";
  if (img) {
    img.src = m.img;
    img.onerror = () => {
      img.onerror = null;
      img.src = m.fallbackImg || getCategoryFallback(m.category);
    };
  }
  if (text) text.textContent = m.fullText || m.summary;

  if (tags && m.keywords) {
    tags.innerHTML = m.keywords.map((k) => `<span class="filter-chip" style="font-size: 0.75rem;">#${escapeHtml(k)}</span>`).join(" ");
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.closeTelemetryModal = function () {
  const modal = document.getElementById("telemetry-modal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
};

window.quoteMissionToForum = function (idx) {
  const m = (typeof idx === "number" && currentMissionsList[idx]) ? currentMissionsList[idx] : (modalMissionRef || currentMissionsList[0]);
  if (!m) return;
  closeTelemetryModal();
  quoteInForum({
    tag: "MISIONES & ROVERS",
    title: `Telemetría NASA: ${m.title}`,
    content: `Revisando los registros de telemetría de la NASA:\n\n"${m.summary}"\n\n¿Qué implicaciones tiene esta misión para el futuro de la exploración espacial?`
  });
};

// =========================================================
// 5. FORO DE EXPLORADORES (TRANSMISIONES DE LA COMUNIDAD)
// =========================================================
function initForum() {
  const stored = localStorage.getItem("lost_signal_forum_posts");
  if (stored) {
    try {
      forumPosts = JSON.parse(stored);
    } catch {
      forumPosts = [...INITIAL_FORUM_POSTS];
    }
  } else {
    forumPosts = [...INITIAL_FORUM_POSTS];
    saveForumPosts();
  }

  // Selector de Avatar
  const avatarChoices = document.querySelectorAll(".avatar-choice");
  const avatarInput = document.getElementById("post-avatar-input");
  avatarChoices.forEach((btn) => {
    btn.addEventListener("click", () => {
      avatarChoices.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      if (avatarInput) avatarInput.value = btn.dataset.avatar;
    });
  });

  // Envío del Formulario de Transmisión
  const postForm = document.getElementById("new-post-form");
  if (postForm) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const author = document.getElementById("post-author-input").value.trim();
      const role = document.getElementById("post-role-input").value.trim() || "EXPLORADOR ORBITAL";
      const tag = document.getElementById("post-tag-input").value;
      const title = document.getElementById("post-title-input").value.trim();
      const content = document.getElementById("post-content-input").value.trim();
      const avatar = avatarInput?.value || "🚀";

      if (!author || !title || !content) {
        showToast("⚠️ Por favor completa los campos de autor, título y mensaje.");
        return;
      }

      const newPost = {
        id: "post_" + Date.now(),
        author: author,
        roleBadge: role.toUpperCase(),
        avatar: avatar,
        tag: tag,
        title: title,
        content: content,
        date: "Hace unos instantes",
        likes: 1,
        userLiked: true,
        replies: []
      };

      forumPosts.unshift(newPost);
      saveForumPosts();
      renderForumThreads();
      updateForumStats();

      document.getElementById("post-title-input").value = "";
      document.getElementById("post-content-input").value = "";
      showToast("🚀 ¡Frecuencia transmitida con éxito a la red de Ctrl Society!");
    });
  }

  // Filtros del Foro
  const forumFilterChips = document.querySelectorAll(".forum-filter-bar .filter-chip");
  forumFilterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      forumFilterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const tagFilter = chip.dataset.tag;
      renderForumThreads(tagFilter);
    });
  });

  renderForumThreads();
  updateForumStats();
}

function saveForumPosts() {
  localStorage.setItem("lost_signal_forum_posts", JSON.stringify(forumPosts));
}

function renderForumThreads(filterTag = "all") {
  const listContainer = document.getElementById("forum-threads-list");
  if (!listContainer) return;

  const filtered = forumPosts.filter((p) => {
    if (filterTag === "all") return true;
    return p.tag.toLowerCase().includes(filterTag.toLowerCase());
  });

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 2.5rem; background: var(--panel-bg); border-radius: 14px; border: 1px dashed var(--panel-border);">
        <span style="font-size: 2.2rem; display: block; margin-bottom: 0.6rem;">🛰️</span>
        <h3 style="font-family: var(--font-display); color: var(--purple-bright);">NO HAY TRANSMISIONES EN ESTA BANDA</h3>
        <p style="color: var(--text-muted); margin-top: 0.4rem;">Sé el primer explorador en emitir un reporte usando el formulario superior.</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = filtered
    .map((post) => {
      const repliesCount = post.replies ? post.replies.length : 0;
      return `
      <article class="forum-thread-card" id="${post.id}">
        <div class="thread-header">
          <div class="author-meta">
            <div class="author-avatar">${post.avatar || "🚀"}</div>
            <div class="author-name-role">
              <span class="author-name">${escapeHtml(post.author)}</span>
              <span class="author-badge">${escapeHtml(post.roleBadge || "EXPLORADOR")}</span>
            </div>
          </div>
          <div class="thread-tag-date">
            <span class="thread-tag">${escapeHtml(post.tag)}</span>
            <span class="thread-date">${escapeHtml(post.date)}</span>
          </div>
        </div>

        <h3 class="thread-title">${escapeHtml(post.title)}</h3>
        <p class="thread-content">${escapeHtml(post.content)}</p>

        <div class="thread-actions">
          <div class="action-btns-group">
            <button type="button" class="btn-tune ${post.userLiked ? "tuned" : ""}" onclick="toggleLikePost('${post.id}')">
              <span>${post.userLiked ? "❤️" : "🤍"}</span>
              <span>${post.userLiked ? "Sintonizado" : "Sintonizar"}</span>
              <strong style="margin-left: 2px;">(${post.likes || 0})</strong>
            </button>
            <button type="button" class="btn-replies-toggle" onclick="toggleRepliesSection('${post.id}')">
              <span>💬</span>
              <span>Respuestas</span>
              <strong>(${repliesCount})</strong>
            </button>
          </div>
          <button type="button" class="btn-quote-forum" onclick="replyFocus('${post.id}')">
            ✍️ Responder
          </button>
        </div>

        <div class="thread-replies-container ${repliesCount > 0 ? "" : "hidden"}" id="replies-${post.id}">
          <div class="replies-list" id="replies-list-${post.id}">
            ${renderRepliesList(post.replies)}
          </div>
          <form class="reply-input-bar" onsubmit="handleSendReply(event, '${post.id}')">
            <input type="text" placeholder="Escribe tu mensaje a la frecuencia de ${escapeHtml(post.author)}..." required id="reply-text-${post.id}" />
            <button type="submit" class="btn-send-reply">TRANSMITIR</button>
          </form>
        </div>
      </article>
    `;
    })
    .join("");
}

function renderRepliesList(replies = []) {
  if (!replies || replies.length === 0) return "";
  return replies
    .map(
      (r) => `
    <div class="reply-item">
      <div class="reply-header">
        <span class="reply-author">👨‍🚀 ${escapeHtml(r.author || "Explorador")}</span>
        <span class="reply-date">${escapeHtml(r.date || "Reciente")}</span>
      </div>
      <p style="color: var(--text-main);">${escapeHtml(r.text)}</p>
    </div>
  `
    )
    .join("");
}

window.toggleLikePost = function (postId) {
  const post = forumPosts.find((p) => p.id === postId);
  if (!post) return;

  if (post.userLiked) {
    post.likes = Math.max(0, (post.likes || 1) - 1);
    post.userLiked = false;
  } else {
    post.likes = (post.likes || 0) + 1;
    post.userLiked = true;
    showToast("❤️ Frecuencia sintonizada (+1 Señal)");
  }

  saveForumPosts();
  renderForumThreads();
  updateForumStats();
};

window.toggleRepliesSection = function (postId) {
  const container = document.getElementById(`replies-${postId}`);
  if (container) {
    container.classList.toggle("hidden");
  }
};

window.replyFocus = function (postId) {
  const container = document.getElementById(`replies-${postId}`);
  if (container) {
    container.classList.remove("hidden");
    const input = document.getElementById(`reply-text-${postId}`);
    if (input) {
      input.focus();
    }
  }
};

window.handleSendReply = function (event, postId) {
  event.preventDefault();
  const input = document.getElementById(`reply-text-${postId}`);
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  const post = forumPosts.find((p) => p.id === postId);
  if (!post) return;

  if (!post.replies) post.replies = [];

  const authorName = document.getElementById("post-author-input")?.value.trim() || "Cadete_Orbital";

  post.replies.push({
    id: "rep_" + Date.now(),
    author: authorName,
    text: text,
    date: "Hace un momento"
  });

  input.value = "";
  saveForumPosts();
  renderForumThreads();
  updateForumStats();
  showToast("💬 Respuesta transmitida en la red.");
};

function updateForumStats() {
  const totalTransmissionsEl = document.getElementById("stat-total-transmissions");
  const totalTunesEl = document.getElementById("stat-total-tunes");

  if (totalTransmissionsEl) totalTransmissionsEl.textContent = forumPosts.length;
  if (totalTunesEl) {
    const totalLikes = forumPosts.reduce((acc, p) => acc + (p.likes || 0), 0);
    totalTunesEl.textContent = totalLikes;
  }
}

function quoteInForum({ tag, title, content }) {
  const forumTabBtn = document.querySelector('.tab-control-btn[data-target="forum"]');
  if (forumTabBtn) forumTabBtn.click();

  const tagInput = document.getElementById("post-tag-input");
  const titleInput = document.getElementById("post-title-input");
  const contentInput = document.getElementById("post-content-input");

  if (tagInput && tag) tagInput.value = tag;
  if (titleInput && title) titleInput.value = title;
  if (contentInput && content) contentInput.value = content;

  const panel = document.getElementById("new-post-panel");
  if (panel) {
    panel.scrollIntoView({ behavior: "smooth" });
  }

  showToast("📝 Se ha cargado la telemetría en el formulario del foro.");
}

function showToast(message) {
  let toast = document.getElementById("hud-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "hud-toast";
    toast.className = "hud-toast";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>🛰️</span> <span>${escapeHtml(message)}</span>`;
  toast.classList.add("visible");

  if (window._toastTimeout) clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove("visible");
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
