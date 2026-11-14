const TEAM_DATA = [
  {
    name: "Ángel David Sánchez",
    role: "Arquitectura Web y Minijuegos",
    contribution: "Desarrollo de la plataforma interactiva, motor 2D de rescate y estructura modular."
  },
  {
    name: "Integrante 2",
    role: "Arte Visual y Hologramas",
    contribution: "Diseño de interfaz espacial, selección de fotografías NASA y sprites."
  },
  {
    name: "Integrante 3",
    role: "Producción Audiovisual",
    contribution: "Edición de videos de transición orbital y efectos de sonido."
  },
  {
    name: "Integrante 4",
    role: "Investigación NASA y Guion",
    contribution: "Catalogación de los 15 objetos espaciales, fuentes NASA y narración."
  },
  {
    name: "Integrante 5",
    role: "Documentación y Pitch",
    contribution: "Enfoque educativo escolar, pruebas de usabilidad y presentación."
  }
];

const SECTORS_DATA = {
 luna: {
    code: "SECTOR 01 // SALA DE EXHIBICIÓN LUNAR",
    title: "LA LUNA",
    tagline: "Nuestro satélite natural y primer mundo explorado por la humanidad",
    coordinates: "COORDENADAS: 00° 40' 26\" N, 23° 28' 22\" E",
    emoji: "🌕",
    bannerImg: "../Assets/Imagenes/Sectores/destino_luna.png",
    gallery: [
      { src: "../Assets/Imagenes/Sectores/destino_luna.png", caption: "Cara visible de la Luna y mares basálticos" },
      { src: "../Assets/Imagenes/Objetos/obj_apollo_lm.jpg", caption: "Módulo Lunar Eagle sobre la superficie lunar" }
    ],
    bgColors: ["#171522", "#262335"],
    generalText:
      "La Luna es el único cuerpo celeste fuera de la Tierra donde han caminado seres humanos. Al carecer de viento, lluvia o atmósfera densa, cada sonda robótica, etapa de descenso, rover eléctrico y estación científica dejada por la NASA permanece intacta sobre el polvo gris lunar.",
    highlights: [
      { title: "Exploración previa", text: "Las sondas Surveyor comprobaron en los años 60 que el suelo soportaba naves." },
      { title: "Programa Apolo", text: "Entre 1969 y 1972 quedaron 6 etapas de descenso y 3 vehículos eléctricos." },
      { title: "Ciencia continua", text: "Los paquetes ALSEP y reflectores láser enviaron datos durante años." }
    ],
    techIntro:
      "Parámetros físicos y ambientales registrados por las estaciones científicas ALSEP desplegadas en la superficie lunar:",
    techSpecs: [
      { label: "Distancia media a la Tierra", value: "384,400 km (1.28 seg luz)" },
      { label: "Gravedad superficial", value: "1.62 m/s² (16.6% de la Tierra)" },
      { label: "Rango térmico", value: "-173 °C (noche) a +127 °C (día)" },
      { label: "Atmósfera", value: "Exosfera ultra tenue (vacío ~10⁻¹² torr)" },
      { label: "Suelo superficial", value: "Regolito basáltico con silicatos y hierro" },
      { label: "Piezas catalogadas", value: "4 familias de hardware NASA" }
    ],
    objects: [
      {
        id: "luna_apollo_lm",
        code: "PIEZA 01 // PROGRAMA APOLO",
        name: "Módulos Lunares Apolo",
        year: "1969 – 1972 • Superficie Lunar",
        emoji: "🚀",
        img: "../Assets/Imagenes/Objetos/obj_apollo_lm.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_apollo_lm.jpg",
        video: "../assets/video/intro_luna_apollo.mp4",
        audio: "../assets/audio/audio_luna_apollo.mp3",
        source: "NASA Science - Apollo Lunar Module",
        shortDesc: "Bases con patas de aterrizaje que sirvieron como plataforma de despegue para el regreso a casa.",
        story:
          "Cuando los astronautas de las misiones Apolo terminaban su exploración y querían regresar a la Tierra, la nave se dividía en dos partes. La parte superior (módulo de ascenso) despegaba de vuelta a casa, dejando la etapa de descenso (la base con las patas) abandonada para siempre en la Luna."
      },
      {
        id: "luna_lrv",
        code: "PIEZA 02 // APOLO 15, 16 Y 17",
        name: "Rovers Lunares (LRVs)",
        year: "1971 – 1972 • Valles y Tierras Altas",
        emoji: "🚙",
        img: "../Assets/Imagenes/Objetos/obj_lrv.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_lrv.jpg",
        video: "../assets/video/intro_luna_lrv.mp4",
        audio: "../assets/audio/audio_luna_lrv.mp3",
        source: "NASA Solar System Exploration - Lunar Roving Vehicle",
        shortDesc: "Buggies espaciales eléctricos con baterías que permitieron recorrer grandes distancias y cargar rocas.",
        story:
          "Eran verdaderos 'buggies' espaciales eléctricos que funcionaban con baterías. Los astronautas los condujeron en las últimas misiones Apolo (15, 16 y 17) para recorrer mayores distancias, llevar herramientas y recolectar rocas lunares más rápido. Al terminar las misiones, se quedaron aparcados para siempre en el mismo sitio."
      },
      {
        id: "luna_alsep",
        code: "PIEZA 03 // ESTACIÓN CIENTÍFICA",
        name: "Paquetes Científicos ALSEP",
        year: "1969 – 1977 • Red Sísmica Lunar",
        emoji: "📡",
        img: "../Assets/Imagenes/Objetos/obj_alsep.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_alsep.jpg",
        video: "../assets/video/intro_luna_alsep.mp4",
        audio: "../assets/audio/audio_luna_alsep.mp3",
        source: "NASA Science - ALSEP Overview",
        shortDesc: "Sismómetros de lunamotos, detectores de partículas y espejos reflectores con energía nuclear.",
        story:
          "Un conjunto de instrumentos científicos avanzados (sismómetros para medir 'lunamotos', detectores de partículas y espejos reflectores) que los astronautas conectaban y dejaban funcionando con energía nuclear a radioisótopos antes de irse. ¡Algunos enviaron datos a la Tierra durante años!"
      },
      {
        id: "luna_surveyor",
        code: "PIEZA 04 // EXPLORACIÓN ROBÓTICA",
        name: "Sondas Surveyor",
        year: "1966 – 1968 • Misiones Pre-Apolo",
        emoji: "🛰️",
        img: "../Assets/Imagenes/Objetos/obj_surveyor.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_surveyor.jpg",
        video: "../assets/video/intro_luna_surveyor.mp4",
        audio: "../assets/audio/audio_luna_surveyor.mp3",
        source: "NASA History - Surveyor Program",
        shortDesc: "Sondas de los años 60 que demostraron que el suelo lunar era sólido y no polvo profundo.",
        story:
          "Sondas robóticas enviadas por la NASA en la década de 1960. Su misión principal era responder si la superficie de la Luna era sólida o si los exploradores se hundirían en polvo profundo. Demostraron que los aterrizajes suaves eran posibles y tomaron miles de fotos antes de apagarse."
      }
    ]
  },

  marte: {
    code: "SECTOR 02 // SALA DE EXHIBICIÓN MARCIANA",
    title: "MARTE",
    tagline: "El planeta rojo explorado por rovers, landers y la primera aeronave extraterrestre",
    coordinates: "COORDENADAS: 18° 26' 41\" N, 77° 35' 03\" E (Jezero)",
    emoji: "🔴",
    bannerImg: "../assets/img/sectores/museo_marte.jpg",
    gallery: [
      { src: "../assets/img/sectores/museo_marte.jpg", caption: "Horizonte montañoso y suelo rocoso de Marte" },
      { src: "../assets/img/sectores/marte_delta.jpg", caption: "Antiguo delta fluvial en el cráter Jezero" },
      { src: "../assets/img/objetos/foto_rover_marte.jpg", caption: "Huellas de exploración y mástil científico" }
    ],
    bgColors: ["#291112", "#471b16"],
    generalText:
      "Marte es un desierto frío con cañones gigantes, antiguos deltas de ríos secos y tormentas globales de polvo. Desde los primeros aterrizadores Viking en 1976 hasta rovers como Spirit, Opportunity y el helicóptero Ingenuity, la NASA ha dejado monumentos robóticos que revelaron la historia del agua en el planeta.",
    highlights: [
      { title: "Pioneros fijos", text: "Viking, Phoenix e InSight analizaron el suelo, hielo y martemotos desde un punto fijo." },
      { title: "Rovers incansables", text: "Sojourner, Spirit y Opportunity superaron por años su tiempo de vida planeado." },
      { title: "Primer vuelo", text: "Ingenuity logró volar decenas de veces en la tenue atmósfera marciana." }
    ],
    techIntro:
      "Condiciones ambientales y telemetría registradas en superficie por las misiones marcianas de la NASA:",
    techSpecs: [
      { label: "Distancia media a la Tierra", value: "225 millones de km (3–22 min luz)" },
      { label: "Gravedad superficial", value: "3.72 m/s² (38% de la Tierra)" },
      { label: "Duración del día (Sol)", value: "24 horas, 39 minutos, 35 segundos" },
      { label: "Atmósfera", value: "95.3% CO₂, 2.7% N₂, 1.6% Argón" },
      { label: "Presión superficial", value: "6.1 mbar (<1% de la Tierra)" },
      { label: "Piezas catalogadas", value: "5 familias de hardware NASA" }
    ],
    objects: [
      {
        id: "marte_sojourner",
        code: "PIEZA 01 // PATHFINDER (1997)",
        name: "Rover Sojourner",
        year: "1997 • Ares Vallis (Roca Yogi)",
        emoji: "📟",
        img: "../assets/img/objetos/obj_sojourner.png",
        realPhoto: "../assets/img/sectores/museo_marte.jpg",
        video: "../assets/video/intro_marte_sojourner.mp4",
        audio: "../assets/audio/audio_marte_sojourner.mp3",
        source: "NASA Mars Exploration - Pathfinder & Sojourner",
        shortDesc: "El abuelo de los rovers marcianos, del tamaño de un microondas con ruedas y energía solar.",
        story:
          "¡El abuelo de todos los rovers en Marte! Llegó en 1997 a bordo de la misión Pathfinder. Era pequeñísimo (del tamaño de un horno microondas con ruedas) y funcionaba parcialmente con energía solar. Operó durante casi tres meses antes de quedar permanentemente aparcado en la roca 'Yogi'."
      },
      {
        id: "marte_spirit_opportunity",
        code: "PIEZA 02 // MISIÓN MER (2004)",
        name: "Rovers Spirit y Opportunity",
        year: "2004 – 2018 • Cráteres Gusev y Endeavour",
        emoji: "🤖",
        img: "../assets/img/objetos/obj_opportunity.png",
        realPhoto: "../assets/img/objetos/foto_rover_marte.jpg",
        video: "../assets/video/intro_marte_opportunity.mp4",
        audio: "../assets/audio/audio_marte_opportunity.mp3",
        source: "NASA Mars Exploration - Spirit and Opportunity",
        shortDesc: "Dos robots gemelos planeados para 90 días que exploraron Marte durante 6 y casi 15 años.",
        story:
          "Dos hermanos robots idénticos que llegaron a Marte en 2004 con una misión planeada de solo 90 días marcianos. ¡Superaron todas las expectativas! Spirit operó 6 años y Opportunity casi 15 años. Hoy son monumentos históricos estáticos a la exploración espacial."
      },
      {
        id: "marte_viking",
        code: "PIEZA 03 // PROGRAMA VIKING (1976)",
        name: "Landers Viking 1 y 2",
        year: "1976 • Chryse y Utopia Planitia",
        emoji: "📷",
        img: "../assets/img/objetos/obj_viking.png",
        realPhoto: "../assets/img/sectores/marte_delta.jpg",
        video: "../assets/video/intro_marte_viking.mp4",
        audio: "../assets/audio/audio_marte_viking.mp3",
        source: "NASA Science - Viking Program",
        shortDesc: "Primeras naves de EE. UU. en aterrizar con éxito en Marte con cámaras panorámicas y brazo robótico.",
        story:
          "Primeras naves de EE. UU. en aterrizar con éxito en la superficie marciana (1976). No tenían ruedas (se quedaron fijas donde cayeron), pero contaban con cámaras panorámicas y un brazo robótico para analizar la tierra en búsqueda de señales de vida."
      },
      {
        id: "marte_phoenix_insight",
        code: "PIEZA 04 // ESTACIONES FIJAS",
        name: "Landers Phoenix e InSight",
        year: "2008 – 2022 • Polo Norte y Elysium",
        emoji: "🌋",
        img: "../assets/img/objetos/obj_insight.png",
        realPhoto: "../assets/img/sectores/museo_marte.jpg",
        video: "../assets/video/intro_marte_insight.mp4",
        audio: "../assets/audio/audio_marte_insight.mp3",
        source: "NASA Mars Exploration - Phoenix & InSight",
        shortDesc: "Phoenix cavó buscando hielo de agua e InSight escuchó 'martemotos' para estudiar el interior.",
        story:
          "Phoenix cavó en busca de hielo de agua en el suelo marciano; InSight escuchó 'martemotos' (terremotos marcianos) para estudiar el interior del planeta. Ambos terminaron perdiendo energía poco a poco debido al polvo y al frío, quedando inactivos."
      },
      {
        id: "marte_ingenuity",
        code: "PIEZA 05 // MARS HELICOPTER",
        name: "Helicóptero Ingenuity",
        year: "2021 – 2024 • Cráter Jezero",
        emoji: "🚁",
        img: "../assets/img/objetos/obj_ingenuity.png",
        realPhoto: "../assets/img/objetos/foto_ingenuity.jpg",
        video: "../assets/video/intro_marte_ingenuity.mp4",
        audio: "../assets/audio/audio_marte_ingenuity.mp3",
        source: "NASA JPL - Ingenuity Mars Helicopter",
        shortDesc: "Primera aeronave propulsada en volar en otro planeta; realizó decenas de vuelos antes de retirarse.",
        story:
          "La primera aeronave propulsada en volar en la atmósfera de otro planeta. Tras realizar decenas de vuelos asombrosos en Marte, sufrió daños en una de sus palas de rotor durante su vuelo final y se convirtió en un artefacto estacionario."
      }
    ]
  },

  espacio: {
    code: "SECTOR 03 // SALA DE EXHIBICIÓN ORBITAL",
    title: "ESPACIO PROFUNDO",
    tagline: "Objetos y herramientas perdidas durante caminatas espaciales en órbita terrestre",
    coordinates: "ÓRBITA TERRESTRE BAJA // ALTITUD ~400 KM (EEI / GEMINI / STS)",
    emoji: "🛰️",
    bannerImg: "../Assets/Imagenes/Sectores/destino_espacio.png",
    gallery: [
      { src: "../Assets/Imagenes/Sectores/destino_espacio.png", caption: "Vista orbital del entorno espacial y nebulosas" }
    ],
    bgColors: ["#120929", "#241142"],
    generalText:
      "Trabajar en el vacío del espacio requiere precisión absoluta: en condiciones de microgravedad, cualquier herramienta o pieza que se suelte continúa viajando a más de 27,000 km/h alrededor de la Tierra. Desde los primeros paseos espaciales del programa Gemini hasta el mantenimiento de la Estación Espacial Internacional, varios objetos quedaron flotando como reliquias orbitales.",
    highlights: [
      { title: "Era Gemini (1965–1966)", text: "Los primeros paseos espaciales dejaron un guante y una cámara Hasselblad en órbita." },
      { title: "Transbordadores STS", text: "Misiones de reparación perdieron una espátula y unas pinzas de punta en plena maniobra." },
      { title: "Estación Espacial (EEI)", text: "Una bolsa de herramientas y un escudo térmico se desprendieron durante caminatas." }
    ],
    techIntro:
      "Condiciones orbitales en las que ocurrieron los extravíos durante actividades extravehiculares (EVA):",
    techSpecs: [
      { label: "Velocidad orbital (LEO)", value: "~27,600 km/h (7.66 km/s)" },
      { label: "Altitud típica (EEI)", value: "400 – 420 km sobre la Tierra" },
      { label: "Período orbital", value: "~92 minutos por vuelta" },
      { label: "Gravedad aparente", value: "Microgravedad (caída libre continua)" },
      { label: "Rango térmico orbital", value: "-120 °C (sombra) a +120 °C (sol)" },
      { label: "Piezas catalogadas", value: "6 objetos perdidos en órbita" }
    ],
    objects: [
      {
        id: "espacio_guante_gemini4",
        code: "PIEZA 01 // GEMINI 4 (1965)",
        name: "Guante Espacial",
        year: "1965 • Caminata Espacial Gemini 4",
        emoji: "🧤",
        img: "../Assets/Imagenes/Objetos/guante_gemini4.png",
        realPhoto: "../Assets/Imagenes/Sectores/destino_espacio.png",
        video: "../Assets/Video/intro_espacio_guante.mp4",
        audio: "../Assets/Audio/guante_gemini4.mp3",
        source: "NASA History - Gemini IV EVA",
        shortDesc: "Guante de repuesto que salió de la nave en 1965 y quedó flotando alrededor de la Tierra.",
        story:
          "Durante una caminata espacial de la misión Gemini 4 (1965), un guante de repuesto salió de la nave y quedó flotando alrededor de la Tierra. ¡Fue como dejar una prenda olvidada, pero en el espacio!"
      },
      {
        id: "espacio_camara_hasselblad",
        code: "PIEZA 02 // GEMINI 10 (1966)",
        name: "Cámara Hasselblad",
        year: "1966 • Misión Gemini 10 (Michael Collins)",
        emoji: "📷",
        img: "../Assets/Imagenes/Objetos/camara_hasselblad.png",
        realPhoto: "../Assets/Imagenes/Sectores/destino_espacio.png",
        video: "../Assets/Video/intro_espacio_camara.mp4",
        audio: "../Assets/Audio/camara_hasselblad.mp3",
        source: "NASA History - Gemini X Mission",
        shortDesc: "Cámara perdida por el astronauta Michael Collins mientras trabajaba fuera de su nave.",
        story:
          "En la misión Gemini 10 (1966), el astronauta Michael Collins perdió una cámara mientras trabajaba fuera de su nave. La cámara se alejó flotando y ya no pudieron recuperarla."
      },
      {
        id: "espacio_espatula_sts121",
        code: "PIEZA 03 // MISIÓN STS-121 (2006)",
        name: "Espátula Orbital",
        year: "2006 • Prueba de Reparación STS-121",
        emoji: "🛠️",
        img: "../Assets/Imagenes/Objetos/espatula_sts121.png",
        realPhoto: "../Assets/Imagenes/Sectores/destino_espacio.png",
        video: "../Assets/Video/intro_espacio_espatula.mp4",
        audio: "../Assets/Audio/espatula_sts121.mp3",
        source: "NASA Space Shuttle Mission STS-121",
        shortDesc: "Espátula utilizada para extender material de reparación que se soltó y salió flotando.",
        story:
          "Durante la misión STS-121 (2006), los astronautas probaban cómo reparar una parte de una nave. Una espátula que usaban para extender un material se soltó y salió flotando. En el espacio, incluso una herramienta pequeña puede convertirse en un objeto perdido."
      },
      {
        id: "espacio_pinzas_sts120",
        code: "PIEZA 04 // MISIÓN STS-120 (2007)",
        name: "Pinzas de Punta",
        year: "2007 • Estación Espacial Internacional",
        emoji: "🗜️",
        img: "../Assets/Imagenes/Objetos/pinzas_sts120.png",
        realPhoto: "../Assets/Imagenes/Sectores/destino_espacio.png",
        video: "../Assets/Video/intro_espacio_pinzas.mp4",
        audio: "../Assets/Audio/pinzas_sts120.mp3",
        source: "NASA ISS Expedition 16 / STS-120",
        shortDesc: "Pinzas perdidas por Scott Parazynski durante una caminata espacial en la EEI.",
        story:
          "En una caminata espacial de la misión STS-120 (2007), el astronauta Scott Parazynski perdió unas pinzas que utilizaba para trabajar en la Estación Espacial Internacional. El caso muestra por qué los astronautas sujetan sus herramientas para que no se escapen."
      },
      {
        id: "espacio_bolsa_herramientas",
        code: "PIEZA 05 // CAMINATA EEI (2008)",
        name: "Bolsa de Herramientas",
        year: "2008 • Estación Espacial Internacional",
        emoji: "🧰",
        img: "../Assets/Imagenes/Objetos/bolsa_herramientas.png",
        realPhoto: "../Assets/Imagenes/Sectores/destino_espacio.png",
        video: "../Assets/Video/intro_espacio_bolsa.mp4",
        audio: "../Assets/Audio/bolsa_herramientas.mp3",
        source: "NASA ISS Orbital Debris Tracking",
        shortDesc: "Bolsa perdida por Heidemarie Stefanyshyn-Piper que llegó a verse desde la Tierra.",
        story:
          "En 2008, la astronauta Heidemarie Stefanyshyn-Piper perdió una bolsa de herramientas mientras trabajaba fuera de la Estación Espacial Internacional. La bolsa se alejó flotando y fue vista desde la Tierra durante un tiempo antes de entrar en la atmósfera."
      },
      {
        id: "espacio_escudo_termico",
        code: "PIEZA 06 // CAMINATA EEI (2017)",
        name: "Escudo Térmico",
        year: "2017 • Estación Espacial Internacional",
        emoji: "🛡️",
        img: "../Assets/Imagenes/Objetos/escudo_termico.png",
        realPhoto: "../Assets/Imagenes/Sectores/destino_espacio.png",
        video: "../Assets/Video/intro_espacio_escudo.mp4",
        audio: "../Assets/Audio/escudo_termico.mp3",
        source: "NASA ISS Expedition 50 EVA",
        shortDesc: "Pieza de protección térmica que se soltó durante su instalación en la EEI.",
        story:
          "Durante una caminata espacial en 2017, una pieza de protección térmica que se estaba instalando en la Estación Espacial Internacional se soltó y quedó flotando cerca de ella. Los astronautas encontraron otra forma de proteger la zona."
      }
    ]
  }
};