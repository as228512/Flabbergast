import { getFoundWordsList, getPointsField } from "./board";

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

  let score = Number(getPointsField().innerHTML.replace(/[^\d]/g, ""));

  getPointsField().innerHTML = `Score: ${(score += pointsAwarded)}`;

  appendWord(word);
};

const appendWord = word => {
  const foundWordsTail = document.getElementById("tail");
  const newChild = document.createElement("li");
  const nodeText = document.createTextNode(`${word}`);
  newChild.appendChild(nodeText);

  getFoundWordsList().insertBefore(newChild, foundWordsTail);
};
