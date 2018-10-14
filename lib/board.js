import { createTiles, tiles, toggleTileActivation, formWord } from "./tile.js";

const toggleStartButton = requestType => {
  requestType === "start"
    ? (document.getElementById("start-button").innerHTML = "Reset")
    : (document.getElementById("start-button").innerHTML = "Start");
};

export const startReset = () => {
  document.getElementById("start-button").onclick = () => {
    createTiles();
    toggleStartButton("start");
    playGame();
  };
};

export const playGame = () => {
  document.querySelectorAll("#tiles li").forEach(li => {
    li.addEventListener("mouseover", toggleTileActivation);
    li.addEventListener("mouseout", toggleTileActivation);
    li.addEventListener("click", formWord);
  });
};
