/**
 * CTRL SOCIETY – I18N ENGINE
 * Vanilla JS · No dependencies · ES / EN toggle
 * Persists to localStorage key "lost_signal_lang"
 */

(function () {
  "use strict";

  /* ─── DICTIONARIES ─── */
  const DICT = {
    es: {
      /* HUD / Header */
      hudTag:              "NASA SPACE APPS CHALLENGE 2026 // MUSEO INTERACTIVO DE SEÑALES",
      heroSubtitle:        "Regresando la señal a los",
      heroEmphasis:        "héroes olvidados",
      heroRest:            "de la exploración espacial",
      restoredInMuseum:    "SEÑALES RESTAURADAS EN EL MUSEO:",
      visitMuseum:         "VISITAR MUSEO",
      communityBtn:        "COMUNIDAD & NASA",

      /* Hub – carousel */
      sectorCode1:         "SECTOR 01 / 03",
      sectorCode2:         "SECTOR 02 / 03",
      sectorCode3:         "SECTOR 03 / 03",
      signals4:            "0 / 4 SEÑALES",
      signals5:            "0 / 5 SEÑALES",
      touchOrbit:          "📡 TOCA PARA ÓRBITA",
      lunaTitle:           "LA LUNA",
      lunaHook:            "384,400 km • Huellas del Programa Apolo y Surveyor",
      exploreLuna:         "EXPLORAR SECTOR LUNAR",
      marteTitle:          "MARTE",
      marteHook:           "225 Millones km • Rovers, Landers e Ingenuity",
      exploreMarte:        "EXPLORAR SECTOR MARCIANO",
      espacioTitle:        "ESPACIO PROFUNDO",
      espacioHook:         "Más allá de la órbita • Sondas pioneras y cazadores de mundos",
      exploreEspacio:      "EXPLORAR ESPACIO PROFUNDO",
      indicator1:          "01 • LA LUNA",
      indicator2:          "02 • MARTE",
      indicator3:          "03 • ESPACIO PROFUNDO",
      prevSector:          "Sector anterior",
      nextSector:          "Siguiente sector",
      ariaCarousel:        "Sectores del Museo Espacial",
      ariaSelectSector:    "Seleccionar sector",
      ariaOrbitLuna:       "Misiones en órbita lunar",
      ariaOrbitMarte:      "Misiones en órbita marciana",
      ariaOrbitEspacio:    "Misiones en órbita de espacio profundo",
      ariaLunaBtn:         "Seleccionar La Luna para ver misiones en órbita",
      ariaMarteBtn:        "Seleccionar Marte para ver misiones en órbita",
      ariaEspacioBtn:      "Seleccionar Espacio Profundo para ver misiones en órbita",

      /* Hub – footer */
      footerTag:           "CTRL SOCIETY // NASA SPACE APPS CHALLENGE 2026",
      footerCredit:        "Desarrollo principal:",
      footerTeam:          "· Con colaboración del equipo CTRL Society",

      /* Sector page */
      backToSectors:       "⬅ VOLVER AL TABLÓN DE SECTORES",
      backToControlCenter: "⬅ VOLVER AL CENTRO DE CONTROL",
      communityLink:       "📡 COMUNIDAD",
      sectorCodeLabel:     "SECTOR 01 // SALA DE EXHIBICIÓN",
      archiveActive:       "● ARCHIVO ACTIVO",
      tabGeneral:          "📖 INFORMACIÓN GENERAL",
      tabTechnical:        "⚙️ INFORMACIÓN TÉCNICA",
      abandonedHardware:   "HARDWARE ABANDONADO EN ESTE SECTOR",
      abandonedSubtitle:   "Selecciona un objeto para iniciar el dron de rastreo y recuperar su historia oficial de la NASA",
      sectorLabel:         "SECTOR:",
      orbitEstablishing:   "ESTABLECIENDO ÓRBITA...",
      skipVideo:           "OMITIR TRANSMISIÓN ⟫",
      hudSector:           "SECTOR",
      hudObject:           "OBJETO",
      signalBattery:       "ESTABILIDAD DE SEÑAL / BATERÍA",
      hudData:             "DATOS:",
      abortGame:           "VOLVER AL MUSEO",
      controlsHint:        "Usa <strong>W A S D</strong> o las <strong>Flechas</strong>. Recoge los <strong>3 datos</strong>, recarga en las <strong>balizas</strong> y alcanza el <strong>hardware</strong>.",
      signalRestored:      "● SEÑAL RESTAURADA Y ARCHIVADA EN EL MUSEO",
      voiceLog:            "Bitácora de Voz Recuperada",
      autoVoiceLog:        "🔊 Bitácora de voz automatizada:",
      listenNarration:     "▶ ESCUCHAR NARRACIÓN",
      saveAndContinue:     "GUARDAR EN EL MUSEO Y CONTINUAR",
      nasaArchive:         "ARCHIVO HISTÓRICO NASA",
      objectName:          "NOMBRE DEL OBJETO",
      yearLocation:        "Año • Ubicación",
      educationalStory:    "Historia educativa...",

      /* Museo page */
      museumArchive:       "ARCHIVO DEL MUSEO:",
      communityNasa:       "📡 COMUNIDAD & NASA",
      accessRestricted:    "ACCESO RESTRINGIDO // NIVEL DE AUTORIZACIÓN INSUFICIENTE",
      museumLocked:        "SALA PRINCIPAL DEL MUSEO BLOQUEADA",
      museumLockedBody:    "Para abrir la exhibición completa con toda la información histórica, fotografías y registros recuperados, primero debes restaurar las <strong>15 señales perdidas</strong> en los minijuegos de La Luna, Marte y Espacio Profundo.",
      rescueSignalBtn:     "IR A RESCATAR SEÑALES",
      museumCompleted:     "ARCHIVO OFICIAL COMPLETADO // 15 DE 15 SEÑALES RESTAURADAS",
      museumTitle:         "MUSEO INTERACTIVO CTRL SOCIETY",
      museumSubtitle:      "Colección completa de naves, rovers, instrumentos científicos y objetos orbitales recuperados",
      filterAllPieces:     "TODAS LAS PIEZAS (15)",
      filterLuna:          "LA LUNA (4)",
      filterMarte:         "MARTE (5)",
      filterEspacio:       "ESPACIO (6)",

      /* Comunidad page */
      comunidadHudTag:     "NASA SPACE APPS CHALLENGE 2026 // RED COMUNITARIA & TELEMETRÍA",
      comunidadTitle:      "CTRL SOCIETY // COMUNIDAD",
      comunidadSubtitle:   "Transmisiones en vivo vía NASA API, bitácora de misiones espaciales y foro abierto para exploradores del cosmos.",
      teleNetwork:         "RED TELEMÉTRICA:",
      online:              "EN LÍNEA",
      visitMuseumBtn:      "🏛️ VISITAR MUSEO",
      tabNasa:             "ACTUALIZACIONES & MISIONES NASA",
      tabForum:            "FORO DE EXPLORADORES",
      apodLive:            "● APOD EN VIVO (NASA API)",
      loadingDate:         "CARGANDO FECHA...",
      connectingDSN:       "Conectando con la Red de Espacio Profundo...",
      receivingData:       "Recibiendo paquete de datos científicos desde el archivo de astrofísica de la NASA...",
      shareInForum:        "💬 COMPARTIR EN EL FORO",
      filterAll:           "TODAS LAS MISIONES",
      filterArtemis:       "🚀 ARTEMIS & LUNA",
      filterMarte2:        "🔴 MARTE ROVER",
      filterJwst:          "🔭 TELESCOPIO WEBB",
      filterVoyager:       "🛰️ ESPACIO PROFUNDO",
      issFilter:           "🛸 EEI / ORBITAL",
      searchPlaceholder:   "Buscar misión, rover o satélite...",
      syncBtn:             "🔄 SINCRONIZAR",
      syncTitle:           "Sintonizar de nuevo con API de la NASA",
      tuningTelescope:     "Sintonizando telescopio orbital...",
      statTransmissions:   "TRANSMISIONES REGISTRADAS",
      statTuned:           "FRECUENCIAS SINTONIZADAS",
      linkActive:          "ENLACE ACTIVO",
      communityChannel:    "CANAL COMUNITARIO ABIERTO",
      newTransmission:     "📡 EMITIR NUEVA TRANSMISIÓN",
      publicChannel:       "CANAL PÚBLICO DE TELEMETRÍA",
      authorLabel:         "TU DISTINTIVO O NOMBRE DE EXPLORADOR:",
      authorPlaceholder:   "Ej. Cadete_Astro26 o Ing. Ramirez",
      roleLabel:           "ROL O ESPECIALIDAD ESPACIAL:",
      rolePlaceholder:     "Ej. Piloto Orbital / Astrónomo Aficionado",
      avatarLabel:         "ELIGE TU AVATAR ESPACIAL:",
      tagLabel:            "FRECUENCIA / CATEGORÍA DEL TEMA:",
      tagMuseum:           "🏛️ SEÑALES DEL MUSEO (CTRL SOCIETY)",
      tagMissions:         "🔴 MISIONES & ROVERS (MARTE/LUNA)",
      tagTheories:         "🌌 TEORÍAS & ESPACIO PROFUNDO",
      tagNasa:             "🛰️ EVENTOS & LANZAMIENTOS NASA",
      tagGeneral:          "💬 CHARLA DE EXPLORADORES",
      titleLabel:          "TÍTULO DE LA TRANSMISIÓN:",
      titlePlaceholder:    "Ej. Mi teoría sobre la señal recuperada del rover Sojourner",
      messageLabel:        "MENSAJE / OBSERVACIÓN DE CAMPO:",
      messagePlaceholder:  "Escribe tu mensaje, hipótesis, saludo o análisis espacial para la tripulación...",
      transmitBtn:         "🚀 TRANSMITIR A LA RED ESPACIAL",
      filterAllForumTransmissions: "TODAS LAS TRANSMISIONES",
      filterMuseumForum:   "🏛️ SEÑALES MUSEO",
      filterMissionsForum: "🔴 MISIONES & ROVERS",
      filterTheoriesForum: "🌌 TEORÍAS ESPACIALES",
      filterEventsForum:   "🛰️ EVENTOS NASA",
      modalNasaRecord:     "REGISTRO NASA OFICIAL",
      modalNoDate:         "FECHA NO ESPECIFICADA",
      modalLoadingTele:    "Cargando telemetría...",
      modalNasaPhoto:      "Fotografía NASA",
      closeVisor:          "CERRAR VISOR",
      quoteInForum:        "💬 CITAR EN EL FORO",
      ariaCloseModal:      "Cerrar telemetría",

      /* Toasts */
      toastChannelTuning:  "📡 Sintonizando canal: {channel}...",
      toastSatTuning:      "📡 Sintonizando señal satelital de la NASA...",
      toastNasaSuccess:    "🟢 Telemetría NASA actualizada con éxito.",
      toastLocalArchive:   "📡 Conexión local activa (Archivo NASA verificado).",
      toastFillFields:     "⚠️ Por favor completa los campos de autor, título y mensaje.",
      toastSuccessTransmit:"🚀 ¡Frecuencia transmitida con éxito a la red de Ctrl Society!",
      toastTunedFreq:      "❤️ Frecuencia sintonizada (+1 Señal).",
      toastReplySent:      "💬 Respuesta transmitida en la red.",
      toastTelemetryLoaded:"📝 Se ha cargado la telemetría en el formulario del foro.",

      /* Minigames HUD & Physics */
      levelHudLabel:        "NIVEL",
      minigameLabelLuna:    "GRAVEDAD LUNAR · INERCIA BAJA",
      minigameLabelMarte:   "TORMENTA MARCIANA · RÁFAGAS DE VIENTO",
      minigameLabelEspacio: "GRAVEDAD CERO · ESCOMBROS ORBITALES",
      minigameCollision:    "💥 IMPACTO: PÉRDIDA DE SEÑAL",
      minigameLowBattery:   "⚠️ BATERÍA CRÍTICA",
      minigameDataCollected:"📦 DATO RECUPERADO",
      minigameReboot:       "🔄 SEÑAL PERDIDA - REINICIANDO",
      minigameComplete:     "🎯 OBJETIVO ALCANZADO // SEÑAL RESCATADA",
      coordinatesLabel:     "COORDENADAS:",

      /* Comunidad dynamic cards & NASA */
      viewTelemetry:        "🔍 VER TELEMETRÍA",
      quoteInForumBtn:      "💬 CITAR EN FORO",
      categoryArtemis:      "ARTEMIS & LUNA",
      categoryMarte:        "MARTE ROVER",
      categoryIngenuity:    "MARTE INGENUITY",
      categoryJwst:         "TELESCOPIO WEBB",
      categoryVoyager:      "ESPACIO PROFUNDO",
      categoryIss:          "EEI / ORBITAL",
      categoryNasa:         "MISIÓN NASA",
      apodTelemetryBadge:   "📡 APOD (TELEMETRÍA NASA)",
      apodDateLabel:        "FECHA: {date} // CRÉDITOS: {credits}",
      apodDefaultTitle:     "Fotografía Astronómica del Día",
      noMissionsFound:      "NO SE DETECTÓ SEÑAL CON ESOS CRITERIOS",
      noMissionsSub:        "Prueba buscando otro término como 'Marte', 'Artemis', 'Webb' o 'Apolo'.",
      noTransmissions:      "NO HAY TRANSMISIONES EN ESTA BANDA",
      noTransmissionsSub:   "Sé el primer explorador en emitir un reporte usando el formulario superior.",
      tunedBtn:             "Sintonizado",
      tuneBtn:              "Sintonizar",
      repliesLabel:         "Respuestas",
      replyBtn:             "Responder",
      broadcastReplyBtn:    "Transmitir",
      replyPlaceholder:     "Transmitir respuesta a la tripulación...",
      modalDateLabel:       "FECHA / CENTRO: {date} // ID: {id}",

      /* Sector cinematic phases */
      phase1Decel:         "FASE 1 // DESACELERACIÓN ORBITAL",
      phase2Entry:         "FASE 2 // ENTRADA ATMOSFÉRICA",
      phase3Landing:       "FASE 3 // TRAYECTORIA DE DESCENSO",
      phase4Lock:          "FASE 4 // SEÑAL BLOQUEADA",
      phase5Access:        "FASE 5 // ACCESO CONCEDIDO",

      /* Dynamic card / modal labels */
      signalRestoredBadge: "SEÑAL RESTAURADA",
      signalLostBadge:     "SEÑAL PERDIDA",
      activeSignal:        "SEÑAL ACTIVA",
      repeatMissionBtn:    "REPETIR MISIÓN DE RESCATE",
      rescueSignalBtn:     "IR A RESCATAR SEÑALES",
      stopNarration:       "⏹ DETENER NARRACIÓN",
      missionReadyHook:    "Misión espacial lista para restaurar su telemetría.",
      inOrbit:             "MISIONES EN ÓRBITA",
    },

    en: {
      /* HUD / Header */
      hudTag:              "NASA SPACE APPS CHALLENGE 2026 // INTERACTIVE SIGNAL MUSEUM",
      heroSubtitle:        "Restoring the signal to the",
      heroEmphasis:        "forgotten heroes",
      heroRest:            "of space exploration",
      restoredInMuseum:    "SIGNALS RESTORED IN MUSEUM:",
      visitMuseum:         "VISIT MUSEUM",
      communityBtn:        "COMMUNITY & NASA",

      /* Hub – carousel */
      sectorCode1:         "SECTOR 01 / 03",
      sectorCode2:         "SECTOR 02 / 03",
      sectorCode3:         "SECTOR 03 / 03",
      signals4:            "0 / 4 SIGNALS",
      signals5:            "0 / 5 SIGNALS",
      touchOrbit:          "📡 TAP FOR ORBIT",
      lunaTitle:           "THE MOON",
      lunaHook:            "384,400 km • Footprints of the Apollo & Surveyor Programs",
      exploreLuna:         "EXPLORE LUNAR SECTOR",
      marteTitle:          "MARS",
      marteHook:           "225 Million km • Rovers, Landers & Ingenuity",
      exploreMarte:        "EXPLORE MARS SECTOR",
      espacioTitle:        "DEEP SPACE",
      espacioHook:         "Beyond orbit • Pioneer probes and world hunters",
      exploreEspacio:      "EXPLORE DEEP SPACE",
      indicator1:          "01 • THE MOON",
      indicator2:          "02 • MARS",
      indicator3:          "03 • DEEP SPACE",
      prevSector:          "Previous sector",
      nextSector:          "Next sector",
      ariaCarousel:        "Space Museum Sectors",
      ariaSelectSector:    "Select sector",
      ariaOrbitLuna:       "Missions in lunar orbit",
      ariaOrbitMarte:      "Missions in Martian orbit",
      ariaOrbitEspacio:    "Missions in deep space orbit",
      ariaLunaBtn:         "Select The Moon to view missions in orbit",
      ariaMarteBtn:        "Select Mars to view missions in orbit",
      ariaEspacioBtn:      "Select Deep Space to view missions in orbit",

      /* Hub – footer */
      footerTag:           "CTRL SOCIETY // NASA SPACE APPS CHALLENGE 2026",
      footerCredit:        "Lead developer:",
      footerTeam:          "· In collaboration with the CTRL Society team",

      /* Sector page */
      backToSectors:       "⬅ BACK TO SECTOR BOARD",
      backToControlCenter: "⬅ BACK TO CONTROL CENTER",
      communityLink:       "📡 COMMUNITY",
      sectorCodeLabel:     "SECTOR 01 // EXHIBITION HALL",
      archiveActive:       "● ACTIVE ARCHIVE",
      tabGeneral:          "📖 GENERAL INFORMATION",
      tabTechnical:        "⚙️ TECHNICAL INFORMATION",
      abandonedHardware:   "HARDWARE ABANDONED IN THIS SECTOR",
      abandonedSubtitle:   "Select an object to launch the tracking drone and recover its official NASA history",
      sectorLabel:         "SECTOR:",
      orbitEstablishing:   "ESTABLISHING ORBIT...",
      skipVideo:           "SKIP TRANSMISSION ⟫",
      hudSector:           "SECTOR",
      hudObject:           "OBJECT",
      signalBattery:       "SIGNAL STABILITY / BATTERY",
      hudData:             "DATA:",
      abortGame:           "BACK TO MUSEUM",
      controlsHint:        "Use <strong>W A S D</strong> or the <strong>Arrow keys</strong>. Collect the <strong>3 data packets</strong>, recharge at the <strong>beacons</strong> and reach the <strong>hardware</strong>.",
      signalRestored:      "● SIGNAL RESTORED AND ARCHIVED IN MUSEUM",
      voiceLog:            "Recovered Voice Log",
      autoVoiceLog:        "🔊 Automated voice log:",
      listenNarration:     "▶ LISTEN TO NARRATION",
      saveAndContinue:     "SAVE TO MUSEUM AND CONTINUE",
      nasaArchive:         "NASA HISTORICAL ARCHIVE",
      objectName:          "OBJECT NAME",
      yearLocation:        "Year • Location",
      educationalStory:    "Educational story...",

      /* Museo page */
      museumArchive:       "MUSEUM ARCHIVE:",
      communityNasa:       "📡 COMMUNITY & NASA",
      accessRestricted:    "RESTRICTED ACCESS // INSUFFICIENT AUTHORIZATION LEVEL",
      museumLocked:        "MAIN MUSEUM HALL LOCKED",
      museumLockedBody:    "To open the full exhibition with all historical information, photographs and recovered records, you must first restore the <strong>15 lost signals</strong> in the minigames for The Moon, Mars and Deep Space.",
      rescueSignalBtn:     "GO RESCUE SIGNALS",
      museumCompleted:     "OFFICIAL ARCHIVE COMPLETED // 15 OF 15 SIGNALS RESTORED",
      museumTitle:         "CTRL SOCIETY INTERACTIVE MUSEUM",
      museumSubtitle:      "Complete catalog of recovered spacecraft, rovers, scientific instruments, and orbital artifacts",
      filterAllPieces:     "ALL PIECES (15)",
      filterLuna:          "THE MOON (4)",
      filterMarte:         "MARS (5)",
      filterEspacio:       "SPACE (6)",

      /* Comunidad page */
      comunidadHudTag:     "NASA SPACE APPS CHALLENGE 2026 // COMMUNITY NETWORK & TELEMETRY",
      comunidadTitle:      "CTRL SOCIETY // COMMUNITY",
      comunidadSubtitle:   "Live transmissions via NASA API, space mission log, and open forum for cosmos explorers.",
      teleNetwork:         "TELEMETRY NETWORK:",
      online:              "ONLINE",
      visitMuseumBtn:      "🏛️ VISIT MUSEUM",
      tabNasa:             "UPDATES & NASA MISSIONS",
      tabForum:            "EXPLORERS FORUM",
      apodLive:            "● APOD LIVE (NASA API)",
      loadingDate:         "LOADING DATE...",
      connectingDSN:       "Connecting to the Deep Space Network...",
      receivingData:       "Receiving scientific data packet from the NASA astrophysics archive...",
      shareInForum:        "💬 SHARE IN FORUM",
      filterAll:           "ALL MISSIONS",
      filterArtemis:       "🚀 ARTEMIS & MOON",
      filterMarte2:        "🔴 MARS ROVER",
      filterJwst:          "🔭 WEBB TELESCOPE",
      filterVoyager:       "🛰️ DEEP SPACE",
      issFilter:           "🛸 ISS / ORBITAL",
      searchPlaceholder:   "Search mission, rover or satellite...",
      syncBtn:             "🔄 SYNC",
      syncTitle:           "Re-sync with NASA API",
      tuningTelescope:     "Tuning orbital telescope...",
      statTransmissions:   "REGISTERED TRANSMISSIONS",
      statTuned:           "TUNED FREQUENCIES",
      linkActive:          "LINK ACTIVE",
      communityChannel:    "COMMUNITY CHANNEL OPEN",
      newTransmission:     "📡 BROADCAST NEW TRANSMISSION",
      publicChannel:       "PUBLIC TELEMETRY CHANNEL",
      authorLabel:         "YOUR CALLSIGN OR EXPLORER NAME:",
      authorPlaceholder:   "e.g. Cadet_Astro26 or Eng. Ramirez",
      roleLabel:           "ROLE OR SPACE SPECIALTY:",
      rolePlaceholder:     "e.g. Orbital Pilot / Amateur Astronomer",
      avatarLabel:         "CHOOSE YOUR SPACE AVATAR:",
      tagLabel:            "FREQUENCY / TOPIC CATEGORY:",
      tagMuseum:           "🏛️ MUSEUM SIGNALS (CTRL SOCIETY)",
      tagMissions:         "🔴 MISSIONS & ROVERS (MARS/MOON)",
      tagTheories:         "🌌 THEORIES & DEEP SPACE",
      tagNasa:             "🛰️ NASA EVENTS & LAUNCHES",
      tagGeneral:          "💬 EXPLORERS CHAT",
      titleLabel:          "TRANSMISSION TITLE:",
      titlePlaceholder:    "e.g. My theory on the recovered Sojourner rover signal",
      messageLabel:        "MESSAGE / FIELD OBSERVATION:",
      messagePlaceholder:  "Write your message, hypothesis, greeting or space analysis for the crew...",
      transmitBtn:         "🚀 TRANSMIT TO SPACE NETWORK",
      filterAllForumTransmissions: "ALL TRANSMISSIONS",
      filterMuseumForum:   "🏛️ MUSEUM SIGNALS",
      filterMissionsForum: "🔴 MISSIONS & ROVERS",
      filterTheoriesForum: "🌌 SPACE THEORIES",
      filterEventsForum:   "🛰️ NASA EVENTS",
      modalNasaRecord:     "OFFICIAL NASA RECORD",
      modalNoDate:         "DATE NOT SPECIFIED",
      modalLoadingTele:    "Loading telemetry...",
      modalNasaPhoto:      "NASA Photograph",
      closeVisor:          "CLOSE VIEWER",
      quoteInForum:        "💬 QUOTE IN FORUM",
      ariaCloseModal:      "Close telemetry",

      /* Toasts */
      toastChannelTuning:  "📡 Tuning into channel: {channel}...",
      toastSatTuning:      "📡 Tuning to NASA satellite signal...",
      toastNasaSuccess:    "🟢 NASA telemetry updated successfully.",
      toastLocalArchive:   "📡 Local fallback active (Verified NASA Archive).",
      toastFillFields:     "⚠️ Please complete the author, title, and message fields.",
      toastSuccessTransmit:"🚀 Transmission broadcasted successfully to Ctrl Society!",
      toastTunedFreq:      "❤️ Frequency tuned (+1 Signal).",
      toastReplySent:      "💬 Reply transmitted to network.",
      toastTelemetryLoaded:"📝 Telemetry loaded into forum form.",

      /* Minigames HUD & Physics */
      levelHudLabel:        "LEVEL",
      minigameLabelLuna:    "LUNAR GRAVITY · LOW INERTIA",
      minigameLabelMarte:   "MARTIAN STORM · WIND GUSTS",
      minigameLabelEspacio: "ZERO GRAVITY · ORBITAL DEBRIS",
      minigameCollision:    "💥 IMPACT: SIGNAL LOSS",
      minigameLowBattery:   "⚠️ CRITICAL BATTERY",
      minigameDataCollected:"📦 DATA PACKET RECOVERED",
      minigameReboot:       "🔄 SIGNAL LOST - REBOOTING",
      minigameComplete:     "🎯 TARGET REACHED // SIGNAL RESTORED",
      coordinatesLabel:     "COORDINATES:",

      /* Comunidad dynamic cards & NASA */
      viewTelemetry:        "🔍 VIEW TELEMETRY",
      quoteInForumBtn:      "💬 QUOTE IN FORUM",
      categoryArtemis:      "ARTEMIS & MOON",
      categoryMarte:        "MARS ROVER",
      categoryIngenuity:    "MARS INGENUITY",
      categoryJwst:         "WEBB TELESCOPE",
      categoryVoyager:      "DEEP SPACE",
      categoryIss:          "ISS / ORBITAL",
      categoryNasa:         "NASA MISSION",
      apodTelemetryBadge:   "📡 APOD (NASA TELEMETRY)",
      apodDateLabel:        "DATE: {date} // CREDITS: {credits}",
      apodDefaultTitle:     "Astronomy Picture of the Day",
      noMissionsFound:      "NO SIGNAL DETECTED MATCHING CRITERIA",
      noMissionsSub:        "Try searching for another term like 'Mars', 'Artemis', 'Webb', or 'Apollo'.",
      noTransmissions:      "NO TRANSMISSIONS IN THIS BAND",
      noTransmissionsSub:   "Be the first explorer to broadcast a report using the form above.",
      tunedBtn:             "Tuned",
      tuneBtn:              "Tune in",
      repliesLabel:         "Replies",
      replyBtn:             "Reply",
      broadcastReplyBtn:    "Broadcast",
      replyPlaceholder:     "Broadcast reply to the crew...",
      modalDateLabel:       "DATE / CENTER: {date} // ID: {id}",

      /* Sector cinematic phases */
      phase1Decel:         "PHASE 1 // ORBITAL DECELERATION",
      phase2Entry:         "PHASE 2 // ATMOSPHERIC ENTRY",
      phase3Landing:       "PHASE 3 // DESCENT TRAJECTORY",
      phase4Lock:          "PHASE 4 // SIGNAL LOCKED",
      phase5Access:        "PHASE 5 // ACCESS GRANTED",

      /* Dynamic card / modal labels */
      signalRestoredBadge: "SIGNAL RESTORED",
      signalLostBadge:     "LOST SIGNAL",
      activeSignal:        "ACTIVE SIGNAL",
      repeatMissionBtn:    "REPEAT RESCUE MISSION",
      rescueSignalBtn:     "GO RESCUE SIGNALS",
      stopNarration:       "⏹ STOP NARRATION",
      missionReadyHook:    "Mission ready to restore its telemetry.",
      inOrbit:             "MISSIONS IN ORBIT",
    }
  };

  /* ─── ENGINE ─── */
  const STORAGE_KEY = "lost_signal_lang";

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || "es";
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function t(key, vars) {
    const lang = getLang();
    const dict = DICT[lang] || DICT.es;
    let str = dict[key] !== undefined ? dict[key] : (DICT.es[key] || key);
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.replace("{" + k + "}", vars[k]);
      });
    }
    return str;
  }

  /* ─── DOM UPDATER ─── */
  function applyLang() {
    const lang = getLang();

    /* text nodes */
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      const val = t(key);
      /* allow embedded HTML only for known safe keys */
      if (key === "controlsHint" || key === "museumLockedBody") {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });

    /* placeholders */
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });

    /* aria-labels */
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });

    /* title attributes */
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      el.title = t(el.getAttribute("data-i18n-title"));
    });

    /* html[lang] */
    document.documentElement.lang = lang;

    /* update toggle button label */
    const btn = document.getElementById("btn-language-toggle");
    if (btn) {
      btn.textContent = lang === "es" ? "🇺🇸 English" : "🇲🇽 Español";
      btn.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a Español");
    }
  }

  /* ─── TOGGLE ─── */
  function toggle() {
    const next = getLang() === "es" ? "en" : "es";
    setLang(next);
    applyLang();
    document.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang: next } }));
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang: next } }));
  }

  /* ─── BUTTON INJECTION ─── */
  function injectButton() {
    if (document.getElementById("btn-language-toggle")) {
      /* already in HTML – just wire the click */
      document.getElementById("btn-language-toggle").addEventListener("click", toggle);
      return;
    }
    const btn = document.createElement("button");
    btn.id = "btn-language-toggle";
    btn.className = "btn-lang-floating";
    btn.type = "button";
    btn.textContent = getLang() === "es" ? "🇺🇸 English" : "🇲🇽 Español";
    btn.setAttribute("aria-label", "Toggle language");
    btn.addEventListener("click", toggle);
    document.body.appendChild(btn);
  }

  /* ─── INIT ─── */
  function init() {
    injectButton();
    applyLang();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* ─── PUBLIC API ─── */
  window.I18N = {
    t: t,
    getLang: getLang,
    setLang: function (lang) { setLang(lang); applyLang(); },
    toggle: toggle,
    applyLang: applyLang,
    getActiveLang: getLang  /* alias for data.js compatibility */
  };
})();
