/**
 * CTRL SOCIETY - CENTRO DE COMUNIDAD Y TELEMETRÍA NASA
 * Integración con NASA Open API (APOD & NASA Image/Video Archive) y Foro Interactivo
 * Soporte bilingüe completo (ES / EN) sincronizado con el motor I18N
 */

function _loc(field) {
  if (!field) return "";
  if (typeof field === "object") {
    const isEn = typeof I18N !== "undefined" && I18N.getLang() === "en";
    return isEn ? (field.en || field.es || "") : (field.es || field.en || "");
  }
  return String(field);
}

function t(key, vars = {}) {
  return typeof I18N !== "undefined" ? I18N.t(key, vars) : key;
}

// === DATOS DE RESPALDO DE ALTA CALIDAD Y VERIFICADOS (STATUS 200 OK) ===
const FALLBACK_APOD = {
  title: {
    es: "Acantilados Cósmicos en la Nebulosa Carina (Telescopio James Webb)",
    en: "Cosmic Cliffs in the Carina Nebula (James Webb Space Telescope)"
  },
  date: {
    es: "14 de Noviembre de 2026 // NASA JWST NIRCam",
    en: "November 14, 2026 // NASA JWST NIRCam"
  },
  url: "https://images-assets.nasa.gov/image/carina_nebula/carina_nebula~medium.jpg",
  media_type: "image",
  copyright: "NASA, ESA, CSA, STScI",
  explanation: {
    es: "Esta majestuosa imagen infrarroja captada por el Telescopio Espacial James Webb revela por primera vez áreas de nacimiento estelar previamente invisibles en la Nebulosa Carina. Conocida como los 'Acantilados Cósmicos', la frontera gaseosa muestra vientos estelares y radiación ultravioleta esculpiendo montañas de polvo interestelar.",
    en: "This majestic infrared image captured by the James Webb Space Telescope reveals for the first time previously invisible areas of star birth in the Carina Nebula. Known as the 'Cosmic Cliffs', the gaseous frontier showcases stellar winds and ultraviolet radiation sculpting mountains of interstellar dust."
  }
};

