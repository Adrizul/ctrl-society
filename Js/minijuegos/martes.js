window.SectorMinigames = window.SectorMinigames || {};

window.SectorMinigames.marte = {
  get label() {
    return (typeof I18N !== "undefined") ? I18N.t("minigameLabelMarte") : "TORMENTA MARCIANA · RÁFAGAS DE VIENTO";
  },
  physics: "mars",
  signalDrain: 0.058,
  playerSpeed: 0.68,
  friction: 0.84,
  missions: [
    // Misión 1: Viento leve + muestras en zig-zag
    {
      windForce: { x: -0.14, y: 0.06 },
      target: { rx: 0.91, ry: 0.50 },
      samples: [
        { rx: 0.26, ry: 0.75 },
        { rx: 0.52, ry: 0.24 },
        { rx: 0.76, ry: 0.74 }
      ],
      beacons: [
        { rx: 0.38, ry: 0.50 },
        { rx: 0.66, ry: 0.48 }
      ],
      hazards: [
        { type: "patrol", rx: 0.32, ry: 0.25, r: 24, vx: 0, vy: 3.1 },
        { type: "patrol", rx: 0.55, ry: 0.75, r: 25, vx: 0, vy: -3.2 },
        { type: "patrol", rx: 0.76, ry: 0.42, r: 22, vx: 2.6, vy: 0 }
      ]
    },
    // Misión 2: Viento cruzado medio + remolinos diagonales
    {
      windForce: { x: -0.20, y: -0.10 },
      target: { rx: 0.91, ry: 0.20 },
      samples: [
        { rx: 0.24, ry: 0.22 },
        { rx: 0.48, ry: 0.80 },
        { rx: 0.78, ry: 0.58 }
      ],
      beacons: [
        { rx: 0.26, ry: 0.55 },
        { rx: 0.64, ry: 0.26 }
      ],
      hazards: [
        { type: "patrol", rx: 0.35, ry: 0.50, r: 24, vx: 2.2, vy: 2.5 },
        { type: "patrol", rx: 0.60, ry: 0.30, r: 25, vx: -2.2, vy: 2.8 },
        { type: "patrol", rx: 0.80, ry: 0.35, r: 23, vx: 0, vy: 3.5 }
      ]
    },
    // Misión 3: Tormenta intensa + 4 remolinos rápidos
    {
      windForce: { x: -0.26, y: 0.14 },
      target: { rx: 0.91, ry: 0.82 },
      samples: [
        { rx: 0.25, ry: 0.80 },
        { rx: 0.50, ry: 0.20 },
        { rx: 0.82, ry: 0.22 }
      ],
      beacons: [
        { rx: 0.36, ry: 0.46 },
        { rx: 0.70, ry: 0.64 }
      ],
      hazards: [
        { type: "patrol", rx: 0.24, ry: 0.42, r: 23, vx: 3.1, vy: 0 },
        { type: "patrol", rx: 0.44, ry: 0.25, r: 25, vx: 0, vy: 3.8 },
        { type: "patrol", rx: 0.64, ry: 0.75, r: 25, vx: 0, vy: -3.8 },
        { type: "patrol", rx: 0.78, ry: 0.45, r: 24, vx: -2.6, vy: 2.4 }
      ]
    }
  ]
};