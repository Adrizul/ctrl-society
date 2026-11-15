/**
 * CTRL SOCIETY – DATA LAYER (bilingual)
 * Each sector and object exposes:
 *   sector.t()  → returns the localized version of the sector fields
 *   obj.t()     → returns the localized version of the object fields
 * Uses window.I18N.getLang() when available, falls back to "es".
 */

function _lang() {
  return (typeof I18N !== "undefined" && I18N.getLang) ? I18N.getLang() : "es";
}

/* ─────────────────────────────────────────
   TEAM DATA
───────────────────────────────────────── */
const TEAM_DATA = [
  {
    name: "Ángel David Sánchez",
    role:         { es: "Arquitectura Web y Minijuegos",          en: "Web Architecture & Minigames" },
    contribution: { es: "Desarrollo de la plataforma interactiva, motor 2D de rescate y estructura modular.",
                    en: "Development of the interactive platform, 2D rescue engine and modular structure." }
  },
  {
    name: "Integrante 2",
    role:         { es: "Arte Visual y Hologramas",               en: "Visual Art & Holograms" },
    contribution: { es: "Diseño de interfaz espacial, selección de fotografías NASA y sprites.",
                    en: "Space interface design, NASA photograph selection and sprites." }
  },
  {
    name: "Integrante 3",
    role:         { es: "Producción Audiovisual",                 en: "Audiovisual Production" },
    contribution: { es: "Edición de videos de transición orbital y efectos de sonido.",
                    en: "Editing of orbital transition videos and sound effects." }
  },
  {
    name: "Integrante 4",
    role:         { es: "Investigación NASA y Guion",             en: "NASA Research & Scriptwriting" },
    contribution: { es: "Catalogación de los 15 objetos espaciales, fuentes NASA y narración.",
                    en: "Cataloging of the 15 space objects, NASA sources and narration." }
  },
  {
    name: "Integrante 5",
    role:         { es: "Documentación y Pitch",                  en: "Documentation & Pitch" },
    contribution: { es: "Enfoque educativo escolar, pruebas de usabilidad y presentación.",
                    en: "School educational focus, usability testing and presentation." }
  }
];

/* ─────────────────────────────────────────
   HELPER: get localized field
───────────────────────────────────────── */
function _loc(field) {
  if (field === null || field === undefined) return "";
  if (typeof field === "object") {
    const l = _lang();
    return field[l] !== undefined ? field[l] : (field.es || "");
  }
  return field;
}