const FALLBACK_MISSIONS = [
  {
    nasa_id: "ARTEMIS-II-ROLLOUT",
    title: {
      es: "Misión Artemis II: Cohete SLS y Nave Espacial Orion en la plataforma 39B",
      en: "Artemis II Mission: SLS Rocket and Orion Spacecraft at Launch Pad 39B"
    },
    date: {
      es: "NASA Kennedy Space Center",
      en: "NASA Kennedy Space Center"
    },
    category: "artemis",
    categoryLabel: {
      es: "ARTEMIS & LUNA",
      en: "ARTEMIS & MOON"
    },
    img: encodeURI("https://images-assets.nasa.gov/image/Artemis II at the pad Moon 01292026_4/Artemis II at the pad Moon 01292026_4~large.jpg"),
    fallbackImg: "../Assets/Imagenes/objetos/obj_apollo_lm.jpg",
    summary: {
      es: "La tripulación de cuatro astronautas se prepara para orbitar la Luna a bordo de la cápsula Orion impulsada por el cohete SLS, marcando el retorno de humanos a las cercanías lunares tras más de 50 años.",
      en: "The crew of four astronauts prepares to orbit the Moon aboard the Orion spacecraft powered by the SLS rocket, marking the return of humans to lunar vicinity after more than 50 years."
    },
    keywords: ["Artemis", "Orion", "Luna", "SLS", "Exploración"]
  },
  {
    nasa_id: "PERSEVERANCE-ROVER-MARS",
    title: {
      es: "Rover Perseverance: Exploración geológica del Cráter Jezero en Marte",
      en: "Perseverance Rover: Geological Exploration of Jezero Crater on Mars"
    },
    date: {
      es: "NASA Jet Propulsion Laboratory (JPL)",
      en: "NASA Jet Propulsion Laboratory (JPL)"
    },
    category: "marte",
    categoryLabel: {
      es: "MARTE ROVER",
      en: "MARS ROVER"
    },
    img: "https://images-assets.nasa.gov/image/KSC-20200402-PH-JPL01_0002/KSC-20200402-PH-JPL01_0002~medium.jpg",
    fallbackImg: "../Assets/Imagenes/objetos/obj_sojourner.jpg",
    summary: {
      es: "Perseverance analiza sedimentos del antiguo delta marciano y almacena testigos de roca en busca de biofirmas del pasado húmedo de Marte, usando instrumentos de vanguardia como SuperCam y PIXL.",
      en: "Perseverance analyzes sediments of the ancient Martian delta and caches rock cores searching for biosignatures of Mars's wet past, using cutting-edge instruments like SuperCam and PIXL."
    },
    keywords: ["Perseverance", "Marte", "Jezero", "Muestras", "JPL"]
  },
  {
    nasa_id: "INGENUITY-MARS-HELICOPTER",
    title: {
      es: "Ingenuity: El helicóptero pionero y sus 72 vuelos en Marte",
      en: "Ingenuity: The Pioneer Helicopter and its 72 Flights on Mars"
    },
    date: {
      es: "NASA Mars Exploration Program",
      en: "NASA Mars Exploration Program"
    },
    category: "marte",
    categoryLabel: {
      es: "MARTE INGENUITY",
      en: "MARS INGENUITY"
    },
    img: "https://images-assets.nasa.gov/image/PIA24466/PIA24466~medium.jpg",
    fallbackImg: "../Assets/Imagenes/objetos/obj_ingenuity.jpg",
    summary: {
      es: "Diseñado como demostrador tecnológico de 5 vuelos, Ingenuity surcó los cielos de Marte durante 72 misiones históricas, demostrando que el vuelo propulsado aerodinámico es viable en la delgada atmósfera marciana.",
      en: "Designed as a 5-flight tech demo, Ingenuity soared through Martian skies during 72 historic missions, proving powered aerodynamic flight is viable in Mars's thin atmosphere."
    },
    keywords: ["Ingenuity", "Helicóptero", "Marte", "Aviación", "Héroe"]
  },
  {
    nasa_id: "JWST-CARINA-NEBULA",
    title: {
      es: "Telescopio James Webb: Acantilados Cósmicos y formación de estrellas",
      en: "James Webb Telescope: Cosmic Cliffs and Star Formation"
    },
    date: {
      es: "NASA / ESA / CSA STScI",
      en: "NASA / ESA / CSA STScI"
    },
    category: "jwst",
    categoryLabel: {
      es: "TELESCOPIO WEBB",
      en: "WEBB TELESCOPE"
    },
    img: "https://images-assets.nasa.gov/image/carina_nebula/carina_nebula~medium.jpg",
    fallbackImg: "../Assets/Imagenes/sectores/destino_espacio.png",
    summary: {
      es: "La cámara NIRCam del telescopio James Webb penetra densos velos de polvo cósmico en la Nebulosa Carina, exponiendo cientos de protoestrellas e imponentes chorros expulsados por estrellas nacientes.",
      en: "The James Webb Telescope NIRCam camera penetrates dense veils of cosmic dust in the Carina Nebula, unveiling hundreds of protostars and towering jets cast by newborn stars."
    },
    keywords: ["JWST", "Cosmología", "Nebulosa", "Carina", "Infrarrojo"]
  },
  {
    nasa_id: "VOYAGER-INTERSTELLAR",
    title: {
      es: "Voyager 1 y 2: Sondas pioneras transmitiendo desde el Espacio Interestelar",
      en: "Voyager 1 & 2: Pioneer Probes Broadcasting from Interstellar Space"
    },
    date: {
      es: "NASA JPL Interstellar Mission",
      en: "NASA JPL Interstellar Mission"
    },
    category: "voyager",
    categoryLabel: {
      es: "ESPACIO PROFUNDO",
      en: "DEEP SPACE"
    },
    img: "https://images-assets.nasa.gov/image/PIA13892/PIA13892~small.jpg",
    fallbackImg: "../Assets/Imagenes/objetos/obj_surveyor.jpg",
    summary: {
      es: "A más de 24 mil millones de kilómetros del Sol, las legendarias sondas gemelas Voyager continúan enviando datos sobre el plasma y la heliopausa a través de las antenas de la Deep Space Network.",
      en: "Over 24 billion kilometers from the Sun, the legendary twin Voyager probes continue transmitting data on plasma and the heliopause via the Deep Space Network antennas."
    },
    keywords: ["Voyager", "Espacio Interestelar", "DSN", "Pioneros"]
  },
  {
    nasa_id: "ISS-EVA-SPACELAB",
    title: {
      es: "Estación Espacial Internacional: Caminatas extravehiculares en órbita terrestre",
      en: "International Space Station: Spacewalks in Low Earth Orbit"
    },
    date: {
      es: "NASA Johnson Space Center",
      en: "NASA Johnson Space Center"
    },
    category: "iss",
    categoryLabel: {
      es: "EEI / ORBITAL",
      en: "ISS / ORBITAL"
    },
    img: "https://images-assets.nasa.gov/image/iss072e487421/iss072e487421~medium.jpg",
    fallbackImg: "../Assets/Imagenes/objetos/obj_STS-120 EVA.jpg",
    summary: {
      es: "Astronautas a 400 km de altitud realizan maniobras EVA en el exterior del complejo orbital para instalar mejoras energéticas y realizar mantenimiento en el laboratorio de microgravedad.",
      en: "Astronauts at 400 km altitude perform spacewalk maneuvers outside the orbital complex to upgrade solar power and maintain the microgravity laboratory."
    },
    keywords: ["ISS", "EEI", "EVA", "Astronautas", "Órbita"]
  },
  {
    nasa_id: "LUNAR-VIPER-WATER-ICE",
    title: {
      es: "Exploración Lunar: Mapeo de agua congelada en el Polo Sur de la Luna",
      en: "Lunar Exploration: Mapping Water Ice at the Lunar South Pole"
    },
    date: {
      es: "NASA Ames Research Center",
      en: "NASA Ames Research Center"
    },
    category: "artemis",
    categoryLabel: {
      es: "ARTEMIS & LUNA",
      en: "ARTEMIS & MOON"
    },
    img: "https://images-assets.nasa.gov/image/PIA12235/PIA12235~medium.jpg",
    fallbackImg: "../Assets/Imagenes/sectores/destino_luna.png",
    summary: {
      es: "Sensores orbitales y misiones robóticas determinan la concentración de hielo de agua en los cráteres eternamente ensombrecidos del polo sur lunar, recurso vital para la presencia humana continua.",
      en: "Orbital sensors and robotic missions determine water ice concentration in permanently shadowed craters of the lunar south pole, vital for sustained human presence."
    },
    keywords: ["Luna", "Polo Sur", "Hielo Lunar", "Agua", "Artemis"]
  },
  {
    nasa_id: "EUROPA-CLIPPER-JUPITER",
    title: {
      es: "Europa Clipper: Viaje hacia el océano subterráneo de la luna de Júpiter",
      en: "Europa Clipper: Journey to the Subsurface Ocean of Jupiter's Moon"
    },
    date: {
      es: "NASA Planetary Missions",
      en: "NASA Planetary Missions"
    },
    category: "voyager",
    categoryLabel: {
      es: "ESPACIO PROFUNDO",
      en: "DEEP SPACE"
    },
    img: "https://images-assets.nasa.gov/image/PIA22915/PIA22915~small.jpg",
    fallbackImg: "../Assets/Imagenes/objetos/obj_camara_hasselblad.jpg",
    summary: {
      es: "Equipada con radar penetrante de hielo y magnetómetros, Europa Clipper investigará la luna Europa para confirmar si su océano global posee los ingredientes indispensables para la vida.",
      en: "Equipped with ice-penetrating radar and magnetometers, Europa Clipper will explore Jupiter's moon Europa to determine whether its global subsurface ocean has conditions suitable for life."
    },
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

// === FORO DE LA COMUNIDAD: INICIO LIMPIO (PLAN B: SIN PUBLICACIONES SIMULADAS) ===
const INITIAL_FORUM_POSTS = [];

// === ESTADO GLOBAL ===
let currentMissionsList = [...FALLBACK_MISSIONS];
let currentCategoryFilter = "all";
let currentSearchTerm = "";
let forumPosts = [];
let currentForumFilter = "all";
let currentApodData = FALLBACK_APOD;
let isCurrentApodLive = false;

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
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const res = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data = await res.json();

    currentApodData = data;
    isCurrentApodLive = true;
    renderApod(data, true);
  } catch (err) {
    console.warn("NASA APOD en vivo no disponible o con límite de tasa; cargando telemetría de respaldo.", err);
    currentApodData = FALLBACK_APOD;
    isCurrentApodLive = false;
    renderApod(FALLBACK_APOD, false);
  }
}

