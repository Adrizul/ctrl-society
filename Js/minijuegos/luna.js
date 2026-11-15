window.SectorMinigames = window.SectorMinigames || {};

window.SectorMinigames.luna = {
  label: "GRAVEDAD LUNAR · INERCIA BAJA",
  physics: "lunar",
  signalDrain: 0.048,
  playerSpeed: 0.55,
  friction: 0.88,
  missions: [
    // Misión 1: Ruta abierta, introducción a inercia
    {
      target: { rx: 0.91, ry: 0.50 },
      samples: [
        { rx: 0.28, ry: 0.22 },
        { rx: 0.52, ry: 0.78 },
        { rx: 0.74, ry: 0.28 }
      ],
      beacons: [
        { rx: 0.40, ry: 0.50 },
        { rx: 0.68, ry: 0.62 }
      ],
      hazards: [
        { type: "patrol", rx: 0.25, ry: 0.50, r: 22, vx: 0, vy: 2.3 },
        { type: "patrol", rx: 0.58, ry: 0.30, r: 24, vx: 0, vy: -2.6 }
      ]
    },
    // Misión 2: Muestras en extremos opuestos y patrulla horizontal
    {
      target: { rx: 0.91, ry: 0.22 },
      samples: [
        { rx: 0.22, ry: 0.80 },
        { rx: 0.50, ry: 0.20 },
        { rx: 0.78, ry: 0.76 }
      ],
      beacons: [
        { rx: 0.34, ry: 0.48 },
        { rx: 0.65, ry: 0.48 }
      ],
      hazards: [
        { type: "patrol", rx: 0.30, ry: 0.30, r: 23, vx: 0, vy: 2.9 },
        { type: "patrol", rx: 0.50, ry: 0.52, r: 22, vx: 2.5, vy: 0 },
        { type: "patrol", rx: 0.72, ry: 0.70, r: 24, vx: 0, vy: -3.0 }
      ]
    },
    // Misión 3: Corredor estrecho y 4 micrometeoritos
    {
      target: { rx: 0.91, ry: 0.80 },
      samples: [
        { rx: 0.24, ry: 0.20 },
        { rx: 0.54, ry: 0.50 },
        { rx: 0.80, ry: 0.24 }
      ],
      beacons: [
        { rx: 0.24, ry: 0.55 },
        { rx: 0.68, ry: 0.78 }
      ],
      hazards: [
        { type: "patrol", rx: 0.20, ry: 0.35, r: 22, vx: 2.4, vy: 0 },
        { type: "patrol", rx: 0.42, ry: 0.25, r: 24, vx: 0, vy: 3.3 },
        { type: "patrol", rx: 0.64, ry: 0.75, r: 24, vx: 0, vy: -3.3 },
        { type: "patrol", rx: 0.82, ry: 0.52, r: 22, vx: -2.2, vy: 0 }
      ]
    }
  ]
};