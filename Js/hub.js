(function initHub() {
  /* ─── helpers ─── */
  function t(key) {
    return (typeof I18N !== "undefined") ? I18N.t(key) : key;
  }
  function isEn() {
    return (typeof I18N !== "undefined") ? I18N.getLang() === "en" : false;
  }

  const saved = JSON.parse(localStorage.getItem("lost_signal_restored") || "[]");
  const restoredSet = new Set(saved);

  /* Collect all object ids from raw SECTORS_DATA */
  const allObjects = Object.values(SECTORS_DATA).flatMap((s) => s.objects);
  const totalObjects = allObjects.length;
  const restoredCount = restoredSet.size;

  /* ─── GLOBAL PROGRESS ─── */
  function updateProgressPill() {
    const globalProgressEl = document.getElementById("global-progress");
    if (globalProgressEl) {
      globalProgressEl.textContent = `${restoredCount} / ${totalObjects}`;
    }

    const museumText = document.getElementById("museum-btn-text");
    const museumIcon = document.getElementById("museum-btn-icon");
    const museumBtn  = document.getElementById("btn-visit-museum");
    if (museumBtn && museumIcon && museumText) {
      const isUnlocked = restoredCount >= totalObjects && totalObjects > 0;
      museumIcon.textContent = isUnlocked ? "🏛️" : "🔒";
      museumText.textContent = isUnlocked
        ? (isEn() ? "ENTER MUSEUM (UNLOCKED)" : "ENTRAR AL MUSEO (DESBLOQUEADO)")
        : `${t("visitMuseum")} (${restoredCount}/${totalObjects})`;
      museumBtn.style.borderColor = isUnlocked ? "var(--status-ok)" : "var(--purple-bright)";
      museumText.style.color      = isUnlocked ? "var(--status-ok)" : "var(--purple-bright)";
    }

    Object.keys(SECTORS_DATA).forEach((key) => {
      const total = SECTORS_DATA[key].objects.length;
      const count = SECTORS_DATA[key].objects.filter((o) => restoredSet.has(o.id)).length;
      const badge = document.getElementById(`badge-${key}`);
      if (badge) {
        const signalWord = isEn() ? "SIGNALS" : "SEÑALES";
        badge.textContent = `${count} / ${total} ${signalWord}`;
        badge.className = `status-badge ${count === total ? "restored" : "lost"}`;
      }
    });
  }

  /* ─── ORBIT CARDS ─── */
  function getMissionHook(obj) {
    if (obj.hook)     return obj.hook;
    if (obj.tagline)  return obj.tagline;
    if (obj.subtitle) return obj.subtitle;
    const raw = obj.summary || obj.desc || obj.description || "";
    if (!raw) return isEn()
      ? "Mission ready to restore its telemetry."
      : "Misión espacial lista para restaurar su telemetría.";
    const firstSentence = raw.split(".")[0].trim();
    return firstSentence.length > 90 ? `${firstSentence.slice(0, 87)}...` : `${firstSentence}.`;
  }

  function renderTelemetry(sectorKey, rawObj) {
    const card = document.getElementById(`telemetry-${sectorKey}`);
    if (!card || !rawObj) return;

    /* localize the object on every render call */
    const obj = (typeof getObject !== "undefined") ? getObject(rawObj) : rawObj;
    const isRestored = restoredSet.has(obj.id || rawObj.id);
    const title = obj.name || obj.title || obj.id;
    const icon  = obj.icon || obj.emoji || "🛰️";
    const hook  = getMissionHook(obj);

    const statusText = isRestored
      ? (isEn() ? "ACTIVE SIGNAL"  : "SEÑAL ACTIVA")
      : (isEn() ? "LOST SIGNAL"    : "SEÑAL PERDIDA");

    card.innerHTML = `
      <div class="telemetry-inner">
        <div class="telemetry-icon">${icon}</div>
        <div class="telemetry-copy">
          <div class="telemetry-title-row">
            <h3>${title}</h3>
            <span class="telemetry-status ${isRestored ? "restored" : "lost"}">
              ${statusText}
            </span>
          </div>
          <p class="telemetry-hook">${hook}</p>
        </div>
      </div>
    `;
  }

  /* per-slide state: which mission index is selected */
  const selectedMissionIndex = {};

  function renderOrbitSection(slide) {
    const sectorKey = slide.dataset.sector;
    const sectorData = SECTORS_DATA[sectorKey];
    const orbitContainer = document.getElementById(`orbit-${sectorKey}`);
    const scanHint = slide.querySelector(".planet-scan-hint");

    if (!sectorData || !orbitContainer) return;

    const missions = sectorData.objects || [];
    const stepAngle = missions.length > 0 ? 360 / missions.length : 0;

    const nodesHtml = missions.map((rawObj, idx) => {
      const obj = (typeof getObject !== "undefined") ? getObject(rawObj) : rawObj;
      const angle = idx * stepAngle;
      const isRestored = restoredSet.has(rawObj.id);
      const title = obj.name || obj.title || rawObj.id;
      const icon  = rawObj.icon || rawObj.emoji || "🛰️";

      const selIdx = selectedMissionIndex[sectorKey] ?? 0;
      return `
        <button
          type="button"
          class="orbit-node ${isRestored ? "is-restored" : ""} ${idx === selIdx ? "is-selected" : ""}"
          style="--angle: ${angle}deg;"
          data-mission-idx="${idx}"
          aria-label="${title}"
        >
          <span class="orbit-node-upright">
            <span class="orbit-icon-bubble">${icon}</span>
            <span class="orbit-node-label">${title}</span>
          </span>
        </button>
      `;
    }).join("");

    orbitContainer.innerHTML = `<div class="orbit-rotator">${nodesHtml}</div>`;

    /* scan hint */
    if (scanHint) {
      const isActive = slide.classList.contains("orbit-active");
      if (isActive) {
        const inOrbitText = isEn()
          ? `🛰️ ${missions.length} MISSIONS IN ORBIT`
          : `🛰️ ${missions.length} MISIONES EN ÓRBITA`;
        scanHint.textContent = inOrbitText;
      } else {
        scanHint.textContent = t("touchOrbit");
      }
    }

    /* render telemetry for currently selected mission */
    const selIdx = selectedMissionIndex[sectorKey] ?? 0;
    if (missions.length > 0) {
      renderTelemetry(sectorKey, missions[selIdx]);
    }

    /* re-attach node click listeners */
    const orbitNodes = orbitContainer.querySelectorAll(".orbit-node");
    orbitNodes.forEach((node) => {
      const selectMission = () => {
        orbitNodes.forEach((n) => n.classList.remove("is-selected"));
        node.classList.add("is-selected");
        const idx = Number(node.dataset.missionIdx);
        selectedMissionIndex[sectorKey] = idx;
        renderTelemetry(sectorKey, missions[idx]);
      };
      node.addEventListener("mouseenter", selectMission);
      node.addEventListener("focus",      selectMission);
      node.addEventListener("click", (e) => {
        e.stopPropagation();
        if (node.classList.contains("is-selected")) {
          window.location.href = `html/sector.html?sector=${sectorKey}`;
        } else {
          selectMission();
        }
      });
    });
  }

  /* ─── PLANET BUTTON (toggle orbit) ─── */
  function attachPlanetButtons() {
    document.querySelectorAll(".planet-slide").forEach((slide) => {
      const sectorKey = slide.dataset.sector;
      const sectorData = SECTORS_DATA[sectorKey];
      const planetBtn = slide.querySelector(".planet-sphere");
      const scanHint  = slide.querySelector(".planet-scan-hint");
      if (!sectorData || !planetBtn) return;

      const missions = sectorData.objects || [];
      /* only add click listener once */
      if (planetBtn.dataset.hubBound) return;
      planetBtn.dataset.hubBound = "1";

      planetBtn.addEventListener("click", () => {
        const isNowActive = slide.classList.toggle("orbit-active");
        planetBtn.setAttribute("aria-expanded", String(isNowActive));
        if (scanHint) {
          scanHint.textContent = isNowActive
            ? (isEn()
                ? `🛰️ ${missions.length} MISSIONS IN ORBIT`
                : `🛰️ ${missions.length} MISIONES EN ÓRBITA`)
            : t("touchOrbit");
        }
      });
    });
  }

  /* ─── FULL RENDER ─── */
  function renderAll() {
    updateProgressPill();
    document.querySelectorAll(".planet-slide").forEach((slide) => {
      renderOrbitSection(slide);
    });
    attachPlanetButtons();
    /* re-apply I18N data-i18n attrs (button, indicators, etc.) */
    if (typeof I18N !== "undefined") I18N.applyLang();
  }

  /* ─── LANGUAGE CHANGED ─── */
  window.addEventListener("languageChanged", () => {
    renderAll();
  });

  /* ─── CAROUSEL ─── */
  const track      = document.getElementById("carousel-track");
  const prevBtn    = document.getElementById("carousel-prev");
  const nextBtn    = document.getElementById("carousel-next");
  const indicators = document.querySelectorAll(".indicator-pill");
  const viewport   = document.getElementById("carousel-viewport");

  if (track && prevBtn && nextBtn) {
    const totalSlides = track.children.length;
    let currentIndex = 0;

    function goToSlide(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators.forEach((pill, i) => {
        pill.classList.toggle("active", i === currentIndex);
      });
    }

    prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
    indicators.forEach((pill) => {
      pill.addEventListener("click", () => goToSlide(Number(pill.dataset.index)));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft")  goToSlide(currentIndex - 1);
      if (e.key === "ArrowRight") goToSlide(currentIndex + 1);
    });

    if (viewport) {
      let startX = 0;
      viewport.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
      viewport.addEventListener("touchend",   (e) => {
        const diffX = startX - e.changedTouches[0].clientX;
        if (Math.abs(diffX) > 45) goToSlide(diffX > 0 ? currentIndex + 1 : currentIndex - 1);
      });
    }
  }

  /* ─── INIT ─── */
  renderAll();
})();
