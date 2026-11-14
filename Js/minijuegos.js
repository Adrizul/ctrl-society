window.MinigameEngine = (function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");

  let loopId = null;
  let state = null;
  const keys = {};

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

  function updateHud() {
    document.getElementById("hud-samples").textContent = `${state.collected} / 3`;
    const pct = Math.max(0, Math.round(state.signal));
    document.getElementById("signal-percent").textContent = `${pct}%`;
    document.getElementById("signal-meter-fill").style.width = `${pct}%`;
  }

  function render() {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, state.bgColors[0]);
    grad.addColorStop(1, state.bgColors[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(168, 85, 247, 0.08)";
    for (let x = 0; x < canvas.width; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    state.beacons.forEach((b) => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 158, 68, 0.22)";
      ctx.fill();
      ctx.strokeStyle = "#ff9e44";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    state.samples.forEach((s) => {
      if (s.taken) return;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "#a855f7";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
    });

    state.hazards.forEach((h) => {
      ctx.beginPath();
      ctx.arc(h.x, h.y, h.r, 0, Math.PI * 2);
      ctx.fillStyle = "#c85525";
      ctx.fill();
      ctx.strokeStyle = "#ff6b35";
      ctx.stroke();
    });

    const t = state.target;
    ctx.beginPath();
    ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
    ctx.fillStyle = state.collected >= 3 ? "rgba(46, 196, 182, 0.35)" : "rgba(255, 255, 255, 0.1)";
    ctx.fill();
    ctx.font = "32px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(t.emoji, t.x, t.y);

    const p = state.player;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "#ff9e44";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }

  function tick() {
    if (!state || !state.running) return;

    const p = state.player;
    if (keys["arrowup"] || keys["w"]) p.y -= p.speed;
    if (keys["arrowdown"] || keys["s"]) p.y += p.speed;
    if (keys["arrowleft"] || keys["a"]) p.x -= p.speed;
    if (keys["arrowright"] || keys["d"]) p.x += p.speed;

    p.x = Math.max(p.r, Math.min(canvas.width - p.r, p.x));
    p.y = Math.max(p.r, Math.min(canvas.height - p.r, p.y));

    state.signal -= 0.055;
    if (state.signal <= 0) {
      state.signal = 100;
      p.x = 80;
      p.y = 250;
    }

    state.beacons.forEach((b) => {
      if (Math.hypot(p.x - b.x, p.y - b.y) < p.r + b.r) {
        state.signal = Math.min(100, state.signal + 1.2);
      }
    });

    state.samples.forEach((s) => {
      if (!s.taken && Math.hypot(p.x - s.x, p.y - s.y) < p.r + s.r) {
        s.taken = true;
        state.collected += 1;
      }
    });

    state.hazards.forEach((h) => {
      h.y += h.vy;
      if (h.y < h.r + 20 || h.y > canvas.height - h.r - 20) h.vy *= -1;
      if (Math.hypot(p.x - h.x, p.y - h.y) < p.r + h.r) {
        state.signal = Math.max(10, state.signal - 18);
        p.x = Math.max(40, p.x - 45);
      }
    });

    const t = state.target;
    if (Math.hypot(p.x - t.x, p.y - t.y) < p.r + t.r && state.collected >= 3) {
      stop();
      if (typeof state.onComplete === "function") state.onComplete();
      return;
    }

    updateHud();
    render();
    loopId = requestAnimationFrame(tick);
  }

  function start(config) {
    stop();
    state = {
      running: true,
      bgColors: config.bgColors,
      onComplete: config.onComplete,
      signal: 100,
      collected: 0,
      player: { x: 80, y: 250, r: 18, speed: 4.2 },
      target: { x: 870, y: 250, r: 30, emoji: config.emoji },
      samples: [
        { x: 280, y: 120, r: 14, taken: false },
        { x: 520, y: 390, r: 14, taken: false },
        { x: 710, y: 140, r: 14, taken: false }
      ],
      beacons: [
        { x: 380, y: 250, r: 22 },
        { x: 660, y: 320, r: 22 }
      ],
      hazards: [
        { x: 240, y: 250, r: 24, vy: 2.6 },
        { x: 470, y: 160, r: 26, vy: -3.1 },
        { x: 640, y: 200, r: 24, vy: 2.9 }
      ]
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