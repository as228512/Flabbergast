export const sample = array => {
  return array[Math.floor(Math.random() * array.length)];
};

export const toggleTilesOn = e => {
  const currentTile = e.target;

  if (currentTile.className === "false") currentTile.className = "focused";
};

export const toggleTilesOff = e => {
  const currentTile = e.target;

  if (currentTile.className === "focused") currentTile.className = "false";
};

export const toLowerCase = letterNodes => {
  return letterNodes.map(letterNode => {
    const isFirstLetter = letterNode.value === letterNodes[0].value;
    return isFirstLetter
      ? letterNode.innerHTML
      : letterNode.innerHTML.toLowerCase();
  });
};

export const oldVersionTiles = [
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

export const newVersionTiles = [
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
