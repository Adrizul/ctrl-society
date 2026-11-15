(function initHub() {
  const saved = JSON.parse(localStorage.getItem("lost_signal_restored") || "[]");
  const restoredSet = new Set(saved);

  const allObjects = Object.values(SECTORS_DATA).flatMap((s) => s.objects);
  const totalObjects = allObjects.length;
  const restoredCount = restoredSet.size;

  const globalProgressEl = document.getElementById("global-progress");
  if (globalProgressEl) {
    globalProgressEl.textContent = `${restoredCount} / ${totalObjects}`;
  }

  const museumBtn = document.getElementById("btn-visit-museum");
  const museumIcon = document.getElementById("museum-btn-icon");
  const museumText = document.getElementById("museum-btn-text");
  if (museumBtn && museumIcon && museumText) {
    const isUnlocked = restoredCount >= totalObjects && totalObjects > 0;
    museumIcon.textContent = isUnlocked ? "🏛️" : "🔒";
    museumText.textContent = isUnlocked
      ? "ENTRAR AL MUSEO (DESBLOQUEADO)"
      : `VISITAR MUSEO (${restoredCount}/${totalObjects})`;
    museumBtn.style.borderColor = isUnlocked ? "var(--status-ok)" : "var(--purple-bright)";
    museumText.style.color = isUnlocked ? "var(--status-ok)" : "var(--purple-bright)";
  }

  Object.keys(SECTORS_DATA).forEach((key) => {
    const total = SECTORS_DATA[key].objects.length;
    const count = SECTORS_DATA[key].objects.filter((o) => restoredSet.has(o.id)).length;
    const badge = document.getElementById(`badge-${key}`);
    if (badge) {
      badge.textContent = `${count} / ${total} SEÑALES`;
      badge.className = `status-badge ${count === total ? "restored" : "lost"}`;
    }
  });

  // === SISTEMA ORBITAL DE MISIONES POR PLANETA ===
  function getMissionHook(obj) {
    if (obj.hook) return obj.hook;
    if (obj.tagline) return obj.tagline;
    if (obj.subtitle) return obj.subtitle;
    const raw = obj.summary || obj.desc || obj.description || "";
    if (!raw) return "Misión espacial lista para restaurar su telemetría.";
    const firstSentence = raw.split(".")[0].trim();
    return firstSentence.length > 90 ? `${firstSentence.slice(0, 87)}...` : `${firstSentence}.`;
  }

  function renderTelemetry(sectorKey, obj) {
    const card = document.getElementById(`telemetry-${sectorKey}`);
    if (!card || !obj) return;

    const isRestored = restoredSet.has(obj.id);
    const title = obj.name || obj.title || obj.id;
    const icon = obj.icon || obj.emoji || "🛰️";
    const hook = getMissionHook(obj);

    card.innerHTML = `
      <div class="telemetry-inner">
        <div class="telemetry-icon">${icon}</div>
        <div class="telemetry-copy">
          <div class="telemetry-title-row">
            <h3>${title}</h3>
            <span class="telemetry-status ${isRestored ? "restored" : "lost"}">
              ${isRestored ? "SEÑAL ACTIVA" : "SEÑAL PERDIDA"}
            </span>
          </div>
          <p class="telemetry-hook">${hook}</p>
        </div>
      </div>
    `;
  }

  document.querySelectorAll(".planet-slide").forEach((slide) => {
    const sectorKey = slide.dataset.sector;
    const sectorData = SECTORS_DATA[sectorKey];
    const orbitContainer = document.getElementById(`orbit-${sectorKey}`);
    const planetBtn = slide.querySelector(".planet-sphere");
    const scanHint = slide.querySelector(".planet-scan-hint");

    if (!sectorData || !orbitContainer || !planetBtn) return;

    const missions = sectorData.objects || [];
    const stepAngle = missions.length > 0 ? 360 / missions.length : 0;

    const nodesHtml = missions
      .map((obj, idx) => {
        const angle = idx * stepAngle;
        const isRestored = restoredSet.has(obj.id);
        const title = obj.name || obj.title || obj.id;
        const icon = obj.icon || obj.emoji || "🛰️";

        return `
          <button
            type="button"
            class="orbit-node ${isRestored ? "is-restored" : ""} ${idx === 0 ? "is-selected" : ""}"
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
      })
      .join("");

    orbitContainer.innerHTML = `<div class="orbit-rotator">${nodesHtml}</div>`;

    if (missions.length > 0) {
      renderTelemetry(sectorKey, missions[0]);
    }

    planetBtn.addEventListener("click", () => {
      const isNowActive = slide.classList.toggle("orbit-active");
      planetBtn.setAttribute("aria-expanded", String(isNowActive));
      if (scanHint) {
        scanHint.textContent = isNowActive
          ? `🛰️ ${missions.length} MISIONES EN ÓRBITA`
          : "📡 TOCA PARA ÓRBITA";
      }
    });

    const orbitNodes = orbitContainer.querySelectorAll(".orbit-node");
    orbitNodes.forEach((node) => {
      const selectMission = () => {
        orbitNodes.forEach((n) => n.classList.remove("is-selected"));
        node.classList.add("is-selected");
        const missionObj = missions[Number(node.dataset.missionIdx)];
        renderTelemetry(sectorKey, missionObj);
      };

      node.addEventListener("mouseenter", selectMission);
      node.addEventListener("focus", selectMission);
      node.addEventListener("click", (e) => {
        e.stopPropagation();
        if (node.classList.contains("is-selected")) {
          window.location.href = `html/sector.html?sector=${sectorKey}`;
        } else {
          selectMission();
        }
      });
    });
  });

  // === CARRUSEL DE SECTORES ===
  const track = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const indicators = document.querySelectorAll(".indicator-pill");
  const viewport = document.getElementById("carousel-viewport");

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
      pill.addEventListener("click", () => {
        goToSlide(Number(pill.dataset.index));
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") goToSlide(currentIndex - 1);
      if (e.key === "ArrowRight") goToSlide(currentIndex + 1);
    });

    if (viewport) {
      let startX = 0;
      viewport.addEventListener(
        "touchstart",
        (e) => {
          startX = e.touches[0].clientX;
        },
        { passive: true }
      );

      viewport.addEventListener("touchend", (e) => {
        const diffX = startX - e.changedTouches[0].clientX;
        if (Math.abs(diffX) > 45) {
          goToSlide(diffX > 0 ? currentIndex + 1 : currentIndex - 1);
        }
      });
    }
  }
})();