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
    this.isLastDiagnal = false;
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
    this.intervalId = setInterval(this.countingDown.bind(this), 140);
  }

  countingDown() {
    switch (this.isLastDiagnal) {
      case false:
        gameUtil.flashStartSequence(this.currentDiagnal, this.count);
        this.currentDiagnal++;
        if (this.currentDiagnal === 7) this.isLastDiagnal = true;
        break;

      case true:
        gameUtil.flashStartSequence(this.currentDiagnal, this.count);
        this.currentDiagnal = 1;
        this.isLastDiagnal = this.count === 1 ? "Will Hit Default" : false;
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
    this.isLastDiagnal = false;
    this.board.deActivateTiles(true);
    this.music.stopMusic();
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
