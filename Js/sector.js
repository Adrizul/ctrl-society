const params = new URLSearchParams(window.location.search);
const sectorKey = SECTORS_DATA[params.get("sector")] ? params.get("sector") : "luna";
const sector = SECTORS_DATA[sectorKey];

document.getElementById("theme-stylesheet").href = `../css/themes/${sectorKey}.css`;

const savedIds = JSON.parse(localStorage.getItem("lost_signal_restored") || "[]");
const restoredSet = new Set(savedIds);
let currentObject = null;
let isLaunchingGame = false;

function saveProgress() {
  localStorage.setItem("lost_signal_restored", JSON.stringify([...restoredSet]));
}

const views = {
  museum: document.getElementById("view-museum"),
  video: document.getElementById("view-video"),
  game: document.getElementById("view-game")
};

function showView(name) {
  Object.values(views).forEach((v) => v.classList.add("hidden"));
  views[name].classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderMuseumPage() {
  document.title = `${sector.title} | Museo CTRL SOCIETY`;
  document.getElementById("sector-code-label").textContent = sector.code;
  document.getElementById("sector-title").textContent = sector.title;
  document.getElementById("sector-tagline").textContent = sector.tagline;
  document.getElementById("sector-coordinates").textContent = sector.coordinates;
  document.getElementById("sector-banner-emoji").textContent = sector.emoji;

  const bannerImg = document.getElementById("sector-banner-img");
  bannerImg.src = sector.bannerImg;
  bannerImg.onload = () => {
    document.getElementById("sector-banner-emoji").style.display = "none";
  };

  document.getElementById("sector-general-text").textContent = sector.generalText;
  document.getElementById("sector-highlights").innerHTML = sector.highlights
    .map(
      (h) => `
      <div class="highlight-box">
        <strong>${h.title}</strong>
        <span>${h.text}</span>
      </div>`
    )
    .join("");

  const galleryEl = document.getElementById("sector-gallery");
  if (galleryEl && sector.gallery) {
    galleryEl.innerHTML = sector.gallery
      .map(
        (item) => `
        <figure class="gallery-thumb">
          <img src="${item.src}" alt="${item.caption}" onerror="this.parentElement.style.display='none'" />
          <figcaption><span>${item.caption}</span></figcaption>
        </figure>`
      )
      .join("");
  }

  document.getElementById("sector-tech-intro").textContent = sector.techIntro;
  document.getElementById("sector-tech-grid").innerHTML = sector.techSpecs
    .map(
      (spec) => `
      <div class="tech-spec-item">
        <span class="spec-label">${spec.label}</span>
        <span class="spec-value">${spec.value}</span>
      </div>`
    )
    .join("");

  renderObjectCards();
}

function renderObjectCards() {
  const total = sector.objects.length;
  const count = sector.objects.filter((o) => restoredSet.has(o.id)).length;
  document.getElementById("sector-progress-count").textContent = `${count} / ${total}`;

  const grid = document.getElementById("sector-objects-grid");
  grid.innerHTML = "";

  sector.objects.forEach((obj) => {
    const isRestored = restoredSet.has(obj.id);

    const card = document.createElement("article");
    card.className = "mission-card";
    card.innerHTML = `
      <div class="card-top">
        <span class="mission-code">${obj.code}</span>
        <span class="status-badge ${isRestored ? "restored" : "lost"}">
          ${isRestored ? "SEÑAL RESTAURADA" : "SEÑAL PERDIDA"}
        </span>
      </div>

      <div class="hologram-stage">
        <div class="holo-ring"></div>
        <div class="holo-avatar ${isRestored ? "is-restored" : "is-locked"}">
          <img
            src="${obj.img}"
            alt="${obj.name}"
            onload="this.nextElementSibling.style.display='none'"
            onerror="this.style.display='none'"
          />
          <span class="fallback-icon">${obj.emoji}</span>
        </div>
        <div class="holo-base"></div>
      </div>

      <div class="card-body">
        <h2>${obj.name}</h2>
        <p class="mission-meta">${obj.year}</p>
        <p class="mission-desc">${obj.shortDesc}</p>
        <p class="source-tag">Fuente: ${obj.source}</p>
      </div>

      <button class="btn-mission">
        <span>${isRestored ? "REPETIR MISIÓN DE RESCATE" : "RESCATAR SEÑAL"}</span>
        <span class="arrow">➔</span>
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => startObjectMission(obj));
    grid.appendChild(card);
  });
}

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");

    const target = btn.getAttribute("data-tab");
    document.getElementById("tab-general").classList.toggle("hidden", target !== "general");
    document.getElementById("tab-technical").classList.toggle("hidden", target !== "technical");
  });
});

/* === FLUJO DE MISIÓN + CINEMÁTICA TARGET-LOCK === */
const videoEl = document.getElementById("intro-video");

function triggerMinigameTransition() {
  if (isLaunchingGame || !currentObject) return;
  isLaunchingGame = true;

  if (typeof BF2Cinematics !== "undefined") {
    BF2Cinematics.playMinigameLockOn(currentObject.name.toUpperCase(), () => {
      isLaunchingGame = false;
      startMinigameView();
    });
  } else {
    isLaunchingGame = false;
    startMinigameView();
  }
}

function startObjectMission(obj) {
  currentObject = obj;
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
  document.getElementById("hud-sector-name").textContent = `SECTOR: ${sector.title}`;
  document.getElementById("hud-mission-title").textContent = currentObject.name.toUpperCase();
  showView("game");

  MinigameEngine.start({
    bgColors: sector.bgColors,
    emoji: currentObject.emoji,
    onComplete: openDiscoveryModal
  });
}

/* === SÍNTESIS DE VOZ (WEB SPEECH API) === */
const modalEl = document.getElementById("modal-discovery");

function setupTtsButton() {
  let btn = document.getElementById("btn-tts-toggle");
  if (!btn) {
    const oldAudio = document.getElementById("discovery-audio");
    btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btn-tts-toggle";
    btn.className = "btn-tts";
    btn.textContent = "▶ ESCUCHAR NARRACIÓN";

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
  ttsBtn.textContent = "▶ ESCUCHAR NARRACIÓN";
  ttsBtn.classList.remove("is-speaking");
}

function stopStorySpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  resetTtsButton();
}

function toggleStorySpeech() {
  if (!("speechSynthesis" in window)) {
    alert("Tu navegador no soporta lectura de voz automática.");
    return;
  }

  if (window.speechSynthesis.speaking) {
    stopStorySpeech();
    return;
  }

  window.speechSynthesis.cancel();

  const textToRead = `${currentObject.name}. ${currentObject.story}`;
  const utterance = new SpeechSynthesisUtterance(textToRead);
  const voices = window.speechSynthesis.getVoices();
  const spanishVoice =
    voices.find((v) => v.lang.includes("es-MX")) ||
    voices.find((v) => v.lang.includes("es-US")) ||
    voices.find((v) => v.lang.startsWith("es"));

  if (spanishVoice) utterance.voice = spanishVoice;
  utterance.lang = "es-MX";
  utterance.rate = 1.02;
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    ttsBtn.textContent = "⏹ DETENER NARRACIÓN";
    ttsBtn.classList.add("is-speaking");
  };

  utterance.onend = resetTtsButton;
  utterance.onerror = resetTtsButton;

  window.speechSynthesis.speak(utterance);
}

if (ttsBtn) {
  ttsBtn.addEventListener("click", toggleStorySpeech);
}

function openDiscoveryModal() {
  restoredSet.add(currentObject.id);
  saveProgress();

  document.getElementById("discovery-title").textContent = currentObject.name.toUpperCase();
  document.getElementById("discovery-meta").textContent = currentObject.year;
  document.getElementById("discovery-story").textContent = currentObject.story;
  document.getElementById("discovery-img").src = currentObject.realPhoto;
  document.getElementById("discovery-source").textContent = `FUENTE: ${currentObject.source.toUpperCase()}`;

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
document.getElementById("btn-close-modal").addEventListener("click", closeDiscoveryModal);
document.getElementById("btn-return-sector").addEventListener("click", closeDiscoveryModal);

/* === INICIALIZACIÓN Y DESCENSO ORBITAL AL ENTRAR AL SECTOR === */
renderMuseumPage();

if (typeof BF2Cinematics !== "undefined") {
  BF2Cinematics.playSectorDescent({
    sectorName: `${sector.code} // ${sector.title.toUpperCase()}`,
    coords: sector.coordinates,
    planetImage: sector.bannerImg
  });
}