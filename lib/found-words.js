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

  let score = Number(
    document.getElementsByClassName("score")[0].innerHTML.replace(/[^\d]/g, "")
  );

  document.getElementsByClassName(
    "score"
  )[0].innerHTML = `Score: ${(score += pointsAwarded)}`;

  appendWord(word);
};

const appendWord = word => {
  const foundWordsTail = document.getElementById("tail");
  const child = document.createElement("li");
  const nodeText = document.createTextNode(`${word}`);
  child.appendChild(nodeText);

  document.getElementById("word-list").insertBefore(child, foundWordsTail);
};
