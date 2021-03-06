export const getStartButton = () => {
  return document.getElementById("start-button");
};

export const getCurrentWordField = () => {
  return document.getElementById("current-word-text");
};

export const isWordFieldEmpty = () => {
  return !Boolean(getCurrentWordField().innerHTML);
};

export const getPointsField = () => {
  return document.getElementsByClassName("score")[0];
};

export const getScore = () => {
  return Number(getPointsField().innerHTML.replace(/[^\d]/g, ""));
};

export const getFoundWordList = () => {
  return document.getElementById("word-list");
};

export const getSelectedWordTiles = tileSet => {
  return tileSet.filter(tile => {
    return tile.tileEl.className === "selected";
  });
};

export const scoreTable = {
  3: 5,
  4: 10,
  5: 20,
  6: 30,
  longer: 45
};

export const toggleStartButton = requestType => {
  const button = getStartButton();

  requestType === "Start"
    ? (button.innerHTML = "Start")
    : (button.innerHTML = "Reset");
};

export const resetCurrentWord = () => {
  getCurrentWordField().innerHTML = "";
};

export const resetScore = () => {
  getPointsField().innerHTML = "Score: 0";
};

export const resetFoundWordList = () => {
  const parent = getFoundWordList();
  const children = parent.childNodes;
  const tail = document.getElementById("tail");

  while (parent.firstChild) {
    if (parent.firstChild === tail) break;
    parent.removeChild(parent.firstChild);
  }
};

export const foundWordsToArray = () => {
  const foundWordsList = getFoundWordList();
  const childNodes = foundWordsList.childNodes;
  let arrayList = [];

  for (let i = 0; i < childNodes.length; i++) {
    arrayList.push(childNodes[i].innerHTML);
  }

  return arrayList;
};
