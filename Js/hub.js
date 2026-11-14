(function initHub() {
  const saved = JSON.parse(localStorage.getItem("lost_signal_restored") || "[]");
  const restoredSet = new Set(saved);

  const allObjects = Object.values(SECTORS_DATA).flatMap((s) => s.objects);
  const totalObjects = allObjects.length;
  const restoredCount = restoredSet.size;

  document.getElementById("global-progress").textContent = `${restoredCount} / ${totalObjects}`;

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

  const teamGrid = document.getElementById("team-grid");
  if (teamGrid && typeof TEAM_DATA !== "undefined") {
    teamGrid.innerHTML = TEAM_DATA.map(
      (member) => `
      <article class="team-card">
        <span class="team-role">${member.role}</span>
        <h3>${member.name}</h3>
        <p>${member.contribution}</p>
      </article>`
    ).join("");
  }
})();