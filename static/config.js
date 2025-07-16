// Game configuration interface
export const DEFAULT_CONFIG = {
  canvas: {
    width: 800,
    height: 400,
  },
  player: {
    width: 40,
    height: 40,
    jumpHeight: 15,
    gravity: 0.8,
    color: "#2d5a27",
  },
  obstacles: {
    width: 20,
    height: 60,
    speed: 5,
    spawnRate: 0.01,
    color: "#8b4513",
  },
  ground: {
    height: 20,
    color: "#654321",
  },
  colors: {
    background: "#f7f7f7",
    text: "#333333",
  },
};

// Asset paths interface
export const DEFAULT_ASSETS = {
  player: "", // Empty means use color fill
  obstacle: "", // Empty means use color fill
  ground: "", // Empty means use color fill
  background: "", // Empty means use color fill
};
