// import { generateRandomTiles } from "./tile";
// import { resetTimer, startTimer } from "./timer";
import Timer from "./timer";
import Music from "./music";
import Tile from "./tile";
import Word from "./word";
import * as boardUtil from "./util/board_util";

export default class Board {
  constructor() {
    this.music = new Music();
    this.timer = new Timer();
    this.tile = new Tile();
    this.word = new Word();
  }

  setup() {
    const startButton = boardUtil.getStartButton();

    startButton.onclick = () => {
      this.resetBoard();
      boardUtil.toggleStartButton("Reset");
      this.music.playMusic();
      this.tile.generateRandomTiles();
      this.activateGame();
    };
  }

  resetBoard() {
    this.timer.resetTimer();
    boardUtil.resetCurrentWord();
    boardUtil.resetScore();
    boardUtil.resetFoundWordList();
  }

  activateGame() {
    this.timer.startTimer();
    this.tile.activateTiles();
  }

  awardPoints(word) {
    const pointsField = boardUtil.getPointsField();

    const pointsAwarded =
      word.length < 8
        ? boardUtil.scoreTable[word.length]
        : boardUtil.scoreTable["longer"];

    let score = Number(pointsField.innerHTML.replace(/[^\d]/g, ""));

    pointsField.innerHTML = `Score: ${(score += pointsAwarded)}`;

    this.appendWord(word);
  }

  appendWord(word) {
    const foundWordsTail = document.getElementById("tail");
    const newChild = document.createElement("li");
    const nodeText = document.createTextNode(`${word}`);

    newChild.appendChild(nodeText);
    boardUtil.getFoundWordsList().insertBefore(newChild, foundWordsTail);
  }
}
