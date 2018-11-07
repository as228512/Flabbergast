import Music from "./music";
import Board from "./board";
import * as gameUtil from "./util/timer_util";
import * as boardUtil from "./util/board_util";
import * as tileUtil from "./util/tile_util";

export default class Game {
  constructor() {
    this.board = new Board();
    this.music = new Music();
    this.time = gameUtil.getTimerField();
    this.timerIntervalId = null;
  }

  setup() {
    const startButton = boardUtil.getStartButton();

    startButton.onclick = () => {
      boardUtil.toggleStartButton("Reset");
      this.resetGame();
      this.music.playMusic();
      this.board.generateRandomTiles();
      this.playGame();
    };
  }

  resetGame() {
    this.resetTimer();
    boardUtil.resetCurrentWord();
    boardUtil.resetScore();
    boardUtil.resetFoundWordList();
  }

  playGame() {
    this.startTimer();
    this.board.activateTiles();
  }

  gameOver() {
    this.stopTimer();
    this.board.deActivateTiles();
    boardUtil.toggleStartButton("Start");
    tileUtil.finalSweep();
  }

  startTimer() {
    this.timerIntervalId = setInterval(this.tickTimer.bind(this), 1000);
  }

  stopTimer() {
    clearInterval(this.timerIntervalId);
    this.timerIntervalId = null;
  }

  resetTimer() {
    this.stopTimer();
    this.time.innerHTML = "Time: 90";
  }

  tickTimer() {
    let time = gameUtil.getCurrentTime();

    if (time === 0) {
      this.gameOver();
      return;
    }

    time--;

    this.time.innerHTML = `Time: ${time}`;
  }
}
