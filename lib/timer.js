import { toggleStartButton } from "./board";
import { deActivateTiles } from "./tile";

let timerIntervalId;
export const startTimer = () => {
  timerIntervalId = setInterval(tickTimer, 1000);
};

export const stopTimer = () => {
  clearInterval(timerIntervalId);
};

export const resetTimer = () => {
  stopTimer();
  document.getElementsByClassName("timer")[0].innerHTML = "Time: 90";
};

export const tickTimer = () => {
  let time = Number(
    document.getElementsByClassName("timer")[0].innerHTML.replace(/[^\d]/g, "")
  );

  if (time === 0) {
    stopTimer();
    deActivateTiles();
    toggleStartButton();
    return;
  }

  time--;

  document.getElementsByClassName("timer")[0].innerHTML = `Time: ${time}`;
};
