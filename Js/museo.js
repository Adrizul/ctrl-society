document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "lost_signal_restored";
  const restoredIds = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  let currentSpeakingBtn = null;

  if ("speechSynthesis" in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }

  function stopMuseumTTS() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (currentSpeakingBtn) {
      currentSpeakingBtn.textContent = "▶ ESCUCHAR NARRACIÓN";
      currentSpeakingBtn.classList.remove("is-speaking");
      currentSpeakingBtn = null;
    }
  }

  const allObjects = [];
  Object.entries(SECTORS_DATA).forEach(([sectorKey, sector]) => {
    sector.objects.forEach((obj) => {
      allObjects.push({ ...obj, sectorKey, sectorTitle: sector.title });
    });
  });

  const total = allObjects.length;
  const count = restoredIds.length;

  document.getElementById("museum-progress").textContent = `${count} / ${total}`;
  const pct = total > 0 ? Math.min(100, Math.round((count / total) * 100)) : 0;
  document.getElementById("lock-progress-bar").style.width = `${pct}%`;

  const lockedSection = document.getElementById("museum-locked");
  const unlockedSection = document.getElementById("museum-unlocked");
  const grid = document.getElementById("museum-catalog");

  if (count >= total && total > 0) {
    lockedSection.classList.add("hidden");
    unlockedSection.classList.remove("hidden");
    renderCatalog("all");
  }

  function renderCatalog(filter) {
    grid.innerHTML = "";

    const filtered = filter === "all"
      ? allObjects
      : allObjects.filter((item) => item.sectorKey === filter);

    filtered.forEach((obj) => {
      const card = document.createElement("article");
      card.className = "museum-piece-card";
      card.innerHTML = `
        <div class="museum-piece-photo">
          <img
            src="${obj.realPhoto || obj.img}"
            alt="${obj.name}"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
          />
          <span class="fallback-icon" style="display:none;">${obj.emoji}</span>
        </div>
        <div class="museum-piece-body">
          <span class="mission-code">${obj.sectorTitle} • ${obj.code}</span>
          <h3>${obj.name}</h3>
          <p class="mission-meta">${obj.year}</p>
          <p class="museum-piece-story">${obj.story}</p>
          <p class="source-tag">Fuente: ${obj.source}</p>
          <button
            type="button"
            class="btn-tts museum-tts-btn"
            data-name="${encodeURIComponent(obj.name)}"
            data-story="${encodeURIComponent(obj.story)}"
          >
            ▶ ESCUCHAR NARRACIÓN
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  grid?.addEventListener("click", (e) => {
    const btn = e.target.closest(".museum-tts-btn");
    if (!btn) return;

    if (!("speechSynthesis" in window)) {
      alert("Tu navegador no soporta lectura de voz automática.");
      return;
    }

    const wasSameBtn = currentSpeakingBtn === btn;
    stopMuseumTTS();
    if (wasSameBtn) return;

    const pieceName = decodeURIComponent(btn.dataset.name || "");
    const pieceStory = decodeURIComponent(btn.dataset.story || "");
    const utterance = new SpeechSynthesisUtterance(`${pieceName}. ${pieceStory}`);

    const voices = window.speechSynthesis.getVoices();
    const spanishVoice =
      voices.find((v) => v.lang.includes("es-MX")) ||
      voices.find((v) => v.lang.includes("es-US")) ||
      voices.find((v) => v.lang.startsWith("es"));

    if (spanishVoice) utterance.voice = spanishVoice;
    utterance.lang = "es-MX";
    utterance.rate = 1.02;
    utterance.pitch = 1.0;

    utterance.onend = stopMuseumTTS;
    utterance.onerror = stopMuseumTTS;

    currentSpeakingBtn = btn;
    btn.textContent = "⏹ DETENER NARRACIÓN";
    btn.classList.add("is-speaking");
    window.speechSynthesis.speak(utterance);
  });

  document.querySelectorAll("#museum-filters .tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      stopMuseumTTS();
      document.querySelectorAll("#museum-filters .tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderCatalog(btn.dataset.filter);
    });
  });

  window.addEventListener("beforeunload", stopMuseumTTS);
});