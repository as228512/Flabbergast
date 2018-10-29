const scoreTable = {
  3: 8,
  4: 10,
  5: 13,
  6: 17,
  7: 22,
  longer: 30
};

export const awardPoints = word => {
  const pointsAwarded =
    word.length < 8 ? scoreTable[word.length] : scoreTable["longer"];

  let score = Number(getPointField().innerHTML.replace(/[^\d]/g, ""));

  getPointField().innerHTML = `Score: ${(score += pointsAwarded)}`;

  appendWord(word);
};

const appendWord = word => {
  const foundWordsTail = document.getElementById("tail");
  const child = document.createElement("li");
  const nodeText = document.createTextNode(`${word}`);
  child.appendChild(nodeText);

  getWordField().insertBefore(child, foundWordsTail);
};

const getPointField = () => {
  return document.getElementsByClassName("score")[0];
};

const getWordField = () => {
  return document.getElementById("word-list");
};
