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
    this.score = 0;
    this.toggleTileSelectStatus = this.toggleTileSelectStatus.bind(this);
    this.selectTile = this.selectTile.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
    this.submitWord = this.submitWord.bind(this);
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
    const tiles = document.getElementById("tiles").children;

    for (let i = 0; i < 16; i++) {
      const tile = shuffledTiles.pop();
      const randomLetter = tileUtil.sample(tile);

      tiles[i].innerHTML = randomLetter;
      this.tileSet.push(new Tile(tiles[i], randomLetter));
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
    const currentWord = this.word ? this.word.currentWord : null;
    const isStartOfWord = currentWord
      ? this.word.currentWord.length === 0
      : true;
    const currentTile = this.tileSet.find(tile => tile.tileEl === e.target);

    if (isStartOfWord) {
      this.createNewWord(currentTile);
    } else {
      this.isValidWord(currentWord);
    }
  }

  createNewWord(tile) {
    this.toggleTileSelectStatus();
    this.word = new Word();
    let firstLetterNode = tile.tileEl;

    firstLetterNode.className = "selected";
    this.word.addLetter(tile);
    boardUtil.getCurrentWordField().innerHTML = this.word.currentWord;
  }

  isValidWord(word) {
    word = wordUtil.toUpperCase(word);

    const firstLetter = word[0];
    const isValidLength = word.length > 2;
    const hasNotBeenFound = !boardUtil
      .foundWordsToArray()
      .includes(`• ${word}`);

    // saves query time if word doesn't meet length/uniqueness constraints
    let isValidWord;
    if (isValidLength && hasNotBeenFound) {
      isValidWord = wordBank[firstLetter].includes(word);
    }

    this.submitWord(word, isValidWord);
  }

  submitWord(word, wasValidWord) {
    const letterNodes = this.word.letterNodes;
    const selectedWord = this.tileSet.filter(tile => {
      return this.word.letterNodes.includes(tile.tileEl);
    });

    if (wasValidWord) {
      this.music.playSuccessAudio();
      this.awardPoints(word);

      selectedWord.forEach(tile => {
        tile.flashTileVerdict(true);
      });
    } else {
      this.music.playRejectAudio();

      selectedWord.forEach(tile => {
        tile.flashTileVerdict(false);
      });
    }

    setTimeout(this.toggleTileSelectStatus, 300);
  }

  awardPoints(word) {
    const pointsAwarded =
      word.length < 7
        ? boardUtil.scoreTable[word.length]
        : boardUtil.scoreTable["longer"];

    boardUtil.getPointsField().innerHTML = `Score: ${(this.score += pointsAwarded)}`;

    this.appendWord(word);
  }

  toggleTileSelectStatus() {
    const isStartOfWord = this.word ? this.word.currentWord.length === 0 : true;

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
    const currentTile = this.tileSet.find(tile => tile.tileEl === e.target);

    //checks proximity validity of new tile selection
    if (this.word.isValidMove(currentTile)) {
      this.word.letterNodes.forEach(tileEl => {
        tileEl.className = "selected";
      });

      //formats tail of word
      let letters = wordUtil.toLowerCase(this.word.currentWord);
      letters = letters.charAt(0).toUpperCase() + letters.slice(1);

      boardUtil.getCurrentWordField().innerHTML = letters;
    } else {
      this.word.rejectMove(currentTile.tileEl);
      this.disAllowClick(currentTile.tileEl);
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

  appendWord(word) {
    const foundWordsTail = document.getElementById("tail");
    const newChild = document.createElement("li");
    const nodeText = document.createTextNode(`• ${word}`);

    newChild.appendChild(nodeText);
    boardUtil.getFoundWordList().insertBefore(newChild, foundWordsTail);
  }
}
