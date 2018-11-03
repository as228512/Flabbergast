export const getStartButtonField = () => {
  return document.getElementById("start-button");
};

export const getCurrentWordField = () => {
  return document.getElementById("current-word-text");
};

export const getPointsField = () => {
  return document.getElementsByClassName("score")[0];
};

export const getFoundWordList = () => {
  return document.getElementById("word-list");
};

export const toggleStartButton = requestType => {
  const button = getStartButtonField();

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