/* ─────────────────────────────────────────
   SECTORS DATA
───────────────────────────────────────── */
const SECTORS_DATA = {
  luna: {
    code:        { es: "SECTOR 01 // SALA DE EXHIBICIÓN LUNAR",    en: "SECTOR 01 // LUNAR EXHIBITION HALL" },
    title:       { es: "LA LUNA",                                   en: "THE MOON" },
    tagline:     { es: "Nuestro satélite natural y primer mundo explorado por la humanidad",
                   en: "Our natural satellite and the first world explored by humanity" },
    coordinates: { es: "COORDENADAS: 00° 40' 26\" N, 23° 28' 22\" E",
                   en: "COORDINATES: 00° 40' 26\" N, 23° 28' 22\" E" },
    emoji:       "🌕",
    bannerImg:   "../Assets/Imagenes/Sectores/destino_luna.png",
    bgColors:    ["#171522", "#262335"],
    gallery: [
      { src: "../Assets/Imagenes/Sectores/destino_luna.png",
        caption: { es: "Cara visible de la Luna y mares basálticos",
                   en: "Visible face of the Moon and basaltic seas" } },
      { src: "../Assets/Imagenes/Objetos/obj_apollo_lm.jpg",
        caption: { es: "Módulo Lunar Eagle sobre la superficie lunar",
                   en: "Eagle Lunar Module on the lunar surface" } }
    ],
    generalText: {
      es: "La Luna es un santuario silencioso donde el tiempo se detuvo. Al ser el único mundo fuera de la Tierra que ha sentido pasos humanos y carecer de viento o lluvia, cada huella, cada rover eléctrico y cada nave que la NASA dejó atrás permanece intacta bajo las estrellas, guardando en silencio el eco de nuestra mayor aventura.",
      en: "The Moon is a silent sanctuary where time stood still. As the only world beyond Earth to have felt human footsteps, with no wind or rain, every footprint, every electric rover, and every spacecraft the NASA left behind remains untouched under the stars, silently preserving the echo of our greatest adventure."
    },
    highlights: [
      { title: { es: "Exploración previa",  en: "Prior exploration" },
        text:  { es: "Las sondas Surveyor comprobaron en los años 60 que el suelo soportaba naves.",
                 en: "Surveyor probes confirmed in the 1960s that the soil could support spacecraft." } },
      { title: { es: "Programa Apolo",      en: "Apollo Program" },
        text:  { es: "Entre 1969 y 1972 quedaron 6 etapas de descenso y 3 vehículos eléctricos.",
                 en: "Between 1969 and 1972, 6 descent stages and 3 electric vehicles were left behind." } },
      { title: { es: "Ciencia continua",    en: "Ongoing science" },
        text:  { es: "Los paquetes ALSEP y reflectores láser enviaron datos durante años.",
                 en: "ALSEP packages and laser reflectors sent data for years." } }
    ],
    techIntro: {
      es: "Parámetros físicos y ambientales registrados por las estaciones científicas ALSEP desplegadas en la superficie lunar:",
      en: "Physical and environmental parameters recorded by the ALSEP scientific stations deployed on the lunar surface:"
    },
    techSpecs: [
      { label: { es: "Distancia media a la Tierra",  en: "Mean distance to Earth" },        value: "384,400 km (1.28 s light)" },
      { label: { es: "Gravedad superficial",          en: "Surface gravity" },               value: "1.62 m/s² (16.6% of Earth)" },
      { label: { es: "Rango térmico",                 en: "Thermal range" },                 value: "-173 °C (night) / +127 °C (day)" },
      { label: { es: "Atmósfera",                     en: "Atmosphere" },                    value: "Ultra-thin exosphere (~10⁻¹² torr)" },
      { label: { es: "Suelo superficial",             en: "Surface soil" },                  value: "Basaltic regolith w/ silicates & iron" },
      { label: { es: "Piezas catalogadas",            en: "Catalogued pieces" },             value: "4" }
    ],
    objects: [
      {
        id:        "luna_apollo_lm",
        code:      { es: "PIEZA 01 // PROGRAMA APOLO",         en: "PIECE 01 // APOLLO PROGRAM" },
        name:      { es: "Módulos Lunares Apolo",              en: "Apollo Lunar Modules" },
        year:      { es: "1969 – 1972 • Superficie Lunar",     en: "1969 – 1972 • Lunar Surface" },
        emoji:     "🚀",
        img:       "../Assets/Imagenes/Objetos/obj_apollo_lm.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_apollo_lm.jpg",
        video:     "../assets/video/intro_luna_apollo.mp4",
        audio:     "../assets/audio/audio_luna_apollo.mp3",
        source:    "NASA Science - Apollo Lunar Module",
        shortDesc: { es: "Bases con patas de aterrizaje que sirvieron como plataforma de despegue para el regreso a casa.",
                     en: "Landing leg bases that served as launch platforms for the return home." },
        story:     { es: "Fui el hogar que protegió a los primeros humanos en pisar otro mundo. Cuando su misión terminó y debían volver a casa, encendieron mis motores superiores y se elevaron hacia la Tierra. Yo me quedé aquí, con mis patas firmes sobre el polvo gris, viendo cómo se alejaban. No fue un abandono, fue mi propósito: ser la plataforma que los impulsó de regreso.",
                     en: "I was the shelter that protected the first humans to set foot on another world. When their mission ended and they had to return home, they fired my ascent engines and rose toward Earth. I remained here, my legs firm on the grey dust, watching them disappear. It wasn't abandonment — it was my purpose: to be the launchpad that sent them home." }
      },
      {
        id:        "luna_lrv",
        code:      { es: "PIEZA 02 // APOLO 15, 16 Y 17",      en: "PIECE 02 // APOLLO 15, 16 & 17" },
        name:      { es: "Rovers Lunares (LRVs)",               en: "Lunar Roving Vehicles (LRVs)" },
        year:      { es: "1971 – 1972 • Valles y Tierras Altas", en: "1971 – 1972 • Valleys & Highlands" },
        emoji:     "🚙",
        img:       "../Assets/Imagenes/Objetos/obj_lrv.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_lrv.jpg",
        video:     "../assets/video/intro_luna_lrv.mp4",
        audio:     "../assets/audio/audio_luna_lrv.mp3",
        source:    "NASA Solar System Exploration - Lunar Roving Vehicle",
        shortDesc: { es: "Buggies espaciales eléctricos con baterías que permitieron recorrer grandes distancias y cargar rocas.",
                     en: "Electric space buggies that let astronauts travel long distances and collect rock samples." },
        story:     { es: "Fui diseñado para ser los pies incansables de los astronautas de Apolo 15, 16 y 17. Con mis baterías cargadas, los llevé más lejos que nunca entre cráteres y montañas, cargando rocas milenarias y sus voces por la radio. Cuando agotamos la última carga, me estacionaron mirando hacia el horizonte lunar. Aquí sigo, esperando en silencio que algún día vuelvan a encender mis ruedas.",
                     en: "I was designed to be the tireless feet of the Apollo 15, 16 and 17 astronauts. With my batteries charged, I carried them farther than ever — through craters and mountains, hauling ancient rocks and their voices over the radio. When the last charge ran out, they parked me facing the lunar horizon. I'm still here, waiting in silence for the day someone turns my wheels again." }
      },
      {
        id:        "luna_alsep",
        code:      { es: "PIEZA 03 // ESTACIÓN CIENTÍFICA",    en: "PIECE 03 // SCIENTIFIC STATION" },
        name:      { es: "Paquetes Científicos ALSEP",          en: "ALSEP Scientific Packages" },
        year:      { es: "1969 – 1977 • Red Sísmica Lunar",    en: "1969 – 1977 • Lunar Seismic Network" },
        emoji:     "📡",
        img:       "../Assets/Imagenes/Objetos/obj_alsep.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_alsep.jpg",
        video:     "../assets/video/intro_luna_alsep.mp4",
        audio:     "../assets/audio/audio_luna_alsep.mp3",
        source:    "NASA Science - ALSEP Overview",
        shortDesc: { es: "Sismómetros de lunamotos, detectores de partículas y espejos reflectores con energía nuclear.",
                     en: "Moonquake seismometers, particle detectors and laser reflectors powered by nuclear energy." },
        story:     { es: "Mientras los astronautas regresaban a casa, yo me quedé de guardia en la oscuridad lunar. Alimentado por mi propio corazón nuclear, pasé años enteros escuchando los latidos internos de la Luna, midiendo lunamotos y reflejando rayos láser enviados desde la Tierra. Mi señal se apagó hace décadas, pero mis instrumentos siguen aquí, como testigos mudos de la ciencia.",
                     en: "While the astronauts returned home, I stayed on watch in the lunar darkness. Powered by my own nuclear heart, I spent years listening to the Moon's inner heartbeat, measuring moonquakes and reflecting laser beams sent from Earth. My signal faded decades ago, but my instruments remain here — silent witnesses to science." }
      },
      {
        id:        "luna_surveyor",
        code:      { es: "PIEZA 04 // EXPLORACIÓN ROBÓTICA",    en: "PIECE 04 // ROBOTIC EXPLORATION" },
        name:      { es: "Sondas Surveyor",                     en: "Surveyor Probes" },
        year:      { es: "1966 – 1968 • Misiones Pre-Apolo",   en: "1966 – 1968 • Pre-Apollo Missions" },
        emoji:     "🛰️",
        img:       "../Assets/Imagenes/Objetos/obj_surveyor.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_surveyor.jpg",
        video:     "../assets/video/intro_luna_surveyor.mp4",
        audio:     "../assets/audio/audio_luna_surveyor.mp3",
        source:    "NASA History - Surveyor Program",
        shortDesc: { es: "Sondas de los años 60 que demostraron que el suelo lunar era sólido y no polvo profundo.",
                     en: "1960s probes that proved the lunar soil was solid, not deep dust." },
        story:     { es: "Antes de que ningún humano se atreviera a bajar, me enviaron a dar el primer salto a ciegas en los años sesenta. Muchos temían que me hundiera en un océano de polvo profundo, pero mis patas tocaron suelo firme. Envié miles de fotografías para abrirles el camino a los astronautas del Apolo, y aquí me quedé, vigilando el terreno que ayudé a conquistar.",
                     en: "Before any human dared to land, they sent me to take the first blind leap in the 1960s. Many feared I would sink into a deep ocean of dust, but my legs touched solid ground. I sent thousands of photographs to pave the way for the Apollo astronauts, and here I stayed — watching over the terrain I helped conquer." }
      }
    ]
  },

  marte: {
    code:        { es: "SECTOR 02 // SALA DE EXHIBICIÓN MARCIANA",  en: "SECTOR 02 // MARTIAN EXHIBITION HALL" },
    title:       { es: "MARTE",                                      en: "MARS" },
    tagline:     { es: "El planeta rojo explorado por rovers, landers y la primera aeronave extraterrestre",
                   en: "The red planet explored by rovers, landers and the first extraterrestrial aircraft" },
    coordinates: { es: "COORDENADAS: 18° 26' 41\" N, 77° 35' 03\" E (Jezero)",
                   en: "COORDINATES: 18° 26' 41\" N, 77° 35' 03\" E (Jezero)" },
    emoji:       "🔴",
    bannerImg:   "../Assets/Imagenes/Sectores/destino_marte.png",
    bgColors:    ["#291112", "#471b16"],
    gallery: [
      { src: "../Assets/Imagenes/Sectores/destino_marte.png",
        caption: { es: "Vista orbital del planeta Marte",                    en: "Orbital view of planet Mars" } },
      { src: "../Assets/Imagenes/Objetos/obj_ingenuity.jpg",
        caption: { es: "Helicóptero Ingenuity en la superficie marciana",    en: "Ingenuity helicopter on the Martian surface" } }
    ],
    generalText: {
      es: "Marte es un desierto helado y solitario donde el viento rojo borra las huellas, pero jamás las hazañas. Desde los primeros aterrizadores Viking en 1976 hasta rovers que desafiaron su propio destino durante años y el primer helicóptero extraterrestre, este planeta guarda los monumentos robóticos de máquinas valientes que dieron su última gota de energía para revelarnos los secretos de un mundo antiguo.",
      en: "Mars is a cold and lonely desert where the red wind erases footprints, but never achievements. From the first Viking landers in 1976 to rovers that defied their own fate for years, and the first extraterrestrial helicopter, this planet holds the robotic monuments of brave machines that gave their last drop of energy to reveal the secrets of an ancient world."
    },
    highlights: [
      { title: { es: "Pioneros fijos",        en: "Stationary pioneers" },
        text:  { es: "Viking, Phoenix e InSight analizaron el suelo, hielo y martemotos desde un punto fijo.",
                 en: "Viking, Phoenix and InSight analyzed soil, ice and marsquakes from a fixed position." } },
      { title: { es: "Rovers incansables",    en: "Tireless rovers" },
        text:  { es: "Sojourner, Spirit y Opportunity superaron por años su tiempo de vida planeado.",
                 en: "Sojourner, Spirit and Opportunity outlived their planned mission duration by years." } },
      { title: { es: "Primer vuelo",          en: "First flight" },
        text:  { es: "Ingenuity logró volar decenas de veces en la tenue atmósfera marciana.",
                 en: "Ingenuity managed to fly dozens of times in the thin Martian atmosphere." } }
    ],
    techIntro: {
      es: "Condiciones ambientales y telemetría registradas en superficie por las misiones marcianas de la NASA:",
      en: "Environmental conditions and telemetry recorded on the surface by NASA's Mars missions:"
    },
    techSpecs: [
      { label: { es: "Distancia media a la Tierra",  en: "Mean distance to Earth" },        value: "225 million km (3–22 min light)" },
      { label: { es: "Gravedad superficial",          en: "Surface gravity" },               value: "3.72 m/s² (38% of Earth)" },
      { label: { es: "Duración del día (Sol)",        en: "Day length (Sol)" },              value: "24 h 39 min 35 s" },
      { label: { es: "Atmósfera",                     en: "Atmosphere" },                    value: "95.3% CO₂, 2.7% N₂, 1.6% Ar" },
      { label: { es: "Presión superficial",           en: "Surface pressure" },              value: "6.1 mbar (<1% of Earth)" },
      { label: { es: "Piezas catalogadas",            en: "Catalogued pieces" },             value: "5" }
    ],
    objects: [
      {
        id:        "marte_sojourner",
        code:      { es: "PIEZA 01 // PATHFINDER (1997)",          en: "PIECE 01 // PATHFINDER (1997)" },
        name:      { es: "Rover Sojourner",                        en: "Sojourner Rover" },
        year:      { es: "1997 • Ares Vallis (Roca Yogi)",         en: "1997 • Ares Vallis (Yogi Rock)" },
        emoji:     "📟",
        img:       "../Assets/Imagenes/Objetos/obj_sojourner.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_sojourner.jpg",
        video:     "../assets/video/intro_marte_sojourner.mp4",
        audio:     "../assets/audio/audio_marte_sojourner.mp3",
        source:    "NASA Mars Exploration - Pathfinder & Sojourner",
        shortDesc: { es: "El abuelo de los rovers marcianos, del tamaño de un microondas con ruedas y energía solar.",
                     en: "The grandfather of Mars rovers, microwave-sized with wheels and solar power." },
        story:     { es: "Era apenas del tamaño de un horno de microondas, pero fui el primero en rodar sobre otro planeta. Llegué en 1997 junto a la misión Pathfinder y exploré rocas marcianas con la curiosidad de un niño. Cuando mi estación base perdió comunicación con la Tierra, seguí dando vueltas alrededor de ella buscando una señal que nunca volvió, hasta quedarme dormido junto a la roca Yogi.",
                     en: "I was barely the size of a microwave oven, but I was the first to roll across another planet. I arrived in 1997 with the Pathfinder mission and explored Martian rocks with the curiosity of a child. When my base station lost contact with Earth, I kept circling it searching for a signal that never came, until I fell asleep beside Yogi Rock." }
      },
      {
        id:        "marte_spirit_opportunity",
        code:      { es: "PIEZA 02 // MISIÓN MER (2004)",          en: "PIECE 02 // MER MISSION (2004)" },
        name:      { es: "Rovers Spirit y Opportunity",            en: "Spirit & Opportunity Rovers" },
        year:      { es: "2004 – 2018 • Cráteres Gusev y Endeavour", en: "2004 – 2018 • Gusev & Endeavour Craters" },
        emoji:     "🤖",
        img:       "../Assets/Imagenes/Objetos/obj_spirity.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_spirity.jpg",
        video:     "../assets/video/intro_marte_opportunity.mp4",
        audio:     "../assets/audio/audio_marte_opportunity.mp3",
        source:    "NASA Mars Exploration - Spirit and Opportunity",
        shortDesc: { es: "Dos robots gemelos planeados para 90 días que exploraron Marte durante 6 y casi 15 años.",
                     en: "Twin robots planned for 90 days that explored Mars for 6 and nearly 15 years." },
        story:     { es: "Nos diseñaron para sobrevivir apenas noventa días marcianos, pero nos negamos a rendirnos. Mi hermano Spirit exploró durante seis años, y yo, Opportunity, recorrí Marte por casi quince años, superando tormentas y terrenos imposibles. Cuando una tormenta global cubrió el cielo y agotó mis baterías, envié mi último susurro a casa: mi batería está baja y está oscureciendo.",
                     en: "They designed us to survive just ninety Martian days, but we refused to give up. My brother Spirit explored for six years, and I, Opportunity, roamed Mars for nearly fifteen years, overcoming storms and impossible terrain. When a global dust storm blanketed the sky and drained my batteries, I sent my last whisper home: my battery is low and it's getting dark." }
      },
      {
        id:        "marte_viking",
        code:      { es: "PIEZA 03 // PROGRAMA VIKING (1976)",     en: "PIECE 03 // VIKING PROGRAM (1976)" },
        name:      { es: "Landers Viking 1 y 2",                   en: "Viking 1 & 2 Landers" },
        year:      { es: "1976 • Chryse y Utopia Planitia",        en: "1976 • Chryse & Utopia Planitia" },
        emoji:     "📷",
        img:       "../Assets/Imagenes/Objetos/obj_viking.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_viking.jpg",
        video:     "../assets/video/intro_marte_viking.mp4",
        audio:     "../assets/audio/audio_marte_viking.mp3",
        source:    "NASA Science - Viking Program",
        shortDesc: { es: "Primeras naves de EE. UU. en aterrizar con éxito en Marte con cámaras panorámicas y brazo robótico.",
                     en: "First U.S. spacecraft to successfully land on Mars, with panoramic cameras and a robotic arm." },
        story:     { es: "En 1976 nos convertimos en los primeros ojos y manos de la humanidad sobre la superficie de Marte. No teníamos ruedas para viajar, así que echamos raíces en el suelo rojizo. Con nuestro brazo robótico excavamos la tierra buscando rastros de vida y enviamos las primeras postales panorámicas de un amanecer marciano, mucho antes de que los rovers existieran.",
                     en: "In 1976 we became humanity's first eyes and hands on the surface of Mars. We had no wheels to travel, so we put down roots in the red soil. With our robotic arm we dug the ground searching for signs of life and sent the first panoramic postcards of a Martian sunrise — long before rovers existed." }
      },
      {
        id:        "marte_phoenix_insight",
        code:      { es: "PIEZA 04 // ESTACIONES FIJAS",           en: "PIECE 04 // FIXED STATIONS" },
        name:      { es: "Landers Phoenix e InSight",              en: "Phoenix & InSight Landers" },
        year:      { es: "2008 – 2022 • Polo Norte y Elysium",    en: "2008 – 2022 • North Pole & Elysium" },
        emoji:     "🌋",
        img:       "../Assets/Imagenes/Objetos/obj_insight.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_insight.jpg",
        video:     "../assets/video/intro_marte_insight.mp4",
        audio:     "../assets/audio/audio_marte_insight.mp3",
        source:    "NASA Mars Exploration - Phoenix & InSight",
        shortDesc: { es: "Phoenix cavó buscando hielo de agua e InSight escuchó 'martemotos' para estudiar el interior.",
                     en: "Phoenix dug for water ice and InSight listened for 'marsquakes' to study the interior." },
        story:     { es: "Cada uno cumplió una misión única sin moverse de su sitio. Yo, Phoenix, excavé en el polo norte marciano hasta tocar hielo de agua real bajo el polvo. Y yo, InSight, apoyé mi oído sísmico sobre el suelo para escuchar los latidos profundos de los martemotos. El polvo cubrió nuestros paneles poco a poco, hasta sumirnos en un descanso eterno.",
                     en: "Each of us fulfilled a unique mission without moving from our spot. I, Phoenix, dug at the Martian north pole until I touched real water ice beneath the dust. And I, InSight, pressed my seismic ear to the ground to listen to the deep heartbeat of marsquakes. Dust slowly covered our panels until we sank into eternal rest." }
      },
      {
        id:        "marte_ingenuity",
        code:      { es: "PIEZA 05 // MARS HELICOPTER",            en: "PIECE 05 // MARS HELICOPTER" },
        name:      { es: "Helicóptero Ingenuity",                  en: "Ingenuity Helicopter" },
        year:      { es: "2021 – 2024 • Cráter Jezero",           en: "2021 – 2024 • Jezero Crater" },
        emoji:     "🚁",
        img:       "../Assets/Imagenes/Objetos/obj_ingenuity.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_ingenuity.jpg",
        video:     "../assets/video/intro_marte_ingenuity.mp4",
        audio:     "../assets/audio/audio_marte_ingenuity.mp3",
        source:    "NASA JPL - Ingenuity Mars Helicopter",
        shortDesc: { es: "Primera aeronave propulsada en volar en otro planeta; realizó decenas de vuelos antes de retirarse.",
                     en: "First powered aircraft to fly on another planet; completed dozens of flights before retiring." },
        story:     { es: "Todos decían que era imposible volar en una atmósfera tan delgada como la de Marte, pero logré despegar. Me convertí en la primera aeronave en conquistar los cielos de otro mundo, volando setenta y dos veces como explorador aéreo. En mi último aterrizaje una de mis aspas se dañó, pero ya había demostrado que el cielo marciano también nos pertenece.",
                     en: "Everyone said it was impossible to fly in an atmosphere as thin as Mars's, but I managed to take off. I became the first aircraft to conquer the skies of another world, flying seventy-two times as an aerial explorer. On my final landing one of my blades was damaged — but I had already proven that the Martian sky belongs to us too." }
      }
    ]
  },

  espacio: {
    code:        { es: "SECTOR 03 // SALA DE EXHIBICIÓN ORBITAL",  en: "SECTOR 03 // ORBITAL EXHIBITION HALL" },
    title:       { es: "ESPACIO PROFUNDO",                          en: "DEEP SPACE" },
    tagline:     { es: "Objetos y herramientas perdidas durante caminatas espaciales en órbita terrestre",
                   en: "Objects and tools lost during spacewalks in Earth orbit" },
    coordinates: { es: "ÓRBITA TERRESTRE BAJA // ALTITUD ~400 KM (EEI / GEMINI / STS)",
                   en: "LOW EARTH ORBIT // ALTITUDE ~400 KM (ISS / GEMINI / STS)" },
    emoji:       "🛰️",
    bannerImg:   "../Assets/Imagenes/Sectores/destino_espacio.png",
    bgColors:    ["#120929", "#241142"],
    gallery: [
      { src: "../Assets/Imagenes/Sectores/destino_espacio.png",
        caption: { es: "Vista orbital del entorno espacial y nebulosas", en: "Orbital view of the space environment and nebulae" } }
    ],
    generalText: {
      es: "En el vacío silencioso de la órbita terrestre no existe el suelo donde caen las cosas: cualquier objeto que se suelta inicia un viaje eterno a más de veintisiete mil kilómetros por hora alrededor del planeta. Desde los audaces paseos espaciales de los años sesenta hasta las reparaciones en la Estación Espacial Internacional, estas piezas escaparon de las manos de los astronautas para convertirse en viajeros solitarios entre las estrellas.",
      en: "In the silent void of Earth's orbit there is no ground for things to fall on: any object that slips away begins an eternal journey at over twenty-seven thousand kilometers per hour around the planet. From the bold spacewalks of the 1960s to repairs aboard the International Space Station, these pieces escaped astronauts' hands to become solitary travelers among the stars."
    },
    highlights: [
      { title: { es: "Era Gemini (1965–1966)",     en: "Gemini Era (1965–1966)" },
        text:  { es: "Los primeros paseos espaciales dejaron un guante y una cámara Hasselblad en órbita.",
                 en: "The first spacewalks left a glove and a Hasselblad camera in orbit." } },
      { title: { es: "Transbordadores STS",         en: "STS Shuttles" },
        text:  { es: "Misiones de reparación perdieron una espátula y unas pinzas de punta en plena maniobra.",
                 en: "Repair missions lost a spatula and needle-nose pliers mid-maneuver." } },
      { title: { es: "Estación Espacial (EEI)",     en: "Space Station (ISS)" },
        text:  { es: "Una bolsa de herramientas y un escudo térmico se desprendieron durante caminatas.",
                 en: "A tool bag and a thermal shield broke free during spacewalks." } }
    ],
    techIntro: {
      es: "Condiciones orbitales en las que ocurrieron los extravíos durante actividades extravehiculares (EVA):",
      en: "Orbital conditions under which the losses occurred during extravehicular activities (EVA):"
    },
    techSpecs: [
      { label: { es: "Velocidad orbital (LEO)",      en: "Orbital speed (LEO)" },            value: "~27,600 km/h (7.66 km/s)" },
      { label: { es: "Altitud típica (EEI)",         en: "Typical altitude (ISS)" },          value: "400 – 420 km above Earth" },
      { label: { es: "Período orbital",              en: "Orbital period" },                  value: "~92 min per orbit" },
      { label: { es: "Gravedad aparente",            en: "Apparent gravity" },                value: "Microgravity (continuous free-fall)" },
      { label: { es: "Rango térmico orbital",        en: "Orbital thermal range" },           value: "-120 °C (shadow) / +120 °C (sun)" },
      { label: { es: "Piezas catalogadas",           en: "Catalogued pieces" },               value: "6" }
    ],
    objects: [
      {
        id:        "espacio_guante_gemini4",
        code:      { es: "PIEZA 01 // GEMINI 4 (1965)",            en: "PIECE 01 // GEMINI 4 (1965)" },
        name:      { es: "Guante Espacial",                        en: "Space Glove" },
        year:      { es: "1965 • Caminata Espacial Gemini 4",     en: "1965 • Gemini 4 Spacewalk" },
        emoji:     "🧤",
        img:       "../Assets/Imagenes/Objetos/obj_guante_gemini4.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_guante_gemini4.jpg",
        video:     "../Assets/Video/intro_espacio_guante.mp4",
        audio:     "../Assets/Audio/guante_gemini4.mp3",
        source:    "NASA History - Gemini IV EVA",
        shortDesc: { es: "Guante de repuesto que salió de la nave en 1965 y quedó flotando alrededor de la Tierra.",
                     en: "A spare glove that slipped out of the spacecraft in 1965 and orbited Earth freely." },
        story:     { es: "En 1965, durante la histórica caminata espacial de la misión Gemini 4, bastó un segundo de descuido para que me deslizara fuera de la escotilla abierta. Sin gravedad que me detuviera, salí flotando hacia el abismo azul y negro, convirtiéndome en una de las primeras prendas humanas en orbitar la Tierra como un satélite improvisado.",
                     en: "In 1965, during the historic spacewalk of the Gemini 4 mission, one moment of carelessness was all it took for me to slip out of the open hatch. With no gravity to stop me, I floated out into the blue-black abyss, becoming one of the first human garments to orbit Earth as an improvised satellite." }
      },
      {
        id:        "espacio_camara_hasselblad",
        code:      { es: "PIEZA 02 // GEMINI 10 (1966)",           en: "PIECE 02 // GEMINI 10 (1966)" },
        name:      { es: "Cámara Hasselblad",                      en: "Hasselblad Camera" },
        year:      { es: "1966 • Misión Gemini 10 (Michael Collins)", en: "1966 • Gemini 10 Mission (Michael Collins)" },
        emoji:     "📷",
        img:       "../Assets/Imagenes/Objetos/obj_camara_hasselblad.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_camara_hasselblad.jpg",
        video:     "../Assets/Video/intro_espacio_camara.mp4",
        audio:     "../Assets/Audio/camara_hasselblad.mp3",
        source:    "NASA History - Gemini X Mission",
        shortDesc: { es: "Cámara perdida por el astronauta Michael Collins mientras trabajaba fuera de su nave.",
                     en: "Camera lost by astronaut Michael Collins while working outside his spacecraft." },
        story:     { es: "En 1966 acompañé al astronauta Michael Collins fuera de la cápsula Gemini 10 para capturar el cosmos desde el vacío. En medio de las maniobras en microgravedad, me solté de su sujeción y comencé a alejarme lentamente hacia la oscuridad. Collins no pudo alcanzarme, y me convertí en una cámara fantasma flotando alrededor del mundo.",
                     en: "In 1966 I accompanied astronaut Michael Collins outside the Gemini 10 capsule to capture the cosmos from the void. In the middle of microgravity maneuvers, I slipped from his grip and began drifting slowly into the darkness. Collins couldn't reach me, and I became a ghost camera floating around the world." }
      },
      {
        id:        "espacio_espatula_sts121",
        code:      { es: "PIEZA 03 // MISIÓN STS-121 (2006)",      en: "PIECE 03 // STS-121 MISSION (2006)" },
        name:      { es: "Espátula Orbital",                       en: "Orbital Spatula" },
        year:      { es: "2006 • Prueba de Reparación STS-121",   en: "2006 • STS-121 Repair Test" },
        emoji:     "🛠️",
        img:       "../Assets/Imagenes/Objetos/obj_espatula_sts121.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_espatula_sts121.jpg",
        video:     "../Assets/Video/intro_espacio_espatula.mp4",
        audio:     "../Assets/Audio/espatula_sts121.mp3",
        source:    "NASA Space Shuttle Mission STS-121",
        shortDesc: { es: "Espátula utilizada para extender material de reparación que se soltó y salió flotando.",
                     en: "A spatula used to spread repair material that broke free and drifted away." },
        story:     { es: "Durante la misión STS-121 en 2006, los astronautas probaban técnicas vitales para reparar el escudo térmico del transbordador en pleno vuelo. En un instante me solté de su agarre y emprendí mi propia órbita alrededor de la Tierra, recordándole a toda la tripulación que en el espacio hasta la herramienta más pequeña cobra vida propia.",
                     en: "During the STS-121 mission in 2006, astronauts were testing vital techniques to repair the shuttle's heat shield in flight. In an instant I slipped from their grip and began my own orbit around Earth, reminding the entire crew that in space, even the smallest tool takes on a life of its own." }
      },
      {
        id:        "espacio_pinzas_sts120",
        code:      { es: "PIEZA 04 // MISIÓN STS-120 (2007)",      en: "PIECE 04 // STS-120 MISSION (2007)" },
        name:      { es: "Pinzas de Punta",                        en: "Needle-nose Pliers" },
        year:      { es: "2007 • Estación Espacial Internacional",  en: "2007 • International Space Station" },
        emoji:     "🗜️",
        img:       "../Assets/Imagenes/Objetos/obj_STS-120 EVA.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_STS-120 EVA.jpg",
        video:     "../Assets/Video/intro_espacio_pinzas.mp4",
        audio:     "../Assets/Audio/pinzas_sts120.mp3",
        source:    "NASA ISS Expedition 16 / STS-120",
        shortDesc: { es: "Pinzas perdidas por Scott Parazynski durante una caminata espacial en la EEI.",
                     en: "Pliers lost by Scott Parazynski during a spacewalk on the ISS." },
        story:     { es: "En 2007 ayudaba al astronauta Scott Parazynski en una delicada reparación exterior de la Estación Espacial Internacional. Al realizar un movimiento en gravedad cero, escapé de su guante y salí navegando hacia el horizonte terrestre. Mi partida dejó una lección grabada en cada caminata: en el vacío, todo debe estar atado.",
                     en: "In 2007 I was helping astronaut Scott Parazynski with a delicate exterior repair of the International Space Station. In a moment of zero-gravity movement, I escaped his glove and sailed toward the Earth's horizon. My departure left a lesson engraved in every spacewalk: in the void, everything must be tethered." }
      },
      {
        id:        "espacio_bolsa_herramientas",
        code:      { es: "PIEZA 05 // CAMINATA EEI (2008)",        en: "PIECE 05 // ISS SPACEWALK (2008)" },
        name:      { es: "Bolsa de Herramientas",                  en: "Tool Bag" },
        year:      { es: "2008 • Estación Espacial Internacional",  en: "2008 • International Space Station" },
        emoji:     "🧰",
        img:       "../Assets/Imagenes/Objetos/obj_bolsa_herramientas.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_bolsa_herramientas.jpg",
        video:     "../Assets/Video/intro_espacio_bolsa.mp4",
        audio:     "../Assets/Audio/bolsa_herramientas.mp3",
        source:    "NASA ISS Orbital Debris Tracking",
        shortDesc: { es: "Bolsa perdida por Heidemarie Stefanyshyn-Piper que llegó a verse desde la Tierra.",
                     en: "Bag lost by Heidemarie Stefanyshyn-Piper that could be seen from Earth." },
        story:     { es: "En 2008, mientras la astronauta Heidemarie Stefanyshyn-Piper trabajaba fuera de la Estación Espacial Internacional, una pistola de grasa se activó dentro de mí y, al limpiarla, me solté hacia el vacío. Orbité la Tierra durante meses brillando tanto al sol que miles de personas pudieron verme con binoculares desde el suelo antes de desintegrarme en la atmósfera.",
                     en: "In 2008, while astronaut Heidemarie Stefanyshyn-Piper worked outside the ISS, a grease gun went off inside me and while she cleaned it, I slipped into the void. I orbited Earth for months, shining so brightly in the sun that thousands of people could see me with binoculars from the ground before I burned up in the atmosphere." }
      },
      {
        id:        "espacio_escudo_termico",
        code:      { es: "PIEZA 06 // CAMINATA EEI (2017)",        en: "PIECE 06 // ISS SPACEWALK (2017)" },
        name:      { es: "Escudo Térmico",                         en: "Thermal Shield" },
        year:      { es: "2017 • Estación Espacial Internacional",  en: "2017 • International Space Station" },
        emoji:     "🛡️",
        img:       "../Assets/Imagenes/Objetos/obj_escudo.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_escudo.jpg",
        video:     "../Assets/Video/intro_espacio_escudo.mp4",
        audio:     "../Assets/Audio/escudo_termico.mp3",
        source:    "NASA ISS Expedition 50 EVA",
        shortDesc: { es: "Pieza de protección térmica que se soltó durante su instalación en la EEI.",
                     en: "Thermal protection piece that broke free during installation on the ISS." },
        story:     { es: "En 2017 mi deber era proteger un puerto de acoplamiento de la Estación Espacial Internacional contra el frío y la radiación extrema. Pero durante la instalación en plena caminata espacial, me desprendí y salí flotando como una vela plateada sobre el planeta azul, obligando a los astronautas a improvisar una cubierta de emergencia.",
                     en: "In 2017 my duty was to protect a docking port of the International Space Station against extreme cold and radiation. But during installation in the middle of a spacewalk, I broke free and floated away like a silver sail over the blue planet, forcing the astronauts to improvise an emergency cover." }
      }
    ]
  }
};