function renderApod(data, isLive) {
  const visualWrap = document.getElementById("apod-visual");
  const titleEl = document.getElementById("apod-title");
  const dateEl = document.getElementById("apod-date");
  const descEl = document.getElementById("apod-desc");
  const statusBadge = document.getElementById("apod-status-badge");
  const btnShare = document.getElementById("btn-apod-share");

  const isEn = typeof I18N !== "undefined" && I18N.getLang() === "en";

  if (statusBadge) {
    if (isLive) {
      statusBadge.textContent = isEn ? "● LIVE APOD (NASA API)" : "● APOD EN VIVO (NASA API)";
    } else {
      statusBadge.textContent = isEn ? "📡 APOD (NASA TELEMETRY)" : "📡 APOD (TELEMETRÍA NASA)";
    }
    statusBadge.style.borderColor = isLive ? "var(--status-ok)" : "var(--sector-accent)";
    statusBadge.style.color = isLive ? "var(--status-ok)" : "var(--sector-accent)";
  }

  const titleStr = _loc(data.title) || (isEn ? "Astronomy Picture of the Day" : "Fotografía Astronómica del Día");
  const dateStr = _loc(data.date) || "2026";
  const creditsStr = _loc(data.copyright) || "NASA Archive";
  const descStr = _loc(data.explanation) || "";

  if (titleEl) titleEl.textContent = titleStr;
  if (dateEl) {
    dateEl.textContent = isEn
      ? `DATE: ${dateStr} // CREDITS: ${creditsStr}`
      : `FECHA: ${dateStr} // CRÉDITOS: ${creditsStr}`;
  }
  if (descEl) descEl.textContent = descStr;

  if (visualWrap) {
    visualWrap.innerHTML = "";
    if (data.media_type === "video") {
      const iframe = document.createElement("iframe");
      iframe.src = data.url;
      iframe.allowFullscreen = true;
      visualWrap.appendChild(iframe);
    } else {
      const img = document.createElement("img");
      const fallbackUrl = typeof FALLBACK_APOD.url === "string" ? FALLBACK_APOD.url : "https://images-assets.nasa.gov/image/carina_nebula/carina_nebula~medium.jpg";
      img.src = data.url || data.hdurl || fallbackUrl;
      img.alt = titleStr;
      img.loading = "lazy";
      img.onerror = () => {
        img.onerror = null;
        img.src = fallbackUrl;
      };
      visualWrap.appendChild(img);
    }

    const badge = document.createElement("span");
    badge.className = "apod-badge";
    badge.textContent = isEn ? "NASA ASTRONOMY PICTURE OF THE DAY" : "FOTOGRAFÍA ASTRONÓMICA DEL DÍA NASA";
    visualWrap.appendChild(badge);
  }

  if (btnShare) {
    const shareSpan = btnShare.querySelector("span") || btnShare;
    shareSpan.textContent = isEn ? "💬 SHARE IN FORUM" : "💬 COMPARTIR EN EL FORO";
    btnShare.onclick = () => {
      quoteInForum({
        tag: isEn ? "NASA EVENTS" : "EVENTOS NASA",
        title: (isEn ? "APOD Discussion: " : "Debate sobre APOD: ") + titleStr,
        content: (isEn ? "Sharing NASA's Astronomy Picture of the Day:\n\n" : "Comparto la Imagen Astronómica del Día de la NASA:\n\n") +
                 `"${descStr ? descStr.slice(0, 220) + "..." : ""}"\n\n` +
                 (isEn ? "What do you think, crew?" : "¿Qué opinan exploradores?")
      });
    };
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
        showToast(t("toastChannelTuning", { channel: chip.textContent.trim() }));
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
      showToast(t("toastSatTuning"));
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
        currentMissionsList = [...FALLBACK_MISSIONS];
      } else {
        currentMissionsList = liveMissions;
      }

      applyMissionFilters();
      if (!silent) showToast(t("toastNasaSuccess"));
    }
  } catch (err) {
    console.warn("Fallo al obtener misiones en vivo de images-api.nasa.gov:", err);
    if (!silent) showToast(t("toastLocalArchive"));
  }
}

