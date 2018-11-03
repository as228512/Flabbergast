import { createTiles, activateTiles } from "./tile";
import { resetTimer, startTimer } from "./timer";
import { playMusic, stopMusic } from "./music";

export const startReset = () => {
  document.getElementById("start-button").onclick = () => {
    resetTimer();
    resetCurrentWordField();
    resetScore();
    resetFoundWordsList();
    stopMusic();
    toggleStartButton("start");
    playMusic();
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
    ? (getStartButtonField().innerHTML = "Reset")
    : (getStartButtonField().innerHTML = "Start");
};

export const resetCurrentWordField = () => {
  getCurrentWordField().innerHTML = "";
};

const resetScore = () => {
  getPointsField().innerHTML = "Score: 0";
};

export const getStartButtonField = () => {
  return document.getElementById("start-button");
};

export const getCurrentWordField = () => {
  return document.getElementById("current-word-text");
};

export const getPointsField = () => {
  return document.getElementsByClassName("score")[0];
};

export const getFoundWordsList = () => {
  return document.getElementById("word-list");
};

const resetFoundWordsList = () => {
  const parent = getFoundWordsList();
  const children = parent.childNodes;
  const tail = document.getElementById("tail");

  while (parent.firstChild) {
    if (parent.firstChild === tail) break;
    parent.removeChild(parent.firstChild);
  }
};

export const foundWordsToArray = () => {
  const foundWordsList = getFoundWordsList();
  const childNodes = foundWordsList.childNodes;
  let arrayList = [];

  for (let i = 0; i < childNodes.length; i++) {
    arrayList.push(childNodes[i].innerHTML);
  }

  return arrayList;
};