/**
 * Returns a localized shallow-clone of a sector object.
 * Usage: const s = getSector("luna");
 *        s.title  // "THE MOON" or "LA LUNA"
 */
function getSector(key) {
  const raw = SECTORS_DATA[key];
  if (!raw) return null;
  const s = Object.assign({}, raw);
  s.code        = _loc(raw.code);
  s.title       = _loc(raw.title);
  s.tagline     = _loc(raw.tagline);
  s.coordinates = _loc(raw.coordinates);
  s.generalText = _loc(raw.generalText);
  s.techIntro   = _loc(raw.techIntro);
  s.highlights  = raw.highlights.map(h => ({ title: _loc(h.title), text: _loc(h.text) }));
  s.techSpecs   = raw.techSpecs.map(t => ({ label: _loc(t.label), value: t.value }));
  s.gallery     = raw.gallery.map(g => ({ src: g.src, caption: _loc(g.caption) }));
  s.objects     = raw.objects.map(o => getObject(o));
  return s;
}

/**
 * Returns a localized shallow-clone of a data object.
 */
function getObject(raw) {
  const o = Object.assign({}, raw);
  o.code      = _loc(raw.code);
  o.name      = _loc(raw.name);
  o.year      = _loc(raw.year);
  o.shortDesc = _loc(raw.shortDesc);
  o.story     = _loc(raw.story);
  return o;
}
