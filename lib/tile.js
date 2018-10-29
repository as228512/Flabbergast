import Word from "./word";
import { awardPoints } from "./found-words";
import {
  getCurrentWordField,
  resetCurrentWordField,
  foundWordsToArray
} from "./board";
import { aWords } from "./word-lists/a-list";
import { bWords } from "./word-lists/b-list";
import { cWords } from "./word-lists/c-list";
import { dWords } from "./word-lists/d-list";
import { eWords } from "./word-lists/e-list";
import { fWords } from "./word-lists/f-list";
import { gWords } from "./word-lists/g-list";
import { hWords } from "./word-lists/h-list";
import { iWords } from "./word-lists/i-list";
import { jWords } from "./word-lists/j-list";
import { kWords } from "./word-lists/k-list";
import { lWords } from "./word-lists/l-list";
import { mWords } from "./word-lists/m-list";
import { nWords } from "./word-lists/n-list";
import { oWords } from "./word-lists/o-list";
import { pWords } from "./word-lists/p-list";
import { qWords } from "./word-lists/q-list";
import { rWords } from "./word-lists/r-list";
import { sWords } from "./word-lists/s-list";
import { tWords } from "./word-lists/t-list";
import { uWords } from "./word-lists/u-list";
import { vWords } from "./word-lists/v-list";
import { wWords } from "./word-lists/w-list";
import { xWords } from "./word-lists/x-list";
import { yWords } from "./word-lists/y-list";
import { zWords } from "./word-lists/z-list";

const wordBank = {
  A: aWords,
  B: bWords,
  C: cWords,
  D: dWords,
  E: eWords,
  F: fWords,
  G: gWords,
  H: hWords,
  I: iWords,
  J: jWords,
  K: kWords,
  L: lWords,
  M: mWords,
  N: nWords,
  O: oWords,
  P: pWords,
  Q: qWords,
  R: rWords,
  S: sWords,
  T: tWords,
  U: uWords,
  V: vWords,
  W: wWords,
  X: xWords,
  Y: yWords,
  Z: zWords
};

const oldVersionTiles = [
  ["R", "I", "F", "O", "B", "X"],
  ["I", "F", "E", "H", "E", "Y"],
  ["D", "E", "N", "O", "W", "S"],
  ["U", "T", "O", "K", "N", "D"],

  ["H", "M", "S", "R", "A", "O"],
  ["L", "U", "P", "E", "T", "S"],
  ["A", "C", "I", "T", "O", "A"],
  ["Y", "L", "G", "K", "U", "E"],

  ["Qu", "B", "M", "J", "O", "A"],
  ["E", "H", "I", "S", "P", "N"],
  ["V", "E", "T", "I", "G", "N"],
  ["B", "A", "L", "I", "Y", "T"],

  ["E", "Z", "A", "V", "N", "D"],
  ["R", "A", "L", "E", "S", "C"],
  ["U", "W", "I", "L", "R", "G"],
  ["P", "A", "C", "E", "M", "D"]
];

const newVersionTiles = [
  ["A", "A", "E", "E", "G", "N"],
  ["E", "L", "R", "T", "T", "Y"],
  ["A", "O", "O", "T", "T", "W"],
  ["A", "B", "B", "J", "O", "O"],

  ["E", "H", "R", "T", "V", "W"],
  ["C", "I", "M", "O", "T", "V"],
  ["D", "I", "S", "T", "T", "Y"],
  ["E", "I", "O", "S", "S", "T"],

  ["D", "E", "L", "R", "V", "Y"],
  ["A", "C", "H", "O", "P", "S"],
  ["H", "I", "M", "N", "Qu", "U"],
  ["E", "E", "I", "N", "S", "U"],

  ["E", "E", "G", "H", "N", "W"],
  ["A", "F", "F", "K", "P", "S"],
  ["H", "L", "N", "N", "R", "Z"],
  ["D", "E", "I", "L", "R", "X"]
];

const sample = array => {
  return array[Math.floor(Math.random() * array.length)];
};

const shuffleTiles = tileSet => {
  for (let i = tileSet.length - 1; i > 0; i--) {
    let randomIdx = Math.floor(Math.random() * (i + 1));
    let temp = tileSet[i];
    tileSet[i] = tileSet[randomIdx];
    tileSet[randomIdx] = temp;
  }

  return tileSet;
};

export const createTiles = () => {
  const shuffledTiles = shuffleTiles(newVersionTiles).slice(0);
  for (let i = 1; i < 17; i++) {
    const tile = shuffledTiles.pop();
    const randomLetter = sample(tile);
    document.getElementById(`t${i}`).innerHTML = randomLetter;
  }
};

