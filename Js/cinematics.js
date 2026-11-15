const BF2Cinematics = (() => {
  // Inyecta los estilos automáticamente para evitar que los elementos se apilen verticalmente
  function ensureStyles() {
    if (document.getElementById('bf2-cinematics-styles')) return;

    const style = document.createElement('style');
    style.id = 'bf2-cinematics-styles';
    style.textContent = `
      .visor-overlay {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 99999 !important;
        background: #03050c !important;
        overflow: hidden !important;
        font-family: 'Courier New', Courier, monospace !important;
        color: #00f0ff !important;
        user-select: none;
        transition: opacity 0.4s ease, visibility 0.4s ease;
      }
      .visor-overlay.is-hidden {
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }

      /* Capa 1: Campo de estrellas */
      .visor-starfield {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        z-index: 1 !important;
        display: block !important;
      }

      /* Capa 2: Cristal del visor + cuadrícula táctica */
      .visor-glass-fx {
        position: absolute !important;
        inset: 0 !important;
        z-index: 2 !important;
        pointer-events: none !important;
        background:
          radial-gradient(circle at center, transparent 42%, rgba(3, 5, 14, 0.72) 82%, rgba(2, 3, 10, 0.96) 100%),
          linear-gradient(rgba(0, 240, 255, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 240, 255, 0.04) 1px, transparent 1px);
        background-size: 100% 100%, 54px 54px, 54px 54px;
      }

      /* Capa 3: Estructura curva del visor de la nave y mira central */
      .visor-frame-svg {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        z-index: 3 !important;
        pointer-events: none !important;
      }

      /* Capa 4: Escenario central (Planeta o Escáner de Dron) */
      .visor-center-stage {
        position: absolute !important;
        inset: 0 !important;
        z-index: 4 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        pointer-events: none !important;
      }

      /* Planeta en acercamiento escalonado */
      .visor-planet-disc {
        position: relative;
        width: min(54vw, 340px);
        height: min(54vw, 340px);
        border-radius: 50%;
        background-color: #1e293b;
        background-size: cover;
        background-position: center;
        box-shadow:
          0 0 70px rgba(168, 85, 247, 0.35),
          0 0 25px rgba(0, 240, 255, 0.25),
          inset -28px -28px 55px rgba(0, 0, 0, 0.88);
        animation: bf2ShipApproach 10.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      .visor-planet-disc::before,
      .visor-planet-disc::after {
        content: '';
        position: absolute;
        border-radius: 50%;
      }
      .visor-planet-disc::before {
        inset: -22px;
        border: 1px dashed rgba(0, 240, 255, 0.45);
        animation: visorSpinSlow 14s linear infinite;
      }
      .visor-planet-disc::after {
        inset: -44px;
        border: 1px solid rgba(168, 85, 247, 0.4);
        border-top-color: #00f0ff;
        border-bottom-color: #a855f7;
        animation: visorSpinReverse 9s linear infinite;
      }

      @keyframes visorSpinSlow { to { transform: rotate(360deg); } }
      @keyframes visorSpinReverse { to { transform: rotate(-360deg); } }

      @keyframes bf2ShipApproach {
        0%   { transform: scale(0.15); filter: blur(5px) brightness(0.65); }
        12%  { transform: scale(0.34); filter: blur(0px) brightness(0.95); }
        25%  { transform: scale(0.38); filter: blur(0px) brightness(1); }
        28%  { transform: scale(0.70); filter: blur(6px) contrast(1.6) hue-rotate(25deg); }
        32%  { transform: scale(0.66); filter: blur(0px) brightness(1.05); }
        52%  { transform: scale(0.74); filter: blur(0px) brightness(1.05); }
        55%  { transform: scale(1.22); filter: blur(7px) contrast(1.8) hue-rotate(-25deg); }
        59%  { transform: scale(1.18); filter: blur(0px) brightness(1.15); }
        78%  { transform: scale(1.32); filter: blur(0px) brightness(1.2); }
        81%  { transform: scale(2.05); filter: blur(8px) contrast(2); }
        85%  { transform: scale(1.98); filter: blur(0px) brightness(1.3); }
        95%  { transform: scale(2.45); filter: blur(2px) brightness(1.6); opacity: 1; }
        100% { transform: scale(4.60); filter: blur(14px) brightness(3); opacity: 0; }
      }

      .visor-anomaly-ping {
        position: absolute;
        width: 14px;
        height: 14px;
        border: 1.5px solid #f97316;
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
        box-shadow: 0 0 12px #f97316;
        transition: transform 0.35s ease, opacity 0.35s ease;
      }
      .visor-anomaly-ping.is-visible {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
      .visor-anomaly-ping::after {
        content: attr(data-code);
        position: absolute;
        left: 18px;
        top: -4px;
        font-size: 9px;
        color: #fdba74;
        white-space: nowrap;
        background: rgba(3, 5, 14, 0.85);
        padding: 1px 5px;
      }

      /* Capa 5: HUD superior, brújula, escaleras y consola */
      .visor-compass {
        position: absolute !important;
        top: 22px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        z-index: 5 !important;
        width: min(60vw, 420px);
        height: 26px;
        border-bottom: 1px solid rgba(0, 240, 255, 0.45);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .visor-compass-track {
        display: flex;
        gap: 26px;
        font-size: 11px;
        letter-spacing: 2px;
        white-space: nowrap;
        animation: visorCompassSlide 10s ease-in-out infinite alternate;
      }
      .visor-compass-marker {
        position: absolute;
        bottom: -1px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 7px solid #f97316;
      }
      @keyframes visorCompassSlide {
        0%   { transform: translateX(65px); }
        100% { transform: translateX(-65px); }
      }

      .visor-pitch-ladder {
        position: absolute !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
        z-index: 5 !important;
        width: 72px;
        height: 220px;
        overflow: hidden;
        opacity: 0.7;
        pointer-events: none;
      }
      .visor-pitch-ladder.left  { left: clamp(16px, 5vw, 68px); border-right: 1px solid rgba(0, 240, 255, 0.35); }
      .visor-pitch-ladder.right { right: clamp(16px, 5vw, 68px); border-left: 1px solid rgba(0, 240, 255, 0.35); }
      .visor-pitch-strip {
        display: flex;
        flex-direction: column;
        gap: 20px;
        font-size: 10px;
        animation: visorPitchDescend 9s ease-in-out infinite alternate;
      }
      .visor-pitch-ladder.left .visor-pitch-strip  { align-items: flex-end; padding-right: 8px; }
      .visor-pitch-ladder.right .visor-pitch-strip { align-items: flex-start; padding-left: 8px; }
      @keyframes visorPitchDescend {
        0%   { transform: translateY(-90px); }
        100% { transform: translateY(10px); }
      }

      .visor-corner-hud {
        position: absolute !important;
        top: 54px !important;
        z-index: 6 !important;
        font-size: 0.74rem;
        line-height: 1.55;
        letter-spacing: 1px;
        background: rgba(4, 7, 18, 0.78);
        border-left: 2px solid #a855f7;
        padding: 8px 12px;
        backdrop-filter: blur(4px);
      }
      .visor-corner-hud.left  { left: 22px !important; }
      .visor-corner-hud.right {
        right: 22px !important;
        text-align: right;
        border-left: none;
        border-right: 2px solid #00f0ff;
      }

      .visor-skip-btn {
        margin-top: 6px;
        background: rgba(0, 240, 255, 0.14);
        border: 1px solid rgba(0, 240, 255, 0.55);
        color: #00f0ff;
        font-family: inherit;
        font-size: 0.7rem;
        padding: 5px 11px;
        cursor: pointer;
        letter-spacing: 1px;
        transition: background 0.2s ease, transform 0.15s ease;
      }
      .visor-skip-btn:hover {
        background: rgba(0, 240, 255, 0.3);
        transform: scale(1.03);
      }

      .visor-status-panel {
        position: absolute !important;
        bottom: 24px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        z-index: 6 !important;
        width: min(90vw, 480px);
        background: rgba(4, 7, 18, 0.88);
        border: 1px solid rgba(0, 240, 255, 0.55);
        box-shadow: 0 0 28px rgba(0, 240, 255, 0.18), inset 0 0 18px rgba(168, 85, 247, 0.15);
        padding: 10px 16px;
        backdrop-filter: blur(5px);
      }
      .visor-status-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.78rem;
        letter-spacing: 1.5px;
        color: #ffffff;
        margin-bottom: 6px;
      }
      .visor-progress-bar {
        width: 100%;
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        overflow: hidden;
        margin-bottom: 8px;
        border-radius: 3px;
      }
      .visor-progress-fill {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #a855f7, #00f0ff);
        box-shadow: 0 0 10px #00f0ff;
        transition: width 0.35s ease, background 0.3s ease;
      }
      .visor-log-line {
        font-size: 0.72rem;
        color: #67e8f9;
        letter-spacing: 1px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* Caja central fusionada del escáner de señal del dron */
      .drone-visor-box {
        position: relative;
        width: min(86vw, 430px);
        padding: 22px 24px;
        border: 1.5px solid #00f0ff;
        border-radius: 10px;
        background: rgba(4, 7, 18, 0.84);
        text-align: center;
        box-shadow: 0 0 38px rgba(0, 240, 255, 0.24), inset 0 0 24px rgba(168, 85, 247, 0.16);
        backdrop-filter: blur(6px);
        pointer-events: auto;
        transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
      }
      .drone-visor-box.is-locked {
        border-color: #f97316;
        box-shadow: 0 0 45px rgba(249, 115, 22, 0.45), inset 0 0 24px rgba(249, 115, 22, 0.18);
        transform: scale(1.03);
      }

      .drone-wave-bars {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        gap: 6px;
        height: 44px;
        margin: 16px 0;
      }
      .drone-wave-bars span {
        width: 6px;
        background: #00f0ff;
        border-radius: 2px;
        animation: droneWavePulse 0.55s ease-in-out infinite alternate;
      }
      .drone-visor-box.is-locked .drone-wave-bars span {
        background: #f97316;
      }
      @keyframes droneWavePulse {
        from { height: 8px; opacity: 0.4; }
        to   { height: 42px; opacity: 1; }
      }

      .visor-overlay.is-glitching .visor-center-stage {
        animation: visorGlitchShake 0.22s steps(2, end);
      }
      @keyframes visorGlitchShake {
        0%   { transform: translate(0, 0); filter: hue-rotate(0deg); }
        25%  { transform: translate(-8px, 3px); filter: hue-rotate(90deg) contrast(1.8); }
        50%  { transform: translate(7px, -4px); filter: invert(0.15); }
        75%  { transform: translate(-4px, -2px); }
        100% { transform: translate(0, 0); filter: none; }
      }

      .visor-flash {
        position: absolute !important;
        inset: 0 !important;
        z-index: 9 !important;
        background: radial-gradient(circle, #ffffff 0%, #67e8f9 45%, #a855f7 85%, transparent 100%);
        opacity: 0;
        pointer-events: none !important;
      }
      .visor-flash.is-active {
        animation: visorOpticalFlash 0.6s ease-out forwards;
      }
      @keyframes visorOpticalFlash {
        0%   { opacity: 0; }
        35%  { opacity: 0.92; }
        100% { opacity: 0; }
      }

      @media (max-width: 640px) {
        .visor-pitch-ladder { display: none !important; }
        .visor-corner-hud { top: 52px !important; font-size: 0.64rem; padding: 6px 8px; }
      }
    `;
    document.head.appendChild(style);
  }

  function createShipAudio() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const humOsc = ctx.createOscillator();
      const humGain = ctx.createGain();
      humOsc.type = 'sawtooth';
      humOsc.frequency.setValueAtTime(52, ctx.currentTime);
      humGain.gain.setValueAtTime(0.016, ctx.currentTime);
      humOsc.connect(humGain);
      humGain.connect(ctx.destination);
      humOsc.start();

      return {
        beep(freq = 880, dur = 0.08, type = 'triangle', vol = 0.04) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = type;
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(vol, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + dur);
        },
        setEnginePitch(freq) {
          humOsc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + 0.5);
        },
        close() {
          try {
            humOsc.stop();
            ctx.close();
          } catch (_) {}
        }
      };
    } catch (_) {
      return { beep() {}, setEnginePitch() {}, close() {} };
    }
  }

  function startStarfield(canvas, getSpeed) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId = null;

    const stars = Array.from({ length: 150 }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width
    }));

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    function render() {
      ctx.fillStyle = 'rgba(3, 5, 12, 0.36)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const speed = getSpeed();

      for (const s of stars) {
        const prevZ = s.z;
        s.z -= speed;
        if (s.z <= 1) {
          s.x = (Math.random() - 0.5) * width;
          s.y = (Math.random() - 0.5) * height;
          s.z = width;
          continue;
        }

        const sx = cx + (s.x / s.z) * width;
        const sy = cy + (s.y / s.z) * height;
        const px = cx + (s.x / prevZ) * width;
        const py = cy + (s.y / prevZ) * height;

        const alpha = Math.min(1, (1 - s.z / width) * 1.3);
        ctx.strokeStyle = s.z < width * 0.4 ? `rgba(0, 240, 255, ${alpha})` : `rgba(216, 180, 254, ${alpha})`;
        ctx.lineWidth = Math.max(1, (1 - s.z / width) * 2.4);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }

  function getVisorFrameSVG() {
    return `
      <svg class="visor-frame-svg" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="visorEdge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#a855f7" stop-opacity="0.8"/>
            <stop offset="50%" stop-color="#00f0ff" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#a855f7" stop-opacity="0.8"/>
          </linearGradient>
        </defs>
        <path d="M 0,92 Q 720,16 1440,92" fill="none" stroke="url(#visorEdge)" stroke-width="2.5"/>
        <path d="M 0,808 Q 720,884 1440,808" fill="none" stroke="url(#visorEdge)" stroke-width="2.5"/>
        <polygon points="0,0 135,0 65,120 0,180" fill="rgba(8,12,28,0.84)" stroke="#00f0ff" stroke-opacity="0.35"/>
        <polygon points="1440,0 1305,0 1375,120 1440,180" fill="rgba(8,12,28,0.84)" stroke="#00f0ff" stroke-opacity="0.35"/>
        <polygon points="0,900 155,900 75,770 0,710" fill="rgba(8,12,28,0.88)" stroke="#a855f7" stroke-opacity="0.45"/>
        <polygon points="1440,900 1285,900 1365,770 1440,710" fill="rgba(8,12,28,0.88)" stroke="#a855f7" stroke-opacity="0.45"/>
        <!-- Mira táctica central -->
        <circle cx="720" cy="450" r="195" fill="none" stroke="#00f0ff" stroke-width="1" stroke-dasharray="6 8" stroke-opacity="0.35"/>
        <line x1="470" y1="450" x2="515" y2="450" stroke="#00f0ff" stroke-width="1.5" stroke-opacity="0.7"/>
        <line x1="925" y1="450" x2="970" y2="450" stroke="#00f0ff" stroke-width="1.5" stroke-opacity="0.7"/>
        <line x1="720" y1="205" x2="720" y2="245" stroke="#00f0ff" stroke-width="1.5" stroke-opacity="0.7"/>
        <line x1="720" y1="655" x2="720" y2="695" stroke="#00f0ff" stroke-width="1.5" stroke-opacity="0.7"/>
      </svg>
    `;
  }

  // =========================================================
  // 1. CINEMÁTICA DE ENTRADA AL SECTOR (10.5 SEGUNDOS)
  // =========================================================
  function playSectorDescent({
    sectorName = 'SECTOR 01 // LA LUNA',
    coords = '00° 40\' 26" N, 23° 28\' 22" E',
    planetImage = ''
  } = {}) {
    ensureStyles();
    let starSpeed = 24;
    const audio = createShipAudio();

    const overlay = document.createElement('div');
    overlay.className = 'visor-overlay';
    overlay.innerHTML = `
      <canvas class="visor-starfield"></canvas>
      <div class="visor-glass-fx"></div>
      ${getVisorFrameSVG()}

      <div class="visor-compass">
        <div class="visor-compass-track">
          <span>270 W</span><span>300</span><span>330</span>
          <strong style="color:#fff;">000 N</strong>
          <span>030</span><span>060</span><span>090 E</span><span>120</span>
        </div>
        <div class="visor-compass-marker"></div>
      </div>

      <div class="visor-pitch-ladder left">
        <div class="visor-pitch-strip">
          <span>+40 —</span><span>+30 —</span><span>+20 —</span><span>+10 —</span>
          <strong style="color:#f97316;">000 ═</strong>
          <span>-10 —</span><span>-20 —</span><span>-30 —</span><span>-40 —</span>
        </div>
      </div>
      <div class="visor-pitch-ladder right">
        <div class="visor-pitch-strip">
          <span>— +40</span><span>— +30</span><span>— +20</span><span>— +10</span>
          <strong style="color:#f97316;">═ 000</strong>
          <span>— -10</span><span>— -20</span><span>— -30</span><span>— -40</span>
        </div>
      </div>

      <div class="visor-corner-hud left">
        <div style="color:#c084fc;font-weight:bold;">${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "SHIP: CTRL-EXPLORER // VISOR MK-IV" : "NAVE: CTRL-EXPLORER // VISOR MK-IV"}</div>
        <div>${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "DESTINATION:" : "DESTINO:"} <strong style="color:#fff;">${sectorName}</strong></div>
        <div id="visor-alt">${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "ALTITUDE: 384,400 KM" : "ALTITUD: 384,400 KM"}</div>
        <div id="visor-vel">${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "VELOCITY: 11.2 KM/S" : "VELOCIDAD: 11.2 KM/S"}</div>
      </div>

      <div class="visor-corner-hud right">
        <div>COORD: ${coords}</div>
        <div>${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "SATELLITE LINK:" : "ENLACE SATELITAL:"} <span id="visor-link-state" style="color:#f97316;">${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "SYNCHRONIZING" : "SINCRONIZANDO"}</span></div>
        <button type="button" class="visor-skip-btn" id="visor-skip-btn">${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "[ SKIP VISOR ⏭ ]" : "[ OMITIR VISOR ⏭ ]"}</button>
      </div>

      <div class="visor-center-stage">
        <div class="visor-planet-disc" id="visor-planet-disc">
          <div class="visor-anomaly-ping" data-code="SIG-01" style="top:32%;left:38%;"></div>
          <div class="visor-anomaly-ping" data-code="SIG-02" style="top:58%;left:64%;"></div>
          <div class="visor-anomaly-ping" data-code="SIG-03" style="top:68%;left:34%;"></div>
          <div class="visor-anomaly-ping" data-code="SIG-04" style="top:28%;left:62%;"></div>
        </div>
      </div>

      <div class="visor-status-panel">
        <div class="visor-status-header">
          <span id="visor-phase-title">${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "PHASE 1 // DEEP SPACE APPROACH" : "FASE 1 // APROXIMACIÓN DE ESPACIO PROFUNDO"}</span>
          <strong id="visor-pct" style="color:#00f0ff;">0%</strong>
        </div>
        <div class="visor-progress-bar">
          <div class="visor-progress-fill" id="visor-fill"></div>
        </div>
        <div class="visor-log-line" id="visor-log">&gt; ${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "INITIALIZING VISOR OPTICAL SENSORS..." : "INICIANDO SENSORES ÓPTICOS DEL VISOR..."}</div>
      </div>

      <div class="visor-flash" id="visor-flash"></div>
    `;

    document.body.appendChild(overlay);

    const stopStars = startStarfield(overlay.querySelector('.visor-starfield'), () => starSpeed);
    const disc = overlay.querySelector('#visor-planet-disc');
    if (planetImage) disc.style.backgroundImage = `url('${planetImage}')`;

    const pctEl = overlay.querySelector('#visor-pct');
    const fillEl = overlay.querySelector('#visor-fill');
    const phaseEl = overlay.querySelector('#visor-phase-title');
    const logEl = overlay.querySelector('#visor-log');
    const altEl = overlay.querySelector('#visor-alt');
    const velEl = overlay.querySelector('#visor-vel');
    const linkEl = overlay.querySelector('#visor-link-state');
    const flashEl = overlay.querySelector('#visor-flash');
    const pings = overlay.querySelectorAll('.visor-anomaly-ping');

    function triggerGlitch(freq = 760) {
      overlay.classList.add('is-glitching');
      audio.beep(freq, 0.11, 'sawtooth', 0.045);
      setTimeout(() => overlay.classList.remove('is-glitching'), 240);
    }

    const isEn = typeof I18N !== "undefined" && I18N.getLang() === "en";

    const timeline = [
      {
        t: 400, pct: '12%',
        phase: isEn ? 'PHASE 1 // ORBITAL DECELERATION' : 'FASE 1 // DESACELERACIÓN ORBITAL',
        log: isEn ? '> BRAKING ENGINES ACTIVE. CALIBRATING VISOR...' : '> MOTORES DE FRENADO ACTIVOS. CALIBRANDO VISOR...',
        alt: isEn ? 'ALTITUDE: 295,100 KM' : 'ALTITUD: 295,100 KM',
        vel: isEn ? 'VELOCITY: 8.4 KM/S' : 'VELOCIDAD: 8.4 KM/S',
        fn: () => { starSpeed = 16; audio.beep(620, 0.08); }
      },
      {
        t: 2750, pct: '36%',
        phase: isEn ? 'PHASE 2 // HIGH ORBIT OPTICAL JUMP' : 'FASE 2 // SALTO ÓPTICO DE ÓRBITA ALTA',
        log: isEn ? '> SATELLITE LINK ESTABLISHED. ZOOMING OPTICS x2...' : '> ENLACE SATELITAL ESTABLECIDO. ACERCANDO ÓPTICA x2...',
        alt: isEn ? 'ALTITUDE: 94,200 KM' : 'ALTITUD: 94,200 KM',
        vel: isEn ? 'VELOCITY: 4.9 KM/S' : 'VELOCIDAD: 4.9 KM/S',
        fn: () => { starSpeed = 10; audio.setEnginePitch(68); triggerGlitch(840); }
      },
      {
        t: 5450, pct: '68%',
        phase: isEn ? 'PHASE 3 // SCANNING FOR LOST SIGNALS' : 'FASE 3 // ESCANEO DE SEÑALES PERDIDAS',
        log: isEn ? '> DETECTED 4 NASA HARDWARE BEACONS ON SURFACE...' : '> DETECTADAS 4 BALIZAS DE HARDWARE NASA EN SUPERFICIE...',
        alt: isEn ? 'ALTITUDE: 14,800 KM' : 'ALTITUD: 14,800 KM',
        vel: isEn ? 'VELOCITY: 2.1 KM/S' : 'VELOCIDAD: 2.1 KM/S',
        fn: () => {
          starSpeed = 5;
          triggerGlitch(980);
          pings.forEach((p, idx) => {
            setTimeout(() => {
              p.classList.add('is-visible');
              audio.beep(1100 + idx * 90, 0.06, 'sine', 0.035);
            }, idx * 320);
          });
        }
      },
      {
        t: 8050, pct: '92%',
        phase: isEn ? 'PHASE 4 // LOCKING SECTOR COORDINATES' : 'FASE 4 // FIJACIÓN DE COORDENADAS DEL SECTOR',
        log: isEn ? '> TRIANGULATION COMPLETE. PREPARING INSERTION...' : '> TRIANGULACIÓN COMPLETA. PREPARANDO INSERCIÓN...',
        alt: isEn ? 'ALTITUDE: 1,450 KM' : 'ALTITUD: 1,450 KM',
        vel: isEn ? 'VELOCITY: 0.6 KM/S' : 'VELOCIDAD: 0.6 KM/S',
        fn: () => {
          starSpeed = 2.5;
          linkEl.textContent = isEn ? 'LOCKED [100%]' : 'FIJADO [100%]';
          linkEl.style.color = '#00f0ff';
          triggerGlitch(1240);
        }
      },
      {
        t: 9750, pct: '100%',
        phase: isEn ? 'LINK ESTABLISHED // WELCOME TO SECTOR' : 'ENLACE ESTABLECIDO // BIENVENIDO AL SECTOR',
        log: isEn ? '> DEPLOYING EXHIBITION INTERFACE...' : '> DESPLEGANDO INTERFAZ DE EXHIBICIÓN...',
        alt: isEn ? 'ALTITUDE: 0.2 KM' : 'ALTITUD: 0.2 KM',
        vel: isEn ? 'VELOCITY: 0.0 KM/S' : 'VELOCIDAD: 0.0 KM/S',
        fn: () => {
          flashEl.classList.add('is-active');
          audio.beep(1480, 0.22, 'triangle', 0.055);
        }
      }
    ];

    const timers = timeline.map(step => setTimeout(() => {
      pctEl.textContent = step.pct;
      fillEl.style.width = step.pct;
      phaseEl.textContent = step.phase;
      logEl.textContent = step.log;
      altEl.textContent = step.alt;
      velEl.textContent = step.vel;
      if (step.fn) step.fn();
    }, step.t));

    const endTimer = setTimeout(cleanup, 10500);

    function cleanup() {
      timers.forEach(clearTimeout);
      clearTimeout(endTimer);
      window.removeEventListener('keydown', onKey);
      stopStars();
      audio.close();
      overlay.classList.add('is-hidden');
      setTimeout(() => overlay.remove(), 450);
    }

    function onKey(e) {
      if (e.key === 'Escape') cleanup();
    }

    window.addEventListener('keydown', onKey);
    overlay.querySelector('#visor-skip-btn').addEventListener('click', cleanup);
  }

  // =========================================================
  // 2. VISOR DE NAVE + RASTREO DE DRON FUSIONADO (4.8 SEGUNDOS)
  // =========================================================
  function playMinigameLockOn(pieceTitle = 'HARDWARE ABANDONADO', onComplete = () => {}) {
    ensureStyles();
    let starSpeed = 18;
    const audio = createShipAudio();

    const overlay = document.createElement('div');
    overlay.className = 'visor-overlay';
    overlay.innerHTML = `
      <canvas class="visor-starfield"></canvas>
      <div class="visor-glass-fx"></div>
      ${getVisorFrameSVG()}

      <!-- Brújula y escaleras laterales del visor de nave -->
      <div class="visor-compass">
        <div class="visor-compass-track">
          <span>270 W</span><span>300</span><span>330</span>
          <strong style="color:#fff;">RECON-01</strong>
          <span>030</span><span>060</span><span>090 E</span>
        </div>
        <div class="visor-compass-marker"></div>
      </div>

      <div class="visor-pitch-ladder left">
        <div class="visor-pitch-strip">
          <span>+20 —</span><span>+10 —</span>
          <strong style="color:#f97316;">LOCK ═</strong>
          <span>-10 —</span><span>-20 —</span>
        </div>
      </div>
      <div class="visor-pitch-ladder right">
        <div class="visor-pitch-strip">
          <span>— +20</span><span>— +10</span>
          <strong style="color:#f97316;">═ LOCK</strong>
          <span>— -10</span><span>— -20</span>
        </div>
      </div>

      <!-- HUD superior izquierdo y derecho -->
      <div class="visor-corner-hud left">
        <div style="color:#c084fc;font-weight:bold;">${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "TRACKING DRONE // RECON-01 UNIT" : "DRON DE RASTREO // UNIDAD RECON-01"}</div>
        <div>${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "TARGET:" : "OBJETIVO:"} <strong style="color:#fff;">${pieceTitle}</strong></div>
        <div id="drone-dist">${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "DISTANCE TO TARGET: 2,400 M" : "DISTANCIA AL OBJETIVO: 2,400 M"}</div>
      </div>

      <div class="visor-corner-hud right">
        <div>${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "MODE: TACTICAL TELEMETRY" : "MODO: TELEMETRÍA TÁCTICA"}</div>
        <div>${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "SIGNAL:" : "SEÑAL:"} <span id="drone-sig-state" style="color:#00f0ff;">${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "SCANNING" : "BUSCANDO"}</span></div>
        <button type="button" class="visor-skip-btn" id="drone-skip-btn">${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "[ SKIP DEPLOYMENT ⏭ ]" : "[ SALTAR DESPLIEGUE ⏭ ]"}</button>
      </div>

      <!-- Caja central fusionada sobre la mira y las estrellas -->
      <div class="visor-center-stage">
        <div class="drone-visor-box" id="drone-box">
          <div style="font-size:0.74rem;letter-spacing:2px;color:#67e8f9;" id="drone-sub">
            ${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "SCANNING BEACON FREQUENCY..." : "ESCANEANDO FRECUENCIA DE BALIZA..."}
          </div>
          <div style="font-size:1.18rem;font-weight:bold;letter-spacing:2px;margin-top:6px;color:#fff;">
            ${pieceTitle}
          </div>

          <div class="drone-wave-bars">
            <span style="animation-delay:0.0s"></span>
            <span style="animation-delay:0.15s"></span>
            <span style="animation-delay:0.3s"></span>
            <span style="animation-delay:0.1s"></span>
            <span style="animation-delay:0.25s"></span>
            <span style="animation-delay:0.4s"></span>
            <span style="animation-delay:0.2s"></span>
            <span style="animation-delay:0.05s"></span>
          </div>

          <div class="visor-progress-bar">
            <div class="visor-progress-fill" id="drone-fill" style="width:15%;"></div>
          </div>
          <div style="font-size:0.74rem;letter-spacing:1.5px;color:#00f0ff;" id="drone-status">
            ${(typeof I18N !== "undefined" && I18N.getLang() === "en") ? "CALIBRATING RESCUE SENSORS [15%]" : "CALIBRANDO SENSORES DE RESCATE [15%]"}
          </div>
        </div>
      </div>

      <div class="visor-flash" id="drone-flash"></div>
    `;

    document.body.appendChild(overlay);
    const stopStars = startStarfield(overlay.querySelector('.visor-starfield'), () => starSpeed);

    const box = overlay.querySelector('#drone-box');
    const distEl = overlay.querySelector('#drone-dist');
    const sigEl = overlay.querySelector('#drone-sig-state');
    const subEl = overlay.querySelector('#drone-sub');
    const fillEl = overlay.querySelector('#drone-fill');
    const statusEl = overlay.querySelector('#drone-status');
    const flashEl = overlay.querySelector('#drone-flash');

    const isEn = typeof I18N !== "undefined" && I18N.getLang() === "en";

    const steps = [
      {
        t: 1100,
        fn: () => {
          starSpeed = 11;
          distEl.textContent = isEn ? 'DISTANCE TO TARGET: 1,150 M' : 'DISTANCIA AL OBJETIVO: 1,150 M';
          fillEl.style.width = '48%';
          statusEl.textContent = isEn ? 'ISOLATING SOLAR INTERFERENCE [48%]' : 'AISLANDO INTERFERENCIA SOLAR [48%]';
          audio.beep(780, 0.08);
        }
      },
      {
        t: 2500,
        fn: () => {
          starSpeed = 4;
          box.classList.add('is-locked');
          distEl.textContent = isEn ? 'DISTANCE TO TARGET: 180 M' : 'DISTANCIA AL OBJETIVO: 180 M';
          sigEl.textContent = isEn ? 'LOCKED [100%]' : 'FIJADA [100%]';
          sigEl.style.color = '#f97316';
          subEl.textContent = isEn ? 'SIGNAL LOCATED ON SURFACE!' : '¡SEÑAL LOCALIZADA EN SUPERFICIE!';
          subEl.style.color = '#f97316';
          fillEl.style.width = '86%';
          fillEl.style.background = '#f97316';
          statusEl.textContent = isEn ? 'TARGET LOCKED — COMMENCING DESCENT [86%]' : 'OBJETIVO FIJADO — INICIANDO DESCENSO [86%]';
          statusEl.style.color = '#fdba74';
          audio.beep(1180, 0.14, 'square', 0.05);
        }
      },
      {
        t: 4100,
        fn: () => {
          distEl.textContent = isEn ? 'DISTANCE TO TARGET: 0 M' : 'DISTANCIA AL OBJETIVO: 0 M';
          fillEl.style.width = '100%';
          statusEl.textContent = isEn ? 'DRONE DEPLOYED [100%]' : 'DRON DESPLEGADO [100%]';
          flashEl.classList.add('is-active');
          audio.beep(1520, 0.2, 'triangle', 0.055);
        }
      }
    ];

    const timers = steps.map(s => setTimeout(s.fn, s.t));
    const endTimer = setTimeout(finish, 4700);

    function finish() {
      timers.forEach(clearTimeout);
      clearTimeout(endTimer);
      stopStars();
      audio.close();
      overlay.classList.add('is-hidden');
      onComplete();
      setTimeout(() => overlay.remove(), 400);
    }

    overlay.querySelector('#drone-skip-btn').addEventListener('click', finish);
  }

  return { playSectorDescent, playMinigameLockOn };
})();