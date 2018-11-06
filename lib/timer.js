import { toggleStartButton } from "./util/board_util";
import Tile from "./tile";

export default class Timer {
  constructor() {
    this.intervalId = null;
    this.timer = document.getElementsByClassName("timer")[0];
  }

  startTimer() {
    this.intervalId = setInterval(this.tickTimer.bind(this), 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  resetTimer() {
    this.stopTimer();
    this.timer.innerHTML = "Time: 90";
  }

  tickTimer() {
    let time = Number(this.timer.innerHTML.replace(/[^\d]/g, ""));

    if (time === 0) {
      this.stopTimer();
      Tile.deActivateTiles();
      toggleStartButton("Start");
      return;
    }

    time--;

    this.timer.innerHTML = `Time: ${time}`;
  }
}
