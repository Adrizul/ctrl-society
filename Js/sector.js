/* ─────────────────────────────────────────────
   CTRL SOCIETY · sector.js  (bilingual)
   Uses getSector() / getObject() from data.js
   Re-renders on "languageChanged" event
───────────────────────────────────────────── */

const params    = new URLSearchParams(window.location.search);
const sectorKey = SECTORS_DATA[params.get("sector")] ? params.get("sector") : "luna";

const savedIds   = JSON.parse(localStorage.getItem("lost_signal_restored") || "[]");
const restoredSet = new Set(savedIds);
let currentObject = null;   /* raw object from SECTORS_DATA */
let isLaunchingGame = false;

/* ─── helpers ─── */
function t(key, vars) {
  return (typeof I18N !== "undefined") ? I18N.t(key, vars) : key;
}
function isEn() {
  return (typeof I18N !== "undefined") && I18N.getLang() === "en";
}

function saveProgress() {
  localStorage.setItem("lost_signal_restored", JSON.stringify([...restoredSet]));
}

/* ─── VIEWS ─── */
const views = {
  museum: document.getElementById("view-museum"),
  video:  document.getElementById("view-video"),
  game:   document.getElementById("view-game")
};

function showView(name) {
  Object.values(views).forEach((v) => v.classList.add("hidden"));
  views[name].classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ─── RENDER MUSEUM PAGE ─── */
function renderMuseumPage() {
  const sector = getSector(sectorKey);  /* localized */
  if (!sector) return;

  document.title = `${sector.title} | Museo CTRL SOCIETY`;
  document.getElementById("sector-code-label").textContent  = sector.code;
  document.getElementById("sector-title").textContent       = sector.title;
  document.getElementById("sector-tagline").textContent     = sector.tagline;
  document.getElementById("sector-coordinates").textContent = sector.coordinates;
  document.getElementById("sector-banner-emoji").textContent = sector.emoji;

  const bannerImg = document.getElementById("sector-banner-img");
  bannerImg.src = sector.bannerImg;
  bannerImg.onload = () => {
    document.getElementById("sector-banner-emoji").style.display = "none";
  };

  /* archive status label */
  const archiveSpan = document.querySelector(".exhibit-caption .live-dot");
  if (archiveSpan) archiveSpan.textContent = t("archiveActive");

  document.getElementById("sector-general-text").textContent = sector.generalText;
  document.getElementById("sector-highlights").innerHTML = sector.highlights
    .map((h) => `
      <div class="highlight-box">
        <strong>${h.title}</strong>
        <span>${h.text}</span>
      </div>`)
    .join("");

  const galleryEl = document.getElementById("sector-gallery");
  if (galleryEl && sector.gallery) {
    galleryEl.innerHTML = sector.gallery
      .map((item) => `
        <figure class="gallery-thumb">
          <img src="${item.src}" alt="${item.caption}" onerror="this.parentElement.style.display='none'" />
          <figcaption><span>${item.caption}</span></figcaption>
        </figure>`)
      .join("");
  }

  document.getElementById("sector-tech-intro").textContent = sector.techIntro;
  document.getElementById("sector-tech-grid").innerHTML = sector.techSpecs
    .map((spec) => `
      <div class="tech-spec-item">
        <span class="spec-label">${spec.label}</span>
        <span class="spec-value">${spec.value}</span>
      </div>`)
    .join("");

  /* HUD section / tab buttons */
  const tabGeneral   = document.querySelector("[data-tab='general']");
  const tabTechnical = document.querySelector("[data-tab='technical']");
  if (tabGeneral)   tabGeneral.textContent   = t("tabGeneral");
  if (tabTechnical) tabTechnical.textContent = t("tabTechnical");

  /* Objects section header */
  const abanH2 = document.querySelector(".objects-section-header h2");
  const abanP  = document.querySelector(".objects-section-header p");
  if (abanH2) abanH2.textContent = t("abandonedHardware");
  if (abanP)  abanP.textContent  = t("abandonedSubtitle");

  renderObjectCards();
}

/* ─── RENDER OBJECT CARDS ─── */
function renderObjectCards() {
  const rawSector = SECTORS_DATA[sectorKey];
  if (!rawSector) return;

  const total = rawSector.objects.length;
  const count = rawSector.objects.filter((o) => restoredSet.has(o.id)).length;
  document.getElementById("sector-progress-count").textContent = `${count} / ${total}`;

  const grid = document.getElementById("sector-objects-grid");
  grid.innerHTML = "";

  rawSector.objects.forEach((rawObj) => {
    const obj = getObject(rawObj);   /* localized */
    const isRestored = restoredSet.has(rawObj.id);

    const signalBadge = isRestored
      ? (isEn() ? "SIGNAL RESTORED" : "SEÑAL RESTAURADA")
      : (isEn() ? "LOST SIGNAL"     : "SEÑAL PERDIDA");
    const btnLabel = isRestored
      ? t("repeatMissionBtn") || (isEn() ? "REPEAT RESCUE MISSION" : "REPETIR MISIÓN DE RESCATE")
      : t("rescueSignalBtn")  || (isEn() ? "RESCUE SIGNAL"         : "RESCATAR SEÑAL");
    const sourceLabel = isEn() ? "Source" : "Fuente";

    const card = document.createElement("article");
    card.className = "mission-card";
    card.innerHTML = `
      <div class="card-top">
        <span class="mission-code">${obj.code}</span>
        <span class="status-badge ${isRestored ? "restored" : "lost"}">
          ${signalBadge}
        </span>
      </div>

      <div class="hologram-stage">
        <div class="holo-ring"></div>
        <div class="holo-avatar ${isRestored ? "is-restored" : "is-locked"}">
          <img
            src="${rawObj.img}"
            alt="${obj.name}"
            onload="this.nextElementSibling.style.display='none'"
            onerror="this.style.display='none'"
          />
          <span class="fallback-icon">${rawObj.emoji}</span>
        </div>
        <div class="holo-base"></div>
      </div>

      <div class="card-body">
        <h2>${obj.name}</h2>
        <p class="mission-meta">${obj.year}</p>
        <p class="mission-desc">${obj.shortDesc}</p>
        <p class="source-tag">${sourceLabel}: ${rawObj.source}</p>
      </div>

      <button class="btn-mission">
        <span>${btnLabel}</span>
        <span class="arrow">➔</span>
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => startObjectMission(rawObj));
    grid.appendChild(card);
  });
}

/* ─── TABS ─── */
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    const target = btn.getAttribute("data-tab");
    document.getElementById("tab-general").classList.toggle("hidden",   target !== "general");
    document.getElementById("tab-technical").classList.toggle("hidden", target !== "technical");
  });
});

/* ─── MISSION FLOW + CINEMATIC ─── */
const videoEl = document.getElementById("intro-video");

function triggerMinigameTransition() {
  if (isLaunchingGame || !currentObject) return;
  isLaunchingGame = true;

  if (typeof BF2Cinematics !== "undefined") {
    const localObj = getObject(currentObject);
    BF2Cinematics.playMinigameLockOn(localObj.name.toUpperCase(), () => {
      isLaunchingGame = false;
      startMinigameView();
    });
  } else {
    isLaunchingGame = false;
    startMinigameView();
  }
}

function startObjectMission(rawObj) {
  currentObject = rawObj;
  isLaunchingGame = false;
  triggerMinigameTransition();
}

videoEl.addEventListener("ended", triggerMinigameTransition);
videoEl.addEventListener("error", triggerMinigameTransition);
document.getElementById("btn-skip-video").addEventListener("click", () => {
  videoEl.pause();
  triggerMinigameTransition();
});

document.getElementById("btn-abort-game").addEventListener("click", () => {
  isLaunchingGame = false;
  MinigameEngine.stop();
  showView("museum");
});

function startMinigameView() {
  const sector    = getSector(sectorKey);
  const localObj  = getObject(currentObject);
  document.getElementById("hud-sector-name").textContent   = `${t("hudSector")}: ${sector.title}`;
  document.getElementById("hud-mission-title").textContent = localObj.name.toUpperCase();
  showView("game");

  MinigameEngine.start({
    bgColors: SECTORS_DATA[sectorKey].bgColors,
    emoji:    currentObject.emoji,
    onComplete: openDiscoveryModal
  });
}

/* ─── WEB SPEECH (TTS) ─── */
const modalEl = document.getElementById("modal-discovery");

function setupTtsButton() {
  let btn = document.getElementById("btn-tts-toggle");
  if (!btn) {
    const oldAudio = document.getElementById("discovery-audio");
    btn = document.createElement("button");
    btn.type      = "button";
    btn.id        = "btn-tts-toggle";
    btn.className = "btn-tts";
    btn.textContent = t("listenNarration");
    if (oldAudio && oldAudio.parentNode) {
      oldAudio.parentNode.replaceChild(btn, oldAudio);
    }
  }
  return btn;
}

const ttsBtn = setupTtsButton();

if ("speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

function resetTtsButton() {
  if (!ttsBtn) return;
  ttsBtn.textContent = t("listenNarration");
  ttsBtn.classList.remove("is-speaking");
}

function stopStorySpeech() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  resetTtsButton();
}

function toggleStorySpeech() {
  if (!("speechSynthesis" in window)) {
    alert(isEn()
      ? "Your browser does not support automatic voice reading."
      : "Tu navegador no soporta lectura de voz automática.");
    return;
  }
  if (window.speechSynthesis.speaking) { stopStorySpeech(); return; }

  window.speechSynthesis.cancel();

  /* Get localized text for the current object */
  const localObj  = getObject(currentObject);
  const textToRead = `${localObj.name}. ${localObj.story}`;
  const utterance  = new SpeechSynthesisUtterance(textToRead);
  const voices     = window.speechSynthesis.getVoices();

  if (isEn()) {
    const enVoice =
      voices.find((v) => v.lang.includes("en-US")) ||
      voices.find((v) => v.lang.startsWith("en"));
    if (enVoice) utterance.voice = enVoice;
    utterance.lang = "en-US";
  } else {
    const esVoice =
      voices.find((v) => v.lang.includes("es-MX")) ||
      voices.find((v) => v.lang.includes("es-US")) ||
      voices.find((v) => v.lang.startsWith("es"));
    if (esVoice) utterance.voice = esVoice;
    utterance.lang = "es-MX";
  }

  utterance.rate  = 1.02;
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    ttsBtn.textContent = isEn() ? "⏹ STOP NARRATION" : "⏹ DETENER NARRACIÓN";
    ttsBtn.classList.add("is-speaking");
  };
  utterance.onend   = resetTtsButton;
  utterance.onerror = resetTtsButton;

  window.speechSynthesis.speak(utterance);
}

if (ttsBtn) ttsBtn.addEventListener("click", toggleStorySpeech);

/* ─── DISCOVERY MODAL ─── */
function openDiscoveryModal() {
  restoredSet.add(currentObject.id);
  saveProgress();

  const localObj = getObject(currentObject);
  const sourceLabel = isEn() ? "SOURCE" : "FUENTE";

  document.getElementById("discovery-title").textContent = localObj.name.toUpperCase();
  document.getElementById("discovery-meta").textContent  = localObj.year;
  document.getElementById("discovery-story").textContent = localObj.story;
  document.getElementById("discovery-img").src           = currentObject.realPhoto;
  document.getElementById("discovery-source").textContent = `${sourceLabel}: ${currentObject.source.toUpperCase()}`;

  /* update static modal labels */
  const signalBadge = document.querySelector(".badge-restored");
  if (signalBadge) signalBadge.textContent = t("signalRestored");
  const voiceLogH3 = document.querySelector(".story-box h3");
  if (voiceLogH3) voiceLogH3.textContent = t("voiceLog");
  const voiceLabel = document.querySelector(".audio-box label");
  if (voiceLabel) voiceLabel.textContent = t("autoVoiceLog");
  const saveBtn = document.getElementById("btn-return-sector");
  if (saveBtn) {
    const span = saveBtn.querySelector("span") || saveBtn;
    span.textContent = t("saveAndContinue");
  }

  stopStorySpeech();
  modalEl.classList.remove("hidden");
}

function closeDiscoveryModal() {
  stopStorySpeech();
  modalEl.classList.add("hidden");
  renderObjectCards();
  showView("museum");
}

window.addEventListener("beforeunload", stopStorySpeech);
document.getElementById("btn-close-modal").addEventListener("click",    closeDiscoveryModal);
document.getElementById("btn-return-sector").addEventListener("click",  closeDiscoveryModal);

/* ─── LANGUAGE CHANGED: re-render everything ─── */
window.addEventListener("languageChanged", () => {
  renderMuseumPage();
  /* if modal is open, refresh its content */
  if (currentObject && !modalEl.classList.contains("hidden")) {
    openDiscoveryModal();
  }
  /* sync TTS button label */
  if (ttsBtn && !ttsBtn.classList.contains("is-speaking")) {
    ttsBtn.textContent = t("listenNarration");
  }
  /* HUD game labels (if game view is active) */
  if (!views.game.classList.contains("hidden") && currentObject) {
    const sector   = getSector(sectorKey);
    const localObj = getObject(currentObject);
    document.getElementById("hud-sector-name").textContent   = `${t("hudSector")}: ${sector.title}`;
    document.getElementById("hud-mission-title").textContent = localObj.name.toUpperCase();
    const sigLabel = document.querySelector(".signal-meter-label span");
    if (sigLabel) sigLabel.textContent = t("signalBattery");
    const dataLabel = document.querySelector(".samples-box span");
    if (dataLabel) dataLabel.textContent = t("hudData");
    const abortBtn = document.getElementById("btn-abort-game");
    if (abortBtn) abortBtn.textContent = t("abortGame");
    const skipBtn = document.getElementById("btn-skip-video");
    if (skipBtn) skipBtn.textContent = t("skipVideo");
  }
});

/* ─── INIT ─── */
renderMuseumPage();

if (typeof BF2Cinematics !== "undefined") {
  const sector = getSector(sectorKey);
  BF2Cinematics.playSectorDescent({
    sectorName:  `${sector.code} // ${sector.title.toUpperCase()}`,
    coords:      sector.coordinates,
    planetImage: sector.bannerImg
  });
}
