import Word from "./word";

const sample = array => {
  return array[Math.floor(Math.random() * array.length)];
};

const tiles = {
  1: ["R", "I", "F", "O", "B", "X"],
  2: ["I", "F", "E", "H", "E", "Y"],
  3: ["D", "E", "N", "O", "W", "S"],
  4: ["U", "T", "O", "K", "N", "D"],

  5: ["H", "M", "S", "R", "A", "O"],
  6: ["L", "U", "P", "E", "T", "S"],
  7: ["A", "C", "I", "T", "O", "A"],
  8: ["Y", "L", "G", "K", "U", "E"],

  9: ["Qu", "B", "M", "J", "O", "A"],
  10: ["E", "H", "I", "S", "P", "N"],
  11: ["V", "E", "T", "I", "G", "N"],
  12: ["B", "A", "L", "I", "Y", "T"],

  13: ["E", "Z", "A", "V", "N", "D"],
  14: ["R", "A", "L", "E", "S", "C"],
  15: ["U", "W", "I", "L", "R", "G"],
  16: ["P", "A", "C", "E", "M", "D"]
};

export const createTiles = () => {
  for (let i = 1; i < 17; i++) {
    document.getElementById(`t${i}`).innerHTML = sample(tiles[i]);
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
      return letterNode.innerHTML;
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
  //toggles off selection highlighting & activation highlighting is toggled on
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
