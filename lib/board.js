import { clearWord, createTiles, activateTiles } from "./tile";
import { resetTimer, startTimer } from "./timer";
import { getWordField, getPointField } from "./found-words";

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

const activateGame = () => {
  startTimer();
  activateTiles();
};

export const toggleStartButton = requestType => {
  requestType === "start"
    ? (document.getElementById("start-button").innerHTML = "Reset")
    : (document.getElementById("start-button").innerHTML = "Start");
};

const resetWordField = () => {
  const parent = getWordField();
  const children = parent.childNodes;
  const tail = document.getElementById("tail");

  while (parent.firstChild) {
    if (parent.firstChild === tail) break;
    parent.removeChild(parent.firstChild);
  }
};

const resetScore = () => {
  getPointField().innerHTML = "Score: 0";
};
