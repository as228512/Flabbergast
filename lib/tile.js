import Word from "./word";
import { dictionary } from "./legal-word";

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
    li.addEventListener("mouseover", toggleTileActivation);
    li.addEventListener("mouseout", toggleTileActivation);
    li.addEventListener("click", formWord);
  });
};

export const toggleTileActivation = e => {
  const li = e.target;

  if (li.className === "false") li.className = "focused";
  else if (li.className === "focused") li.className = "false";
};

export const tileSelection = e => {
  const li = e.target;

  if (word.isValid(li)) {
    word.letterNodes.forEach(node => {
      node.className = "selected";
    });

    const currentWordText = word.letterNodes.map(letterNode => {
      const isFirstLetter = letterNode.value === word.letterNodes[0].value;
      return isFirstLetter
        ? letterNode.innerHTML
        : letterNode.innerHTML.toLowerCase();
    });

    document.getElementById(
      "current-word-text"
    ).innerHTML = currentWordText.join("");
  }
};

export const deSelectTiles = nodeArray => {
  nodeArray.forEach(tile => {
    tile.className = "false";
  });
};

////
////
////
////
////
var word;
export const formWord = e => {
  const currentWordField = document.getElementById("current-word-text");
  const isEmpty = currentWordField.innerHTML.length === 0;

  if (isEmpty) {
    //handles cases for user's first selection &
    //toggles on further selection highlighting
    document.querySelectorAll("#tiles li").forEach(li => {
      li.removeEventListener("mouseover", toggleTileActivation);
      li.removeEventListener("mouseout", toggleTileActivation);
      li.addEventListener("mouseover", tileSelection);
    });

    let firstLetterNode = e.target;
    firstLetterNode.className = "selected";
    word = new Word();
    word.add(firstLetterNode);
    currentWordField.innerHTML = word.letterNodes[0].innerHTML;
  } else {
    submitWord(e.target, currentWordField.innerHTML);
  }
};

export const submitWord = (currentTile, word) => {
  word = word
    .split("")
    .map(char => char.toUpperCase())
    .join("");
  //toggles off selection highlighting & activation highlighting is toggled on
  console.log(`Word was: ${word}`);
  console.log(`Word included: ${dictionary.include(word)}`);
  document.querySelectorAll("#tiles li").forEach(li => {
    li.className = currentTile === li ? "focused" : "false";
    li.removeEventListener("mouseover", tileSelection);
    li.addEventListener("mouseover", toggleTileActivation);
    li.addEventListener("mouseout", toggleTileActivation);
  });

  clearWord();
};

export const clearWord = () => {
  document.getElementById("current-word-text").innerHTML = "";
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
