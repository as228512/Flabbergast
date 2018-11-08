import Music from "./music";
import Board from "./board";
import * as gameUtil from "./util/game_util";
import * as boardUtil from "./util/board_util";
import * as tileUtil from "./util/tile_util";

export default class Game {
  constructor() {
    this.board = new Board();
    this.music = new Music();
    this.time = gameUtil.getTimerField();
    this.count = 3;
    this.currentDiagnal = 1;
    this.intervalId = null;
  }

  setup() {
    const startButton = boardUtil.getStartButton();

    startButton.onclick = () => {
      boardUtil.toggleStartButton("Reset");
      this.resetGame();
      this.countDown();
    };
  }

  countDown() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.countingDown.bind(this), 333);
  }

  countingDown() {
    switch (this.currentDiagnal) {
      case 1:
        if (this.count === 3) gameUtil.flash3(this.currentDiagnal);
        else if (this.count === 2) gameUtil.flash2(this.currentDiagnal);
        else if (this.count === 1) gameUtil.flash1(this.currentDiagnal);

        this.currentDiagnal++;
        break;

      case 2:
        if (this.count === 3) gameUtil.flash3(this.currentDiagnal);
        else if (this.count === 2) gameUtil.flash2(this.currentDiagnal);
        else if (this.count === 1) gameUtil.flash1(this.currentDiagnal);

        this.currentDiagnal++;
        break;

      case 3:
        if (this.count === 3) gameUtil.flash3(this.currentDiagnal);
        else if (this.count === 2) gameUtil.flash2(this.currentDiagnal);
        else if (this.count === 1) gameUtil.flash1(this.currentDiagnal);

        this.currentDiagnal = this.count === 1 ? 0 : 1;
        this.count--;
        break;

      default:
        //when countdown is finished, default activates game
        gameUtil.cleanUpLastSequence(1);
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.playGame();
    }
  }

  playGame() {
    this.music.playMusic();
    this.board.generateRandomTiles();
    this.startTimer();
    this.board.activateTiles();
  }

  gameOver() {
    this.stopTimer();
    this.board.deActivateTiles(true);
    boardUtil.toggleStartButton("Start");
    tileUtil.finalSweep();
  }

  resetGame() {
    this.count = 3;
    this.currentDiagnal = 1;
    this.board.deActivateTiles(true);
    this.resetTimer();
    boardUtil.resetCurrentWord();
    boardUtil.resetScore();
    boardUtil.resetFoundWordList();
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
