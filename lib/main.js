import { createTiles } from "./tile.js";
import { startReset } from "./board.js";

document.addEventListener("DOMContentLoaded", () => {
  createTiles();
  startReset();
});
