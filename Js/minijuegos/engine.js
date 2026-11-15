window.MinigameEngine = (function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");

  let loopId = null;
  let state = null;
  const keys = {};
  const autoMissionCounter = { luna: 0, marte: 0, espacio: 0 };

  window.addEventListener("keydown", (e) => (keys[e.key.toLowerCase()] = true));
  window.addEventListener("keyup", (e) => (keys[e.key.toLowerCase()] = false));

  document.querySelectorAll(".touch-dpad button").forEach((btn) => {
    const dir = btn.getAttribute("data-dir");
    const map = { up: "arrowup", down: "arrowdown", left: "arrowleft", right: "arrowright" };
    btn.addEventListener("touchstart", (e) => { e.preventDefault(); keys[map[dir]] = true; });
    btn.addEventListener("touchend", () => (keys[map[dir]] = false));
    btn.addEventListener("mousedown", () => (keys[map[dir]] = true));
    btn.addEventListener("mouseup", () => (keys[map[dir]] = false));
  });

  function jitter(val, range = 0.03) {
    return Math.max(0.12, Math.min(0.88, val + (Math.random() * 2 - 1) * range));
  }

  function detectSector(config) {
    if (config && config.sector) return String(config.sector).toLowerCase();

    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("sector") || params.get("id") || params.get("s");
    if (fromUrl && window.SectorMinigames && window.SectorMinigames[fromUrl.toLowerCase()]) {
      return fromUrl.toLowerCase();
    }

    const themeLink = document.getElementById("theme-stylesheet");
    const href = themeLink ? themeLink.getAttribute("href") || "" : "";
    if (href.includes("marte")) return "marte";
    if (href.includes("espacio")) return "espacio";
    return "luna";
  }

  function detectMissionIndex(config, sectorKey, totalMissions) {
    if (config && typeof config.missionIndex === "number") {
      return Math.max(0, Math.min(totalMissions - 1, config.missionIndex));
    }

    const titleEl = document.getElementById("hud-mission-title");
    const currentTitle = titleEl ? titleEl.textContent.trim().toLowerCase() : "";
    const rootData = window.SECTORS_DATA || window.sectorsData || null;

    if (currentTitle && rootData && rootData[sectorKey]) {
      const list = rootData[sectorKey].missions || rootData[sectorKey].objects || [];
      const foundIdx = list.findIndex((m) => (m.title || m.name || "").trim().toLowerCase() === currentTitle);
      if (foundIdx !== -1) {
        return Math.max(0, Math.min(totalMissions - 1, foundIdx));
      }
    }

    const idx = autoMissionCounter[sectorKey] || 0;
    autoMissionCounter[sectorKey] = (idx + 1) % totalMissions;
    return idx;
  }

  function createStars(w, h, count = 65) {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.8 + 0.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.04
      });
    }
    return stars;
  }

  function createRockPolygon(radius, sides = 9) {
    const pts = [];
    for (let i = 0; i < sides; i++) {
      const a = (i / sides) * Math.PI * 2;
      const dist = radius * (0.78 + Math.random() * 0.32);
      pts.push({ x: Math.cos(a) * dist, y: Math.sin(a) * dist });
    }
    return pts;
  }

  function spawnParticles(x, y, color, count = 12, speed = 3) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = (0.4 + Math.random() * 0.8) * speed;
      state.particles.push({
        x,
        y,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v,
        life: 1,
        decay: 0.03 + Math.random() * 0.03,
        size: 2 + Math.random() * 2.5,
        color
      });
    }
  }

  function updateHud() {
    document.getElementById("hud-samples").textContent = `${state.collected} / 3`;
    const pct = Math.max(0, Math.round(state.signal));
    document.getElementById("signal-percent").textContent = `${pct}%`;
    document.getElementById("signal-meter-fill").style.width = `${pct}%`;
  }

  // --- DIBUJO DE ENTIDADES ---

  function drawBackground(w, h) {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, state.bgColors[0]);
    grad.addColorStop(1, state.bgColors[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Estrellas parpadeantes
    state.stars.forEach((st) => {
      const alpha = 0.25 + 0.65 * Math.abs(Math.sin(state.frame * st.speed + st.phase));
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
      ctx.fillRect(st.x, st.y, st.size, st.size);
    });

    // Cuadrícula táctica sutil
    ctx.strokeStyle = "rgba(168, 85, 247, 0.07)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Ráfagas de polvo en Marte
    if (state.windActive) {
      ctx.strokeStyle = "rgba(255, 138, 91, 0.28)";
      ctx.lineWidth = 1.6;
      for (let i = 0; i < 12; i++) {
        const wx = (state.frame * 9 + i * 110) % w;
        const wy = (i * 53 + Math.sin(state.frame * 0.03 + i) * 14) % h;
        ctx.beginPath();
        ctx.moveTo(w - wx, wy);
        ctx.lineTo(w - wx - 46, wy + 9);
        ctx.stroke();
      }
    }
  }

  function drawBeacon(b) {
    const p = state.player;
    const dist = Math.hypot(p.x - b.x, p.y - b.y);
    const recharging = dist < p.r + b.r + 12;

    // Onda expansiva de sonar
    const wave = (state.frame % 60) / 60;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r * (0.7 + wave * 0.9), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 158, 68, ${(1 - wave) * 0.45})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Halo exterior
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = recharging ? "rgba(46, 196, 182, 0.22)" : "rgba(255, 158, 68, 0.14)";
    ctx.fill();
    ctx.strokeStyle = recharging ? "#2ec4b6" : "#ff9e44";
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // Núcleo de antena
    ctx.beginPath();
    ctx.arc(b.x, b.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = recharging ? "#2ec4b6" : "#ff9e44";
    ctx.fill();

    // Rayo energético al recargar
    if (recharging) {
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = "rgba(46, 196, 182, 0.75)";
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }
  }

  function drawSample(s) {
    if (s.taken) return;
    const bob = Math.sin(state.frame * 0.08 + s.x) * 3;
    const rot = state.frame * 0.03;

    ctx.save();
    ctx.translate(s.x, s.y + bob);

    // Aura luminosa
    ctx.shadowColor = "#a855f7";
    ctx.shadowBlur = 14;

    // Anillo orbital fino
    ctx.beginPath();
    ctx.arc(0, 0, s.r + 4, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(192, 132, 252, 0.45)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Cristal/Núcleo de datos giratorio (rombo)
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.moveTo(0, -s.r);
    ctx.lineTo(s.r * 0.85, 0);
    ctx.lineTo(0, s.r);
    ctx.lineTo(-s.r * 0.85, 0);
    ctx.closePath();

    const g = ctx.createLinearGradient(-s.r, -s.r, s.r, s.r);
    g.addColorStop(0, "#d8b4fe");
    g.addColorStop(1, "#7e22ce");
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.6;
    ctx.stroke();

    ctx.restore();
  }

  function drawHazard(hz) {
    if (hz.type === "orbit") {
      ctx.beginPath();
      ctx.arc(hz.cx, hz.cy, hz.orbitR, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 107, 53, 0.16)";
      ctx.setLineDash([5, 7]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    hz.spin = (hz.spin || 0) + 0.025;
    ctx.save();
    ctx.translate(hz.x, hz.y);
    ctx.rotate(hz.spin);

    ctx.shadowColor = "#ff4d00";
    ctx.shadowBlur = 12;

    if (state.physics === "space" && hz.type === "orbit") {
      // Satélite inactivo / chatarra espacial con paneles
      ctx.fillStyle = "#3b235a";
      ctx.strokeStyle = "#ff6b35";
      ctx.lineWidth = 1.8;
      ctx.fillRect(-hz.r * 0.95, -5, hz.r * 1.9, 10);
      ctx.strokeRect(-hz.r * 0.95, -5, hz.r * 1.9, 10);

      ctx.beginPath();
      ctx.arc(0, 0, hz.r * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = "#ff6b35";
      ctx.fill();
    } else {
      // Asteroide / roca volcánica irregular
      ctx.beginPath();
      hz.poly.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();

      const g = ctx.createRadialGradient(0, 0, 4, 0, 0, hz.r);
      g.addColorStop(0, "#ff8c42");
      g.addColorStop(0.6, "#b83b14");
      g.addColorStop(1, "#5c1908");
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = "#ff6b35";
      ctx.lineWidth = 1.8;
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawTarget(t) {
    const unlocked = state.collected >= 3;
    const color = unlocked ? "#2ec4b6" : "#a855f7";

    ctx.save();
    ctx.translate(t.x, t.y);

    // Anillo exterior giratorio
    ctx.save();
    ctx.rotate(state.frame * (unlocked ? 0.035 : 0.012));
    ctx.beginPath();
    ctx.arc(0, 0, t.r + 6, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([12, 8]);
    ctx.stroke();
    ctx.restore();

    // Plataforma interior
    ctx.shadowColor = color;
    ctx.shadowBlur = unlocked ? 20 : 8;
    ctx.beginPath();
    ctx.arc(0, 0, t.r, 0, Math.PI * 2);
    ctx.fillStyle = unlocked ? "rgba(46, 196, 182, 0.28)" : "rgba(168, 85, 247, 0.14)";
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.font = "30px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(t.emoji, 0, 1);

    ctx.restore();
  }

  function drawPlayer(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);

    // Flama de propulsor cuando acelera
    if (p.thrusting) {
      const flameLen = 14 + Math.random() * 10;
      ctx.beginPath();
      ctx.moveTo(-p.r * 0.75, -5);
      ctx.lineTo(-p.r - flameLen, 0);
      ctx.lineTo(-p.r * 0.75, 5);
      ctx.closePath();
      ctx.fillStyle = "#2ec4b6";
      ctx.fill();
    }

    // Paneles laterales del dron
    ctx.fillStyle = "#6b21a8";
    ctx.strokeStyle = "#c084fc";
    ctx.lineWidth = 1.5;
    ctx.fillRect(-6, -p.r - 3, 12, (p.r + 3) * 2);
    ctx.strokeRect(-6, -p.r - 3, 12, (p.r + 3) * 2);

    // Fuselaje triangular/aerodinámico
    ctx.shadowColor = "#ff9e44";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(p.r + 4, 0);
    ctx.lineTo(-p.r * 0.85, -p.r * 0.75);
    ctx.lineTo(-p.r * 0.5, 0);
    ctx.lineTo(-p.r * 0.85, p.r * 0.75);
    ctx.closePath();
    ctx.fillStyle = "#ff9e44";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Visor de cabina
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(3, 0, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = "#130924";
    ctx.fill();

    ctx.restore();
  }

  function drawParticles() {
    for (let i = state.particles.length - 1; i >= 0; i--) {
      const pt = state.particles[i];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.life -= pt.decay;
      if (pt.life <= 0) {
        state.particles.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = pt.life;
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function render() {
    const w = canvas.width;
    const h = canvas.height;

    drawBackground(w, h);
    state.beacons.forEach(drawBeacon);
    state.samples.forEach(drawSample);
    state.hazards.forEach(drawHazard);
    drawTarget(state.target);
    drawParticles();
    drawPlayer(state.player);

    // Etiqueta táctica del sector
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.font = "600 12px Orbitron, monospace";
    ctx.textAlign = "left";
    const levelLabel = (typeof I18N !== "undefined") ? I18N.t("levelHudLabel") : "NIVEL";
    const dynamicSectorLabel = (state.sectorDef && state.sectorDef.label) ? state.sectorDef.label : state.sectorLabel;
    ctx.fillText(`${dynamicSectorLabel} // ${levelLabel} ${state.missionIndex + 1}/${state.totalMissions}`, 20, 26);

    // Mensajes flotantes del HUD (colisión, batería baja, datos recolectados)
    if (state.hudMessage && state.hudMessage.timer > 0) {
      state.hudMessage.timer--;
      ctx.save();
      ctx.font = "bold 13px Orbitron, monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = state.hudMessage.color || "#ff9e44";
      ctx.shadowColor = state.hudMessage.color || "#ff9e44";
      ctx.shadowBlur = 10;
      ctx.fillText(state.hudMessage.text, w / 2, 26);
      ctx.restore();
    }
  }

  function triggerHudMessage(text, color = "#ff9e44") {
    if (!state) return;
    state.hudMessage = { text, color, timer: 75 };
  }

  function tick() {
    if (!state || !state.running) return;
    state.frame += 1;

    const p = state.player;
    let ax = 0;
    let ay = 0;
    if (keys["arrowup"] || keys["w"]) ay -= p.accel;
    if (keys["arrowdown"] || keys["s"]) ay += p.accel;
    if (keys["arrowleft"] || keys["a"]) ax -= p.accel;
    if (keys["arrowright"] || keys["d"]) ax += p.accel;

    p.thrusting = ax !== 0 || ay !== 0;
    if (p.thrusting) {
      p.vx += ax;
      p.vy += ay;
      p.angle = Math.atan2(p.vy, p.vx);
      if (state.frame % 3 === 0) {
        spawnParticles(
          p.x - Math.cos(p.angle) * p.r,
          p.y - Math.sin(p.angle) * p.r,
          "#2ec4b6",
          1,
          1.2
        );
      }
    }

    // Ráfagas intermitentes en Marte
    state.windActive = state.physics === "mars" && (state.frame % 420 < 240);
    if (state.windActive && state.windForce) {
      p.vx += state.windForce.x;
      p.vy += state.windForce.y;
    }

    p.vx *= p.friction;
    p.vy *= p.friction;
    p.x += p.vx;
    p.y += p.vy;

    p.x = Math.max(p.r, Math.min(canvas.width - p.r, p.x));
    p.y = Math.max(p.r, Math.min(canvas.height - p.r, p.y));

    // Drenaje de señal
    state.signal -= state.signalDrain;
    if (state.signal <= 25 && !state.lowBatteryTriggered) {
      triggerHudMessage((typeof I18N !== "undefined") ? I18N.t("minigameLowBattery") : "⚠️ BATERÍA CRÍTICA", "#ff6b35");
      state.lowBatteryTriggered = true;
    } else if (state.signal > 35) {
      state.lowBatteryTriggered = false;
    }

    if (state.signal <= 0) {
      state.signal = 100;
      triggerHudMessage((typeof I18N !== "undefined") ? I18N.t("minigameReboot") : "🔄 SEÑAL PERDIDA - REINICIANDO", "#ff6b35");
      spawnParticles(p.x, p.y, "#ff6b35", 18, 3.5);
      p.x = canvas.width * 0.085;
      p.y = canvas.height * 0.50;
      p.vx = 0;
      p.vy = 0;
      p.angle = 0;
    }

    // Recarga en balizas
    state.beacons.forEach((b) => {
      if (Math.hypot(p.x - b.x, p.y - b.y) < p.r + b.r + 12) {
        state.signal = Math.min(100, state.signal + 1.35);
      }
    });

    // Recolección de muestras
    state.samples.forEach((s) => {
      if (!s.taken && Math.hypot(p.x - s.x, p.y - s.y) < p.r + s.r) {
        s.taken = true;
        state.collected += 1;
        const dataPrefix = (typeof I18N !== "undefined") ? I18N.t("minigameDataCollected") : "📦 DATO RECUPERADO";
        triggerHudMessage(`${dataPrefix} (${state.collected}/3)`, "#c084fc");
        spawnParticles(s.x, s.y, "#c084fc", 16, 3.2);
      }
    });

    // Actualización de obstáculos
    state.hazards.forEach((hz) => {
      if (hz.type === "orbit") {
        hz.angle += hz.speed;
        hz.x = hz.cx + Math.cos(hz.angle) * hz.orbitR;
        hz.y = hz.cy + Math.sin(hz.angle) * hz.orbitR;
      } else {
        hz.x += hz.vx;
        hz.y += hz.vy;
        if (hz.x < hz.r + 24 || hz.x > canvas.width - hz.r - 24) hz.vx *= -1;
        if (hz.y < hz.r + 24 || hz.y > canvas.height - hz.r - 24) hz.vy *= -1;
      }

      if (Math.hypot(p.x - hz.x, p.y - hz.y) < p.r + hz.r) {
        state.signal = Math.max(10, state.signal - 18);
        triggerHudMessage((typeof I18N !== "undefined") ? I18N.t("minigameCollision") : "💥 IMPACTO: PÉRDIDA DE SEÑAL", "#ff4d00");
        spawnParticles(p.x, p.y, "#ff6b35", 14, 3.5);
        p.vx = -4.5;
        p.x = Math.max(40, p.x - 32);
      }
    });

    // Victoria
    const t = state.target;
    if (Math.hypot(p.x - t.x, p.y - t.y) < p.r + t.r && state.collected >= 3) {
      triggerHudMessage((typeof I18N !== "undefined") ? I18N.t("minigameComplete") : "🎯 OBJETIVO ALCANZADO // SEÑAL RESCATADA", "#2ec4b6");
      stop();
      if (typeof state.onComplete === "function") state.onComplete();
      return;
    }

    updateHud();
    render();
    loopId = requestAnimationFrame(tick);
  }

  function start(config = {}) {
    stop();
    const w = canvas.width;
    const h = canvas.height;
    const sectorKey = detectSector(config);
    const sectorDef = (window.SectorMinigames && window.SectorMinigames[sectorKey]) || window.SectorMinigames.luna;
    const totalMissions = sectorDef.missions.length;
    const mIdx = detectMissionIndex(config, sectorKey, totalMissions);
    const level = sectorDef.missions[mIdx];

    state = {
      running: true,
      frame: 0,
      stars: createStars(w, h, 70),
      particles: [],
      bgColors: config.bgColors || ["#130924", "#241042"],
      onComplete: config.onComplete,
      sectorDef,
      sectorKey,
      sectorLabel: sectorDef.label,
      missionIndex: mIdx,
      totalMissions,
      physics: sectorDef.physics,
      signalDrain: sectorDef.signalDrain,
      windForce: level.windForce || null,
      windActive: false,
      signal: 100,
      collected: 0,
      hudMessage: null,
      lowBatteryTriggered: false,
      player: {
        x: w * 0.085,
        y: h * 0.50,
        vx: 0,
        vy: 0,
        angle: 0,
        thrusting: false,
        r: 18,
        accel: sectorDef.playerSpeed,
        friction: sectorDef.friction
      },
      target: {
        x: w * level.target.rx,
        y: h * level.target.ry,
        r: 30,
        emoji: config.emoji || "🛰️"
      },
      samples: level.samples.map((s) => ({
        x: w * jitter(s.rx, 0.025),
        y: h * jitter(s.ry, 0.035),
        r: 14,
        taken: false
      })),
      beacons: level.beacons.map((b) => ({
        x: w * b.rx,
        y: h * jitter(b.ry, 0.02),
        r: 22
      })),
      hazards: level.hazards.map((hz) => {
        const poly = createRockPolygon(hz.r, 9);
        if (hz.type === "orbit") {
          const cx = w * hz.cx;
          const cy = h * hz.cy;
          return {
            type: "orbit",
            cx,
            cy,
            orbitR: hz.orbitR,
            angle: hz.angle,
            speed: hz.speed,
            r: hz.r,
            poly,
            spin: Math.random() * Math.PI,
            x: cx + Math.cos(hz.angle) * hz.orbitR,
            y: cy + Math.sin(hz.angle) * hz.orbitR
          };
        }
        return {
          type: "patrol",
          x: w * hz.rx,
          y: h * hz.ry,
          r: hz.r,
          poly,
          spin: Math.random() * Math.PI,
          vx: hz.vx,
          vy: hz.vy
        };
      })
    };

    updateHud();
    tick();
  }

  function stop() {
    if (state) state.running = false;
    if (loopId) cancelAnimationFrame(loopId);
  }

  return { start, stop };
})();