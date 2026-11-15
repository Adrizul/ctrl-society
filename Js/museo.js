document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "lost_signal_restored";
  const restoredIds = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  let currentSpeakingBtn = null;

  /* ─── helpers ─── */
  function t(key) {
    return (typeof I18N !== "undefined") ? I18N.t(key) : key;
  }
  function isEn() {
    return (typeof I18N !== "undefined") && I18N.getLang() === "en";
  }

  if ("speechSynthesis" in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }

  function stopMuseumTTS() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (currentSpeakingBtn) {
      currentSpeakingBtn.textContent = t("listenNarration");
      currentSpeakingBtn.classList.remove("is-speaking");
      currentSpeakingBtn = null;
    }
  }

  /* Build flat list of localized objects: re-computed each render */
  function buildAllObjects() {
    const list = [];
    Object.entries(SECTORS_DATA).forEach(([sectorKey, rawSector]) => {
      /* localized sector title */
      const sectorTitle = typeof rawSector.title === "object"
        ? (rawSector.title[isEn() ? "en" : "es"] || rawSector.title.es)
        : rawSector.title;

      rawSector.objects.forEach((rawObj) => {
        const obj = (typeof getObject !== "undefined") ? getObject(rawObj) : rawObj;
        list.push({ ...obj, sectorKey, sectorTitle, _rawObj: rawObj });
      });
    });
    return list;
  }

  const total = Object.values(SECTORS_DATA).reduce((acc, s) => acc + s.objects.length, 0);
  const count = restoredIds.length;

  document.getElementById("museum-progress").textContent = `${count} / ${total}`;
  const pct = total > 0 ? Math.min(100, Math.round((count / total) * 100)) : 0;
  document.getElementById("lock-progress-bar").style.width = `${pct}%`;

  const lockedSection   = document.getElementById("museum-locked");
  const unlockedSection = document.getElementById("museum-unlocked");
  const grid            = document.getElementById("museum-catalog");

  /* Current active filter */
  let activeFilter = "all";

  function renderCatalog(filter) {
    activeFilter = filter;
    if (!grid) return;
    grid.innerHTML = "";
    stopMuseumTTS();

    const allObjects = buildAllObjects();
    const filtered = filter === "all"
      ? allObjects
      : allObjects.filter((item) => item.sectorKey === filter);

    const sourceLabel = isEn() ? "Source" : "Fuente";

    filtered.forEach((obj) => {
      const card = document.createElement("article");
      card.className = "museum-piece-card";
      card.innerHTML = `
        <div class="museum-piece-photo">
          <img
            src="${obj._rawObj.realPhoto || obj._rawObj.img}"
            alt="${obj.name}"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
          />
          <span class="fallback-icon" style="display:none;">${obj._rawObj.emoji}</span>
        </div>
        <div class="museum-piece-body">
          <span class="mission-code">${obj.sectorTitle} • ${obj.code}</span>
          <h3>${obj.name}</h3>
          <p class="mission-meta">${obj.year}</p>
          <p class="museum-piece-story">${obj.story}</p>
          <p class="source-tag">${sourceLabel}: ${obj._rawObj.source}</p>
          <button
            type="button"
            class="btn-tts museum-tts-btn"
            data-id="${obj._rawObj.id}"
          >
            ${t("listenNarration")}
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  /* ─── Locked / Unlocked ─── */
  if (count >= total && total > 0) {
    lockedSection.classList.add("hidden");
    unlockedSection.classList.remove("hidden");
    renderCatalog("all");
  }

  /* ─── TTS click handler (delegated) ─── */
  grid?.addEventListener("click", (e) => {
    const btn = e.target.closest(".museum-tts-btn");
    if (!btn) return;

    if (!("speechSynthesis" in window)) {
      alert(isEn()
        ? "Your browser does not support automatic voice reading."
        : "Tu navegador no soporta lectura de voz automática.");
      return;
    }

    const wasSameBtn = currentSpeakingBtn === btn;
    stopMuseumTTS();
    if (wasSameBtn) return;

    /* find raw object by id */
    const targetId = btn.dataset.id;
    let rawObj = null;
    Object.values(SECTORS_DATA).some((sec) => {
      rawObj = sec.objects.find((o) => o.id === targetId);
      return !!rawObj;
    });
    if (!rawObj) return;

    const localObj = (typeof getObject !== "undefined") ? getObject(rawObj) : rawObj;
    const utterance = new SpeechSynthesisUtterance(`${localObj.name}. ${localObj.story}`);
    const voices    = window.speechSynthesis.getVoices();

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
    utterance.onend   = stopMuseumTTS;
    utterance.onerror = stopMuseumTTS;

    currentSpeakingBtn = btn;
    btn.textContent = isEn() ? "⏹ STOP NARRATION" : "⏹ DETENER NARRACIÓN";
    btn.classList.add("is-speaking");
    window.speechSynthesis.speak(utterance);
  });

  /* ─── Filter tabs ─── */
  document.querySelectorAll("#museum-filters .tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      stopMuseumTTS();
      document.querySelectorAll("#museum-filters .tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderCatalog(btn.dataset.filter);
    });
  });

  /* ─── Language changed ─── */
  window.addEventListener("languageChanged", () => {
    /* update static i18n text */
    if (typeof I18N !== "undefined") I18N.applyLang();
    /* re-render catalog with current filter in new language */
    if (count >= total && total > 0) {
      renderCatalog(activeFilter);
    }
    /* update filter tab labels */
    const tabBtns = document.querySelectorAll("#museum-filters .tab-btn");
    tabBtns.forEach((btn) => {
      const f = btn.dataset.filter;
      if (f === "all")     btn.textContent = t("filterAllPieces");
      if (f === "luna")    btn.textContent = t("filterLuna");
      if (f === "marte")   btn.textContent = t("filterMarte");
      if (f === "espacio") btn.textContent = t("filterEspacio");
    });
  });

  window.addEventListener("beforeunload", stopMuseumTTS);
});
