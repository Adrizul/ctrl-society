window.SectorMinigames = window.SectorMinigames || {};

window.SectorMinigames.espacio = {
  get label() {
    return (typeof I18N !== "undefined") ? I18N.t("minigameLabelEspacio") : "GRAVEDAD CERO · ESCOMBROS ORBITALES";
  },
  physics: "space",
  signalDrain: 0.068,
  playerSpeed: 0.48,
  friction: 0.92,
  missions: [
    // Misión 1: Órbitas de basura espacial + deriva cero-G
    {
      target: { rx: 0.91, ry: 0.50 },
      samples: [
        { rx: 0.32, ry: 0.24 },
        { rx: 0.54, ry: 0.76 },
        { rx: 0.75, ry: 0.26 }
      ],
      beacons: [
        { rx: 0.32, ry: 0.52 },
        { rx: 0.68, ry: 0.52 }
      ],
      hazards: [
        { type: "orbit", cx: 0.32, cy: 0.52, orbitR: 85, angle: 0, speed: 0.032, r: 21 },
        { type: "orbit", cx: 0.68, cy: 0.52, orbitR: 90, angle: Math.PI, speed: -0.035, r: 22 },
        { type: "patrol", rx: 0.50, ry: 0.20, r: 22, vx: 0, vy: 3.2 }
      ]
    },
    // Misión 2: Doble anillo orbital + patrulla cruzada
    {
      target: { rx: 0.91, ry: 0.20 },
      samples: [
        { rx: 0.25, ry: 0.78 },
        { rx: 0.50, ry: 0.50 },
        { rx: 0.78, ry: 0.78 }
      ],
      beacons: [
        { rx: 0.25, ry: 0.32 },
        { rx: 0.76, ry: 0.36 }
      ],
      hazards: [
        { type: "orbit", cx: 0.50, cy: 0.50, orbitR: 75, angle: 0, speed: 0.04, r: 20 },
        { type: "orbit", cx: 0.50, cy: 0.50, orbitR: 135, angle: 2.1, speed: -0.028, r: 23 },
        { type: "patrol", rx: 0.26, ry: 0.55, r: 22, vx: 3.2, vy: 0 },
        { type: "patrol", rx: 0.78, ry: 0.55, r: 22, vx: -3.2, vy: 0 }
      ]
    },
    // Misión 3: Campo denso de satélites inactivos
    {
      target: { rx: 0.91, ry: 0.82 },
      samples: [
        { rx: 0.26, ry: 0.20 },
        { rx: 0.52, ry: 0.80 },
        { rx: 0.80, ry: 0.20 }
      ],
      beacons: [
        { rx: 0.26, ry: 0.52 },
        { rx: 0.52, ry: 0.45 },
        { rx: 0.78, ry: 0.52 }
      ],
      hazards: [
        { type: "orbit", cx: 0.26, cy: 0.52, orbitR: 80, angle: 0.5, speed: 0.042, r: 21 },
        { type: "orbit", cx: 0.52, cy: 0.45, orbitR: 92, angle: 1.8, speed: -0.044, r: 22 },
        { type: "orbit", cx: 0.78, cy: 0.52, orbitR: 82, angle: 3.1, speed: 0.042, r: 21 },
        { type: "patrol", rx: 0.64, ry: 0.22, r: 22, vx: 0, vy: 4.1 }
      ]
    }
  ]
};