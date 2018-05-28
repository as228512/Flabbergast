import { createTiles, tiles} from "./tile.js";


export const start = () => {
  const btn = document.getElementById("start-button");

  btn.onclick = createTiles();
  debugger
};
