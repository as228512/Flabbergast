export const getBodyField = () => {
  return document.getElementById("body");
};

export const getCurrentTime = () => {
  const time = getTimerField();

  return Number(time.innerHTML.replace(/[^\d]/g, ""));
};

export const getTimerField = () => {
  return document.getElementsByClassName("timer")[0];
};

export const getSubmitButton = () => {
  return document.getElementById("submit-button");
};

export const getNameField = () => {
  return document.getElementById("name-field");
};

export const getLeaderBoardModel = () => {
  return document.getElementById("leader-board-model");
};

export const getHighScoreModel = () => {
  return document.getElementById("high-score-model");
};

export const getModelBackground = () => {
  return document.getElementById("model-background");
};

export const isValidName = name => {
  if (name === "" || name === "Name..." || name === "Enter name here...") {
    return false;
  } else return true;
};

const leftList = {
  1: [1],
  2: [2, 5],
  3: [3, 6, 9],
  4: [4, 7, 10, 13],
  5: [8, 11, 14],
  6: [12, 15],
  7: [16]
};

const rightList = {
  1: [4],
  2: [3, 8],
  3: [2, 7, 12],
  4: [1, 6, 11, 16],
  5: [5, 10, 15],
  6: [9, 14],
  7: [13]
};

const findMatch = (el, valueList) => {
  for (let i = 1; i < 7; i++) {
    if (valueList[i].includes(el.value)) return i;
  }
  return 7;
};

export const getCountDownEls = diagList => {
  const allTileEls = document.querySelectorAll("#tiles li");

  let countDownEls = {};

  for (let el of allTileEls) {
    let match = findMatch(el, diagList);

    countDownEls[match]
      ? countDownEls[match].push(el)
      : (countDownEls[match] = [el]);
  }

  return countDownEls;
};

export const flashStartSequence = (currentDiag, count) => {
  switch (count) {
    case 3:
      flash3(currentDiag);
      break;
    case 2:
      flash2(currentDiag);
      break;
    case 1:
      flash1(currentDiag);
  }
};

export const flash3 = currentDiag => {
  cleanUpLastSequence(currentDiag);
  flashSequence(currentDiag, "3", "red-count");
};

export const flash2 = currentDiag => {
  cleanUpLastSequence(currentDiag, rightList);
  flashSequence(currentDiag, "2", "yellow-count");
};

export const flash1 = currentDiag => {
  cleanUpLastSequence(currentDiag);
  flashSequence(currentDiag, "1", "green-count");
};

let countDownEls, cleanUpLast;
export const cleanUpLastSequence = (currentDiag, diagList = leftList) => {
  if (currentDiag === 1 && cleanUpLast) {
    cleanUpLast.innerHTML = "?";
    cleanUpLast.className = "inactive";
  }

  countDownEls = getCountDownEls(diagList);
  cleanUpLast = countDownEls[7][0];

  if (currentDiag !== 1) {
    const cleanUpCount = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6 };
    const diagToCleanUp = cleanUpCount[currentDiag];

    countDownEls[diagToCleanUp].forEach(el => {
      flashSequence(diagToCleanUp, "?", "inactive");
    });
  }
};

const flashSequence = (currentDiag, text, className) => {
  countDownEls[currentDiag].forEach(el => {
    el.innerHTML = text;
    el.className = className;
  });
};
