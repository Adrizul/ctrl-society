document.addEventListener("DOMContentLoaded", () => {
  // IMPORTANTE: Ajusta esta clave si en tu hub.js/sector.js usas otro nombre en localStorage
  const STORAGE_KEY = "lost_signal_restored";
  const restoredIds = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

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

  if (count >= total && total > 0) {
    lockedSection.classList.add("hidden");
    unlockedSection.classList.remove("hidden");
    renderCatalog("all");
  }

  function renderCatalog(filter) {
    const grid = document.getElementById("museum-catalog");
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
          <audio controls src="${obj.audio}"></audio>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  document.querySelectorAll("#museum-filters .tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#museum-filters .tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderCatalog(btn.dataset.filter);
    });
  });
});