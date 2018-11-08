export const getCurrentTime = () => {
  const time = getTimerField();

  return Number(time.innerHTML.replace(/[^\d]/g, ""));
};

export const getTimerField = () => {
  return document.getElementsByClassName("timer")[0];
};

export const getCountDownEls = () => {
  const allTileEls = document.querySelectorAll("#tiles li");
  const counterElValues = { 1: [2, 5], 2: [4, 7, 10, 13], 3: [12, 15] };
  let countDownEls = { 1: [], 2: [], 3: [] };
  let currentKey = 1;
  let keyMatch;

  for (let el of allTileEls) {
    if (counterElValues[1].includes(el.value)) keyMatch = 1;
    else if (counterElValues[2].includes(el.value)) keyMatch = 2;
    else if (counterElValues[3].includes(el.value)) keyMatch = 3;
    else continue;

    countDownEls[keyMatch].push(el);

    if (currentKey === 2 && countDownEls[currentKey].length === 4) {
      currentKey++;
    } else if (currentKey !== 2 && countDownEls[currentKey].length === 2) {
      currentKey++;
    }
  }

  return countDownEls;
};

// export const flashStartSequence = (currentDiagnal, count) => {
//   switch (count) {
//     case 3:
//       break;
//     case 2:
//       break;
//     case 1:
//       break;
//   }
// };

export const flash3 = currentDiagnal => {
  cleanUpLastSequence(currentDiagnal);
  flashSequence(currentDiagnal, "3", "red-count");
};

export const flash2 = currentDiagnal => {
  cleanUpLastSequence(currentDiagnal);
  flashSequence(currentDiagnal, "2", "yellow-count");
};

export const flash1 = currentDiagnal => {
  cleanUpLastSequence(currentDiagnal);
  flashSequence(currentDiagnal, "1", "green-count");
};

let countDownEls;
export const cleanUpLastSequence = currentDiagnal => {
  countDownEls = countDownEls ? countDownEls : getCountDownEls();
  const cleanUpCount = { 1: 3, 2: 1, 3: 2 };
  const diagnalToCleanUp = cleanUpCount[currentDiagnal];

  countDownEls[diagnalToCleanUp].forEach(el => {
    flashSequence(diagnalToCleanUp, "?", "inactive");
  });
};

const flashSequence = (currentDiagnal, text, className) => {
  countDownEls[currentDiagnal].forEach(el => {
    el.innerHTML = text;
    el.className = className;
  });
};

// const flashInputs = (el, text, className) => {
//   el.innerHTML = text;
//   el.className = className;
// };