function categorizeNasaItem(data) {
  const text = `${data.title || ""} ${data.description || ""} ${(data.keywords || []).join(" ")}`.toLowerCase();
  if (text.includes("mars") || text.includes("perseverance") || text.includes("curiosity") || text.includes("ingenuity")) return "marte";
  if (text.includes("webb") || text.includes("jwst") || text.includes("hubble") || text.includes("galaxy") || text.includes("nebula")) return "jwst";
  if (text.includes("voyager") || text.includes("clipper") || text.includes("jupiter") || text.includes("saturn")) return "voyager";
  if (text.includes("iss") || text.includes("station") || text.includes("astronaut") || text.includes("eva")) return "iss";
  return "artemis";
}

function getCategoryLabel(category, customLabel) {
  const isEn = typeof I18N !== "undefined" && I18N.getLang() === "en";
  if (customLabel) {
    if (typeof customLabel === "object") return _loc(customLabel);
    if (String(customLabel).includes("INGENUITY")) return isEn ? "MARS INGENUITY" : "MARTE INGENUITY";
  }
  switch (category) {
    case "artemis": return isEn ? "ARTEMIS & MOON" : "ARTEMIS & LUNA";
    case "marte": return isEn ? "MARS ROVER" : "MARTE ROVER";
    case "jwst": return isEn ? "WEBB TELESCOPE" : "TELESCOPIO WEBB";
    case "voyager": return isEn ? "DEEP SPACE" : "ESPACIO PROFUNDO";
    case "iss": return isEn ? "ISS / ORBITAL" : "EEI / ORBITAL";
    default: return isEn ? "NASA MISSION" : "MISIÓN NASA";
  }
}