export const activateTiles = () => {
  document.querySelectorAll("#tiles li").forEach(li => {
    li.className = "false";
    li.addEventListener("mouseover", toggleTileActivation);
    li.addEventListener("mouseout", toggleTileActivation);
    li.addEventListener("mousedown", handleTileClick);
  });
};

export const deActivateTiles = () => {
  document.querySelectorAll("#tiles li").forEach(li => {
    li.className = "inactive";
    li.removeEventListener("mouseover", toggleTileActivation);
    li.removeEventListener("mouseover", tileSelection);
    li.removeEventListener("mouseout", toggleTileActivation);
    li.removeEventListener("mousedown", handleTileClick);
  });
};

var word;
export const handleTileClick = e => {
  const currentWord = getCurrentWordField().innerHTML;
  const isStartOfWord = !currentWord.length;
  const currentTile = e.target;

  if (isStartOfWord) {
    createNewWord(currentTile);
  } else {
    isValidWord(currentWord, currentTile);
  }
};

export const createNewWord = tile => {
  toggleWordSelection(true, tile);
  let firstLetterNode = tile;
  firstLetterNode.className = "selected";
  word = new Word();
  word.add(firstLetterNode);
  getCurrentWordField().innerHTML = word.letterNodes[0].innerHTML;
};

const isValidWord = (word, currentTile) => {
  //Formats word for x-ref to dictionary
  word = word
    .split("")
    .map(char => char.toUpperCase())
    .join("");

  const firstLetter = word[0];
  const isRealWord = wordBank[firstLetter].includes(word);
  const isValidLength = word.length > 2;
  const hasNotBeenFound = !foundWordsToArray().includes(word);

  if (isRealWord && isValidLength && hasNotBeenFound) {
    //function to append new word to word list and increase score
    submitWord(word, currentTile, true);
  } else submitWord(word, currentTile, false);
};

export const submitWord = (word, currentTile, wasValid) => {
  if (wasValid) {
    flashTileVerdict(true);
    awardPoints(word);

    setTimeout(function() {
      toggleWordSelection(false, currentTile);
    }, 200);
  } else {
    flashTileVerdict(false);

    setTimeout(function() {
      toggleWordSelection(false, currentTile);
    }, 200);
  }

  resetCurrentWordField();
};

const flashTileVerdict = verdict => {
  if (verdict) {
    let selectedWord = document.getElementsByClassName("selected");

    while (selectedWord.length) {
      selectedWord[0].className = "accepted";
    }
  } else {
    let selectedWord = document.getElementsByClassName("selected");

    while (selectedWord.length) {
      selectedWord[0].className = "rejected";
    }
  }
};

const toggleWordSelection = (isStartOfWord = false, currentTile = false) => {
  if (isStartOfWord) {
    //handles cases for user's first selection &
    //toggles on further selection highlighting
    document.querySelectorAll("#tiles li").forEach(li => {
      li.removeEventListener("mouseover", toggleTileActivation);
      li.removeEventListener("mouseout", toggleTileActivation);
      li.addEventListener("mouseover", tileSelection);
    });
  } else {
    //toggles off selection highlighting & activation highlighting is toggled on
    document.querySelectorAll("#tiles li").forEach(li => {
      li.className = currentTile === li ? "focused" : "false";
      li.removeEventListener("mouseover", tileSelection);
      li.addEventListener("mouseover", toggleTileActivation);
      li.addEventListener("mouseout", toggleTileActivation);
    });
  }
};

export const toggleTileActivation = e => {
  const li = e.target;

  if (li.className === "false") li.className = "focused";
  else if (li.className === "focused") li.className = "false";
};

export const tileSelection = e => {
  const li = e.target;

  //checks proximity validity of new tile selection
  if (word.isValidMove(li)) {
    word.letterNodes.forEach(node => {
      node.className = "selected";
    });

    //formats tail of word to lowerCase
    const currentWordText = word.letterNodes.map(letterNode => {
      const isFirstLetter = letterNode.value === word.letterNodes[0].value;
      return isFirstLetter
        ? letterNode.innerHTML
        : letterNode.innerHTML.toLowerCase();
    });

    getCurrentWordField().innerHTML = currentWordText.join("");
  }
};

export const clearWord = () => {
  getCurrentWordField().innerHTML = "";
};

export const deSelectTiles = nodeArray => {
  nodeArray.forEach(tile => {
    tile.className = "false";
  });
};
