import * as Tile from "./tile";
import * as Timer from "./timer";

export const startReset = () => {
  document.getElementById("start-button").onclick = () => {
    Timer.resetTimer();
    Tile.clearWord();
    Tile.createTiles();
    toggleStartButton("start");
    activateGame();
  };
};

export const toggleStartButton = requestType => {
  requestType === "start"
    ? (document.getElementById("start-button").innerHTML = "Reset")
    : (document.getElementById("start-button").innerHTML = "Start");
};

const activateGame = () => {
  Timer.startTimer();
  Tile.activateTiles();
};