function applyMissionFilters() {
  const filtered = currentMissionsList.filter((m) => {
    const matchesCategory = currentCategoryFilter === "all" || m.category === currentCategoryFilter;
    const titleStr = _loc(m.title).toLowerCase();
    const summaryStr = _loc(m.summary).toLowerCase();
    const matchesSearch =
      !currentSearchTerm ||
      titleStr.includes(currentSearchTerm) ||
      summaryStr.includes(currentSearchTerm) ||
      (m.keywords && m.keywords.some((k) => k.toLowerCase().includes(currentSearchTerm)));
    return matchesCategory && matchesSearch;
  });

  renderMissionsGrid(filtered);
}

function renderMissionsGrid(missions) {
  const grid = document.getElementById("nasa-missions-grid");
  if (!grid) return;

  const btnDetailText = t("viewTelemetry");
  const btnQuoteText  = t("quoteInForumBtn");
  const noTitle = t("noMissionsFound");
  const noSub   = t("noMissionsSub");

  if (missions.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--panel-bg); border-radius: 14px; border: 1px dashed var(--panel-border);">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 0.8rem;">📡</span>
        <h3 style="font-family: var(--font-display); color: var(--orange-amber);">${escapeHtml(noTitle)}</h3>
        <p style="color: var(--text-muted); margin-top: 0.4rem;">${escapeHtml(noSub)}</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = missions
    .map((m, idx) => {
      const fallbackSrc = m.fallbackImg || getCategoryFallback(m.category);
      const mTitle = _loc(m.title);
      const mDate = _loc(m.date) || "NASA LOG";
      const mSummary = _loc(m.summary);
      const mTag = getCategoryLabel(m.category, m.categoryLabel);
      return `
    <article class="nasa-mission-card" data-idx="${idx}">
      <div class="nasa-card-img-wrap" onclick="openTelemetryModal(${idx})">
        <img 
          src="${m.img}" 
          alt="${escapeHtml(mTitle)}" 
          loading="lazy" 
          onerror="this.onerror=null; this.src='${fallbackSrc}';" 
        />
        <span class="nasa-card-tag">${escapeHtml(mTag)}</span>
      </div>
      <div class="nasa-card-body">
        <span class="nasa-card-date">${escapeHtml(mDate)}</span>
        <h3 class="nasa-card-title">${escapeHtml(mTitle)}</h3>
        <p class="nasa-card-text">${escapeHtml(mSummary)}</p>
        <div class="nasa-card-footer">
          <button type="button" class="btn-detail" onclick="openTelemetryModal(${idx})">${escapeHtml(btnDetailText)}</button>
          <button type="button" class="btn-quote-forum" onclick="quoteMissionToForum(${idx})">${escapeHtml(btnQuoteText)}</button>
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

  const isEn = typeof I18N !== "undefined" && I18N.getLang() === "en";

  if (title) title.textContent = _loc(m.title);
  if (date) {
    const datePrefix = isEn ? "DATE / CENTER:" : "FECHA / CENTRO:";
    date.textContent = `${datePrefix} ${_loc(m.date)} // ID: ${m.nasa_id || "N/A"}`;
  }
  if (category) category.textContent = getCategoryLabel(m.category, m.categoryLabel);
  if (img) {
    img.src = m.img;
    img.onerror = () => {
      img.onerror = null;
      img.src = m.fallbackImg || getCategoryFallback(m.category);
    };
  }
  if (text) text.textContent = _loc(m.fullText) || _loc(m.summary);

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

  const isEn = typeof I18N !== "undefined" && I18N.getLang() === "en";
  quoteInForum({
    tag: isEn ? "MISSIONS & ROVERS" : "MISIONES & ROVERS",
    title: (isEn ? "NASA Telemetry: " : "Telemetría NASA: ") + _loc(m.title),
    content: (isEn ? "Reviewing NASA telemetry logs:\n\n" : "Revisando los registros de telemetría de la NASA:\n\n") +
             `"${_loc(m.summary)}"\n\n` +
             (isEn ? "What implications does this mission have for the future of space exploration?" : "¿Qué implicaciones tiene esta misión para el futuro de la exploración espacial?")
  });
};

// =========================================================
// 5. FORO DE EXPLORADORES (TRANSMISIONES DE LA COMUNIDAD)
// =========================================================
function initForum() {
  const stored = localStorage.getItem("lost_signal_forum_posts");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Plan B: Descartar publicaciones simuladas previas (post_1 a post_4) y conservar solo las del usuario si existen
      forumPosts = Array.isArray(parsed)
        ? parsed.filter((p) => p && !["post_1", "post_2", "post_3", "post_4"].includes(p.id))
        : [];
    } catch {
      forumPosts = [];
    }
  } else {
    forumPosts = [];
  }
  saveForumPosts();

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

      const isEn = typeof I18N !== "undefined" && I18N.getLang() === "en";
      const author = document.getElementById("post-author-input").value.trim();
      const role = document.getElementById("post-role-input").value.trim() || (isEn ? "ORBITAL EXPLORER" : "EXPLORADOR ORBITAL");
      const tag = document.getElementById("post-tag-input").value;
      const title = document.getElementById("post-title-input").value.trim();
      const content = document.getElementById("post-content-input").value.trim();
      const avatar = avatarInput?.value || "🚀";

      if (!author || !title || !content) {
        showToast(t("toastFillFields"));
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
        date: isEn ? "Just now" : "Hace unos instantes",
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
      showToast(t("toastSuccessTransmit"));
    });
  }

  // Filtros del Foro
  const forumFilterChips = document.querySelectorAll(".forum-filter-bar .filter-chip");
  forumFilterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      forumFilterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      currentForumFilter = chip.dataset.tag || "all";
      renderForumThreads(currentForumFilter);
    });
  });

  renderForumThreads(currentForumFilter);
  updateForumStats();
}

