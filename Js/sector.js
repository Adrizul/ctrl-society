const params = new URLSearchParams(window.location.search);
const sectorKey = SECTORS_DATA[params.get("sector")] ? params.get("sector") : "luna";
const sector = SECTORS_DATA[sectorKey];

document.getElementById("theme-stylesheet").href = `../Css/themes/${sectorKey}.css`;

const savedIds = JSON.parse(localStorage.getItem("lost_signal_restored") || "[]");
const restoredSet = new Set(savedIds);
let currentObject = null;

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

const videoEl = document.getElementById("intro-video");

function startObjectMission(obj) {
  currentObject = obj;
  document.getElementById("video-hud-label").textContent = `RASTREANDO: ${obj.name.toUpperCase()}...`;

  showView("video");
  videoEl.src = obj.video;
  videoEl.load();

  const playPromise = videoEl.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => startMinigameView());
  }
}

videoEl.addEventListener("ended", startMinigameView);
videoEl.addEventListener("error", startMinigameView);
document.getElementById("btn-skip-video").addEventListener("click", () => {
  videoEl.pause();
  startMinigameView();
});

document.getElementById("btn-abort-game").addEventListener("click", () => {
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

const modalEl = document.getElementById("modal-discovery");
const audioEl = document.getElementById("discovery-audio");

function openDiscoveryModal() {
  restoredSet.add(currentObject.id);
  saveProgress();

  document.getElementById("discovery-title").textContent = currentObject.name.toUpperCase();
  document.getElementById("discovery-meta").textContent = currentObject.year;
  document.getElementById("discovery-story").textContent = currentObject.story;
  document.getElementById("discovery-img").src = currentObject.realPhoto;
  document.getElementById("discovery-source").textContent = `FUENTE: ${currentObject.source.toUpperCase()}`;

  audioEl.src = currentObject.audio;
  modalEl.classList.remove("hidden");
}

function closeDiscoveryModal() {
  audioEl.pause();
  modalEl.classList.add("hidden");
  renderObjectCards();
  showView("museum");
}

document.getElementById("btn-close-modal").addEventListener("click", closeDiscoveryModal);
document.getElementById("btn-return-sector").addEventListener("click", closeDiscoveryModal);

renderMuseumPage();