import { createTiles, tiles} from "./tile.js";
import { reset } from "./board.js";

document.addEventListener("DOMContentLoaded", () => {
  createTiles();
  reset();
});
