import Tile from "./tile";
import Word from "./word";
import Music from "./music";
import * as boardUtil from "./util/board_util";
import * as tileUtil from "./util/tile_util";
import * as wordUtil from "./util/word_util";
import { wordBank } from "./util/word_bank_util";

export default class Board {
  constructor() {
    this.tileSet = [];
    this.word = null;
    this.music = new Music();
    this.toggleTileSelectStatus = this.toggleTileSelectStatus.bind(this);
    this.selectTile = this.selectTile.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
  }

  shuffleTiles(tileSet) {
    for (let i = tileSet.length - 1; i > 0; i--) {
      let randomIdx = Math.floor(Math.random() * (i + 1));
      let temp = tileSet[i];
      tileSet[i] = tileSet[randomIdx];
      tileSet[randomIdx] = temp;
    }

    return tileSet;
  }

  generateRandomTiles() {
    const shuffledTiles = this.shuffleTiles(tileUtil.newVersionTiles).slice();
    for (let i = 0; i < 16; i++) {
      const tile = shuffledTiles.pop();
      const randomLetter = tileUtil.sample(tile);
      const tileEl = document.getElementById(`t${i}`);

      tileEl.innerHTML = randomLetter;
      this.tileSet.push(new Tile(tileEl));
    }
  }

  activateTiles() {
    this.tileSet.forEach(tile => {
      tile.activateTile();
      tile.tileEl.addEventListener("mousedown", this.handleTileClick);
    });
  }

  deActivateTiles(isGameOver) {
    this.tileSet.forEach(tile => {
      tile.deActivateTile(isGameOver);
      tile.tileEl.removeEventListener("mouseover", this.selectTile);
      tile.tileEl.removeEventListener("mousedown", this.handleTileClick);
    });
  }

  handleTileClick(e) {
    const currentWord = boardUtil.getCurrentWordField().innerHTML;
    const isStartOfWord = boardUtil.isWordFieldEmpty();
    const currentTileEl = e.target;

    if (isStartOfWord) {
      this.createNewWord(currentTileEl);
    } else {
      this.isValidWord(currentWord);
    }
  }

  createNewWord(tileEl) {
    this.toggleTileSelectStatus();
    this.word = new Word();
    let firstLetterNode = tileEl;

    firstLetterNode.className = "selected";
    this.word.addLetter(firstLetterNode);
    boardUtil.getCurrentWordField().innerHTML = firstLetterNode.innerHTML;
  }

  isValidWord(word) {
    word = wordUtil.toUpperCase(word);

    const firstLetter = word[0];
    const isRealWord = wordBank[firstLetter].includes(word);
    const isValidLength = word.length > 2;
    const hasNotBeenFound = !boardUtil
      .foundWordsToArray()
      .includes(`• ${word}`);

    const isValid =
      isRealWord && isValidLength && hasNotBeenFound ? true : false;

    this.submitWord(word, isValid);
  }

  submitWord(word, wasValid) {
    const selectedWord = boardUtil.getSelectedWordTiles(this.tileSet);

    if (wasValid) {
      selectedWord.forEach(tile => {
        tile.flashTileVerdict(true);
      });

      this.music.playSuccessAudio();
      this.awardPoints(word);
      setTimeout(this.toggleTileSelectStatus, 300);
    } else {
      this.music.playRejectAudio();
      selectedWord.forEach(tile => {
        tile.flashTileVerdict(false);
      });
      setTimeout(this.toggleTileSelectStatus, 300);
    }
  }

  toggleTileSelectStatus() {
    const isStartOfWord = boardUtil.isWordFieldEmpty();
    if (isStartOfWord) {
      //handles cases for user's first selection &
      //toggles on further selection highlighting
      this.tileSet.forEach(tile => {
        tile.tileEl.addEventListener("mouseover", this.selectTile);
        tile.toggleSelectionStatus(true);
      });
    } else {
      const lastTarget = this.word.letterNodes[
        this.word.letterNodes.length - 1
      ];

      this.prepForNewWord();
      this.tileSet.forEach(tile => {
        tile.tileEl.removeEventListener("mouseover", this.selectTile);
        tile.toggleSelectionStatus(false);
      });

      lastTarget.className = "focused";
    }
  }

  selectTile(e) {
    const tileEl = e.target;

    //checks proximity validity of new tileEl selection
    if (this.word.isValidMove(tileEl)) {
      this.word.letterNodes.forEach(tileEl => {
        tileEl.className = "selected";
      });

      //formats tail of word
      const letters = wordUtil.toLowerCase(this.word.letterNodes);

      boardUtil.getCurrentWordField().innerHTML = letters.join("");
    } else {
      this.word.rejectMove(tileEl);
      this.disAllowClick(tileEl);
    }
  }

  disAllowClick(tileEl) {
    tileEl.removeEventListener("mousedown", this.handleTileClick);

    const removeListener = () => {
      tileEl.addEventListener("mousedown", this.handleTileClick);
      tileEl.removeEventListener("mouseout", removeListener);
    };

    tileEl.addEventListener("mouseout", removeListener);
  }

  prepForNewWord() {
    boardUtil.resetCurrentWord();
    this.word.removeAllLetters();
  }

  awardPoints(word) {
    const pointsAwarded =
      word.length < 8
        ? boardUtil.scoreTable[word.length]
        : boardUtil.scoreTable["longer"];

    let score = boardUtil.getScore();

    boardUtil.getPointsField().innerHTML = `Score: ${(score += pointsAwarded)}`;

    this.appendWord(word);
  }

  appendWord(word) {
    const foundWordsTail = document.getElementById("tail");
    const newChild = document.createElement("li");
    const nodeText = document.createTextNode(`• ${word}`);

    newChild.appendChild(nodeText);
    boardUtil.getFoundWordList().insertBefore(newChild, foundWordsTail);
  }
}
