export const getCurrentTime = () => {
  const time = getTimerField();

  return Number(time.innerHTML.replace(/[^\d]/g, ""));
};

export const getTimerField = () => {
  return document.getElementsByClassName("timer")[0];
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

export const getCountDownEls = diagnalList => {
  const allTileEls = document.querySelectorAll("#tiles li");

  let countDownEls = {};

  for (let el of allTileEls) {
    let match = findMatch(el, diagnalList);

    countDownEls[match]
      ? countDownEls[match].push(el)
      : (countDownEls[match] = [el]);
  }

  return countDownEls;
};

export const flashStartSequence = (currentDiagnal, count) => {
  switch (count) {
    case 3:
      flash3(currentDiagnal);
      break;
    case 2:
      flash2(currentDiagnal);
      break;
    case 1:
      flash1(currentDiagnal);
  }
};

export const flash3 = currentDiagnal => {
  cleanUpLastSequence(currentDiagnal);
  flashSequence(currentDiagnal, "3", "red-count");
};

export const flash2 = currentDiagnal => {
  cleanUpLastSequence(currentDiagnal, rightList);
  flashSequence(currentDiagnal, "2", "yellow-count");
};

export const flash1 = currentDiagnal => {
  cleanUpLastSequence(currentDiagnal);
  flashSequence(currentDiagnal, "1", "green-count");
};

let countDownEls, cleanUpLast;
export const cleanUpLastSequence = (currentDiagnal, diagnalList = leftList) => {
  if (currentDiagnal === 1 && cleanUpLast) {
    cleanUpLast.innerHTML = "?";
    cleanUpLast.className = "inactive";
  }

  countDownEls = getCountDownEls(diagnalList);
  cleanUpLast = countDownEls[7][0];

  if (currentDiagnal !== 1) {
    const cleanUpCount = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6 };
    const diagnalToCleanUp = cleanUpCount[currentDiagnal];

    countDownEls[diagnalToCleanUp].forEach(el => {
      flashSequence(diagnalToCleanUp, "?", "inactive");
    });
  }
};

const flashSequence = (currentDiagnal, text, className) => {
  countDownEls[currentDiagnal].forEach(el => {
    el.innerHTML = text;
    el.className = className;
  });
};
