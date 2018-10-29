// import * as Tile from "./tile";
import { clearWord, createTiles, activateTiles } from "./tile";
import { resetTimer, startTimer } from "./timer";
import { resetScore, resetWordField } from "./found-words";
// import * as Timer from "./timer";
// import * as FoundWords from "./found-words";

export const startReset = () => {
  document.getElementById("start-button").onclick = () => {
    resetTimer();
    clearWord();
    resetScore();
    resetWordField();
    toggleStartButton("start");
    createTiles();
    activateGame();
  };
};

export const toggleStartButton = requestType => {
  requestType === "start"
    ? (document.getElementById("start-button").innerHTML = "Reset")
    : (document.getElementById("start-button").innerHTML = "Start");
};

const activateGame = () => {
  startTimer();
  activateTiles();
};
