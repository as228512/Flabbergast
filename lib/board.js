import { createTiles, tiles } from "./tile.js";


export const reset = () => {
  document.getElementById("start-button").onclick = () => {createTiles()};
};