function saveForumPosts() {
  localStorage.setItem("lost_signal_forum_posts", JSON.stringify(forumPosts));
}

function renderForumThreads(filterTag = currentForumFilter) {
  const listContainer = document.getElementById("forum-threads-list");
  if (!listContainer) return;

  const isEn = typeof I18N !== "undefined" && I18N.getLang() === "en";
  const tunedText = isEn ? "Tuned" : "Sintonizado";
  const tuneText = isEn ? "Tune in" : "Sintonizar";
  const repliesText = isEn ? "Replies" : "Respuestas";
  const replyActionText = isEn ? "✍️ Reply" : "✍️ Responder";
  const transmitBtnText = isEn ? "BROADCAST" : "TRANSMITIR";

  const filtered = forumPosts.filter((p) => {
    if (filterTag === "all") return true;
    const tagStr = _loc(p.tag).toLowerCase();
    return tagStr.includes(filterTag.toLowerCase());
  });

  if (filtered.length === 0) {
    const noTrans = t("noTransmissions");
    const noTransSub = t("noTransmissionsSub");
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 2.5rem; background: var(--panel-bg); border-radius: 14px; border: 1px dashed var(--panel-border);">
        <span style="font-size: 2.2rem; display: block; margin-bottom: 0.6rem;">🛰️</span>
        <h3 style="font-family: var(--font-display); color: var(--purple-bright);">${escapeHtml(noTrans)}</h3>
        <p style="color: var(--text-muted); margin-top: 0.4rem;">${escapeHtml(noTransSub)}</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = filtered
    .map((post) => {
      const repliesCount = post.replies ? post.replies.length : 0;
      const authorStr = _loc(post.author);
      const roleStr = _loc(post.roleBadge) || (isEn ? "EXPLORER" : "EXPLORADOR");
      const tagStr = _loc(post.tag);
      const dateStr = _loc(post.date);
      const titleStr = _loc(post.title);
      const contentStr = _loc(post.content);
      const placeholderText = isEn
        ? `Transmit reply to ${escapeHtml(authorStr)}'s frequency...`
        : `Escribe tu mensaje a la frecuencia de ${escapeHtml(authorStr)}...`;

      return `
      <article class="forum-thread-card" id="${post.id}">
        <div class="thread-header">
          <div class="author-meta">
            <div class="author-avatar">${post.avatar || "🚀"}</div>
            <div class="author-name-role">
              <span class="author-name">${escapeHtml(authorStr)}</span>
              <span class="author-badge">${escapeHtml(roleStr)}</span>
            </div>
          </div>
          <div class="thread-tag-date">
            <span class="thread-tag">${escapeHtml(tagStr)}</span>
            <span class="thread-date">${escapeHtml(dateStr)}</span>
          </div>
        </div>

        <h3 class="thread-title">${escapeHtml(titleStr)}</h3>
        <p class="thread-content">${escapeHtml(contentStr)}</p>

        <div class="thread-actions">
          <div class="action-btns-group">
            <button type="button" class="btn-tune ${post.userLiked ? "tuned" : ""}" onclick="toggleLikePost('${post.id}')">
              <span>${post.userLiked ? "❤️" : "🤍"}</span>
              <span>${post.userLiked ? tunedText : tuneText}</span>
              <strong style="margin-left: 2px;">(${post.likes || 0})</strong>
            </button>
            <button type="button" class="btn-replies-toggle" onclick="toggleRepliesSection('${post.id}')">
              <span>💬</span>
              <span>${repliesText}</span>
              <strong>(${repliesCount})</strong>
            </button>
          </div>
          <button type="button" class="btn-quote-forum" onclick="replyFocus('${post.id}')">
            ${replyActionText}
          </button>
        </div>

        <div class="thread-replies-container ${repliesCount > 0 ? "" : "hidden"}" id="replies-${post.id}">
          <div class="replies-list" id="replies-list-${post.id}">
            ${renderRepliesList(post.replies)}
          </div>
          <form class="reply-input-bar" onsubmit="handleSendReply(event, '${post.id}')">
            <input type="text" placeholder="${escapeHtml(placeholderText)}" required id="reply-text-${post.id}" />
            <button type="submit" class="btn-send-reply">${transmitBtnText}</button>
          </form>
        </div>
      </article>
    `;
    })
    .join("");
}

function renderRepliesList(replies = []) {
  if (!replies || replies.length === 0) return "";
  const isEn = typeof I18N !== "undefined" && I18N.getLang() === "en";
  return replies
    .map((r) => {
      const authorStr = _loc(r.author) || (isEn ? "Explorer" : "Explorador");
      const dateStr = _loc(r.date) || (isEn ? "Recent" : "Reciente");
      const textStr = _loc(r.text);
      return `
    <div class="reply-item">
      <div class="reply-header">
        <span class="reply-author">👨‍🚀 ${escapeHtml(authorStr)}</span>
        <span class="reply-date">${escapeHtml(dateStr)}</span>
      </div>
      <p style="color: var(--text-main);">${escapeHtml(textStr)}</p>
    </div>
  `;
    })
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
    showToast(t("toastTunedFreq"));
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

  const isEn = typeof I18N !== "undefined" && I18N.getLang() === "en";
  const authorName = document.getElementById("post-author-input")?.value.trim() || (isEn ? "Orbital_Cadet" : "Cadete_Orbital");

  post.replies.push({
    id: "rep_" + Date.now(),
    author: authorName,
    text: text,
    date: isEn ? "Just now" : "Hace un momento"
  });

  input.value = "";
  saveForumPosts();
  renderForumThreads();
  updateForumStats();
  showToast(t("toastReplySent"));
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

  showToast(t("toastTelemetryLoaded"));
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

window.addEventListener("languageChanged", () => {
  if (typeof I18N !== "undefined") I18N.applyLang();
  if (currentApodData) renderApod(currentApodData, isCurrentApodLive);
  applyMissionFilters();
  renderForumThreads(currentForumFilter);
  updateForumStats();
});
