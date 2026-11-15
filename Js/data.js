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
      "La Luna es un santuario silencioso donde el tiempo se detuvo. Al ser el único mundo fuera de la Tierra que ha sentido pasos humanos y carecer de viento o lluvia, cada huella, cada rover eléctrico y cada nave que la NASA dejó atrás permanece intacta bajo las estrellas, guardando en silencio el eco de nuestra mayor aventura.",
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
          "Fui el hogar que protegió a los primeros humanos en pisar otro mundo. Cuando su misión terminó y debían volver a casa, encendieron mis motores superiores y se elevaron hacia la Tierra. Yo me quedé aquí, con mis patas firmes sobre el polvo gris, viendo cómo se alejaban. No fue un abandono, fue mi propósito: ser la plataforma que los impulsó de regreso."
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
          "Fui diseñado para ser los pies incansables de los astronautas de Apolo 15, 16 y 17. Con mis baterías cargadas, los llevé más lejos que nunca entre cráteres y montañas, cargando rocas milenarias y sus voces por la radio. Cuando agotamos la última carga, me estacionaron mirando hacia el horizonte lunar. Aquí sigo, esperando en silencio que algún día vuelvan a encender mis ruedas."
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
          "Mientras los astronautas regresaban a casa, yo me quedé de guardia en la oscuridad lunar. Alimentado por mi propio corazón nuclear, pasé años enteros escuchando los latidos internos de la Luna, midiendo lunamotos y reflejando rayos láser enviados desde la Tierra. Mi señal se apagó hace décadas, pero mis instrumentos siguen aquí, como testigos mudos de la ciencia."
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
          "Antes de que ningún humano se atreviera a bajar, me enviaron a dar el primer salto a ciegas en los años sesenta. Muchos temían que me hundiera en un océano de polvo profundo, pero mis patas tocaron suelo firme. Envié miles de fotografías para abrirles el camino a los astronautas del Apolo, y aquí me quedé, vigilando el terreno que ayudé a conquistar."
      }
    ]
  },

  marte: {
    code: "SECTOR 02 // SALA DE EXHIBICIÓN MARCIANA",
    title: "MARTE",
    tagline: "El planeta rojo explorado por rovers, landers y la primera aeronave extraterrestre",
    coordinates: "COORDENADAS: 18° 26' 41\" N, 77° 35' 03\" E (Jezero)",
    emoji: "🔴",
    bannerImg: "../Assets/Imagenes/Sectores/destino_marte.png",
    gallery: [
      { src: "../Assets/Imagenes/Sectores/destino_marte.png", caption: "Vista orbital del planeta Marte" },
      { src: "../Assets/Imagenes/Objetos/obj_ingenuity.jpg", caption: "Helicóptero Ingenuity en la superficie marciana" }
    ],
    bgColors: ["#291112", "#471b16"],
    generalText:
      "Marte es un desierto helado y solitario donde el viento rojo borra las huellas, pero jamás las hazañas. Desde los primeros aterrizadores Viking en 1976 hasta rovers que desafiaron su propio destino durante años y el primer helicóptero extraterrestre, este planeta guarda los monumentos robóticos de máquinas valientes que dieron su última gota de energía para revelarnos los secretos de un mundo antiguo.",
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
        img: "../Assets/Imagenes/Objetos/obj_sojourner.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_sojourner.jpg",
        video: "../assets/video/intro_marte_sojourner.mp4",
        audio: "../assets/audio/audio_marte_sojourner.mp3",
        source: "NASA Mars Exploration - Pathfinder & Sojourner",
        shortDesc: "El abuelo de los rovers marcianos, del tamaño de un microondas con ruedas y energía solar.",
        story:
          "Era apenas del tamaño de un horno de microondas, pero fui el primero en rodar sobre otro planeta. Llegué en 1997 junto a la misión Pathfinder y exploré rocas marcianas con la curiosidad de un niño. Cuando mi estación base perdió comunicación con la Tierra, seguí dando vueltas alrededor de ella buscando una señal que nunca volvió, hasta quedarme dormido junto a la roca Yogi."
      },
      {
        id: "marte_spirit_opportunity",
        code: "PIEZA 02 // MISIÓN MER (2004)",
        name: "Rovers Spirit y Opportunity",
        year: "2004 – 2018 • Cráteres Gusev y Endeavour",
        emoji: "🤖",
        img: "../Assets/Imagenes/Objetos/obj_spirity.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_spirity.jpg",
        video: "../assets/video/intro_marte_opportunity.mp4",
        audio: "../assets/audio/audio_marte_opportunity.mp3",
        source: "NASA Mars Exploration - Spirit and Opportunity",
        shortDesc: "Dos robots gemelos planeados para 90 días que exploraron Marte durante 6 y casi 15 años.",
        story:
          "Nos diseñaron para sobrevivir apenas noventa días marcianos, pero nos negamos a rendirnos. Mi hermano Spirit exploró durante seis años, y yo, Opportunity, recorrí Marte por casi quince años, superando tormentas y terrenos imposibles. Cuando una tormenta global cubrió el cielo y agotó mis baterías, envié mi último susurro a casa: mi batería está baja y está oscureciendo."
      },
      {
        id: "marte_viking",
        code: "PIEZA 03 // PROGRAMA VIKING (1976)",
        name: "Landers Viking 1 y 2",
        year: "1976 • Chryse y Utopia Planitia",
        emoji: "📷",
        img: "../Assets/Imagenes/Objetos/obj_viking.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_viking.jpg",
        video: "../assets/video/intro_marte_viking.mp4",
        audio: "../assets/audio/audio_marte_viking.mp3",
        source: "NASA Science - Viking Program",
        shortDesc: "Primeras naves de EE. UU. en aterrizar con éxito en Marte con cámaras panorámicas y brazo robótico.",
        story:
          "En 1976 nos convertimos en los primeros ojos y manos de la humanidad sobre la superficie de Marte. No teníamos ruedas para viajar, así que echamos raíces en el suelo rojizo. Con nuestro brazo robótico excavamos la tierra buscando rastros de vida y enviamos las primeras postales panorámicas de un amanecer marciano, mucho antes de que los rovers existieran."
      },
      {
        id: "marte_phoenix_insight",
        code: "PIEZA 04 // ESTACIONES FIJAS",
        name: "Landers Phoenix e InSight",
        year: "2008 – 2022 • Polo Norte y Elysium",
        emoji: "🌋",
        img: "../Assets/Imagenes/Objetos/obj_insight.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_insight.jpg",
        video: "../assets/video/intro_marte_insight.mp4",
        audio: "../assets/audio/audio_marte_insight.mp3",
        source: "NASA Mars Exploration - Phoenix & InSight",
        shortDesc: "Phoenix cavó buscando hielo de agua e InSight escuchó 'martemotos' para estudiar el interior.",
        story:
          "Cada uno cumplió una misión única sin moverse de su sitio. Yo, Phoenix, excavé en el polo norte marciano hasta tocar hielo de agua real bajo el polvo. Y yo, InSight, apoyé mi oído sísmico sobre el suelo para escuchar los latidos profundos de los martemotos. El polvo cubrió nuestros paneles poco a poco, hasta sumirnos en un descanso eterno."
      },
      {
        id: "marte_ingenuity",
        code: "PIEZA 05 // MARS HELICOPTER",
        name: "Helicóptero Ingenuity",
        year: "2021 – 2024 • Cráter Jezero",
        emoji: "🚁",
        img: "../Assets/Imagenes/Objetos/obj_ingenuity.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_ingenuity.jpg",
        video: "../assets/video/intro_marte_ingenuity.mp4",
        audio: "../assets/audio/audio_marte_ingenuity.mp3",
        source: "NASA JPL - Ingenuity Mars Helicopter",
        shortDesc: "Primera aeronave propulsada en volar en otro planeta; realizó decenas de vuelos antes de retirarse.",
        story:
          "Todos decían que era imposible volar en una atmósfera tan delgada como la de Marte, pero logré despegar. Me convertí en la primera aeronave en conquistar los cielos de otro mundo, volando setenta y dos veces como explorador aéreo. En mi último aterrizaje una de mis aspas se dañó, pero ya había demostrado que el cielo marciano también nos pertenece."
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
      "En el vacío silencioso de la órbita terrestre no existe el suelo donde caen las cosas: cualquier objeto que se suelta inicia un viaje eterno a más de veintisiete mil kilómetros por hora alrededor del planeta. Desde los audaces paseos espaciales de los años sesenta hasta las reparaciones en la Estación Espacial Internacional, estas piezas escaparon de las manos de los astronautas para convertirse en viajeros solitarios entre las estrellas.",
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
        img: "../Assets/Imagenes/Objetos/obj_guante_gemini4.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_guante_gemini4.jpg",
        video: "../Assets/Video/intro_espacio_guante.mp4",
        audio: "../Assets/Audio/guante_gemini4.mp3",
        source: "NASA History - Gemini IV EVA",
        shortDesc: "Guante de repuesto que salió de la nave en 1965 y quedó flotando alrededor de la Tierra.",
        story:
          "En 1965, durante la histórica caminata espacial de la misión Gemini 4, bastó un segundo de descuido para que me deslizara fuera de la escotilla abierta. Sin gravedad que me detuviera, salí flotando hacia el abismo azul y negro, convirtiéndome en una de las primeras prendas humanas en orbitar la Tierra como un satélite improvisado."
      },
      {
        id: "espacio_camara_hasselblad",
        code: "PIEZA 02 // GEMINI 10 (1966)",
        name: "Cámara Hasselblad",
        year: "1966 • Misión Gemini 10 (Michael Collins)",
        emoji: "📷",
        img: "../Assets/Imagenes/Objetos/obj_camara_hasselblad.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_camara_hasselblad.jpg",
        video: "../Assets/Video/intro_espacio_camara.mp4",
        audio: "../Assets/Audio/camara_hasselblad.mp3",
        source: "NASA History - Gemini X Mission",
        shortDesc: "Cámara perdida por el astronauta Michael Collins mientras trabajaba fuera de su nave.",
        story:
          "En 1966 acompañé al astronauta Michael Collins fuera de la cápsula Gemini 10 para capturar el cosmos desde el vacío. En medio de las maniobras en microgravedad, me solté de su sujeción y comencé a alejarme lentamente hacia la oscuridad. Collins no pudo alcanzarme, y me convertí en una cámara fantasma flotando alrededor del mundo."
      },
      {
        id: "espacio_espatula_sts121",
        code: "PIEZA 03 // MISIÓN STS-121 (2006)",
        name: "Espátula Orbital",
        year: "2006 • Prueba de Reparación STS-121",
        emoji: "🛠️",
        img: "../Assets/Imagenes/Objetos/obj_espatula_sts121.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_espatula_sts121.jpg",
        video: "../Assets/Video/intro_espacio_espatula.mp4",
        audio: "../Assets/Audio/espatula_sts121.mp3",
        source: "NASA Space Shuttle Mission STS-121",
        shortDesc: "Espátula utilizada para extender material de reparación que se soltó y salió flotando.",
        story:
          "Durante la misión STS-121 en 2006, los astronautas probaban técnicas vitales para reparar el escudo térmico del transbordador en pleno vuelo. En un instante me solté de su agarre y emprendí mi propia órbita alrededor de la Tierra, recordándole a toda la tripulación que en el espacio hasta la herramienta más pequeña cobra vida propia."
      },
      {
        id: "espacio_pinzas_sts120",
        code: "PIEZA 04 // MISIÓN STS-120 (2007)",
        name: "Pinzas de Punta",
        year: "2007 • Estación Espacial Internacional",
        emoji: "🗜️",
        img: "../Assets/Imagenes/Objetos/obj_STS-120 EVA.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_STS-120 EVA.jpg",
        video: "../Assets/Video/intro_espacio_pinzas.mp4",
        audio: "../Assets/Audio/pinzas_sts120.mp3",
        source: "NASA ISS Expedition 16 / STS-120",
        shortDesc: "Pinzas perdidas por Scott Parazynski durante una caminata espacial en la EEI.",
        story:
          "En 2007 ayudaba al astronauta Scott Parazynski en una delicada reparación exterior de la Estación Espacial Internacional. Al realizar un movimiento en gravedad cero, escapé de su guante y salí navegando hacia el horizonte terrestre. Mi partida dejó una lección grabada en cada caminata: en el vacío, todo debe estar atado."
      },
      {
        id: "espacio_bolsa_herramientas",
        code: "PIEZA 05 // CAMINATA EEI (2008)",
        name: "Bolsa de Herramientas",
        year: "2008 • Estación Espacial Internacional",
        emoji: "🧰",
        img: "../Assets/Imagenes/Objetos/obj_bolsa_herramientas.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_bolsa_herramientas.jpg",
        video: "../Assets/Video/intro_espacio_bolsa.mp4",
        audio: "../Assets/Audio/bolsa_herramientas.mp3",
        source: "NASA ISS Orbital Debris Tracking",
        shortDesc: "Bolsa perdida por Heidemarie Stefanyshyn-Piper que llegó a verse desde la Tierra.",
        story:
          "En 2008, mientras la astronauta Heidemarie Stefanyshyn-Piper trabajaba fuera de la Estación Espacial Internacional, una pistola de grasa se activó dentro de mí y, al limpiarla, me solté hacia el vacío. Orbité la Tierra durante meses brillando tanto al sol que miles de personas pudieron verme con binoculares desde el suelo antes de desintegrarme en la atmósfera."
      },
      {
        id: "espacio_escudo_termico",
        code: "PIEZA 06 // CAMINATA EEI (2017)",
        name: "Escudo Térmico",
        year: "2017 • Estación Espacial Internacional",
        emoji: "🛡️",
        img: "../Assets/Imagenes/Objetos/obj_escudo_termico.jpg",
        realPhoto: "../Assets/Imagenes/Objetos/obj_escudo_termico.jpg",
        video: "../Assets/Video/intro_espacio_escudo.mp4",
        audio: "../Assets/Audio/escudo_termico.mp3",
        source: "NASA ISS Expedition 50 EVA",
        shortDesc: "Pieza de protección térmica que se soltó durante su instalación en la EEI.",
        story:
          "En 2017 mi deber era proteger un puerto de acoplamiento de la Estación Espacial Internacional contra el frío y la radiación extrema. Pero durante la instalación en plena caminata espacial, me desprendí y salí flotando como una vela plateada sobre el planeta azul, obligando a los astronautas a improvisar una cubierta de emergencia."
      }
    ]
  }
};