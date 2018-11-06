import Word from "./word";
import Board from "./board";
import { wordBank } from "./util/word_bank_util";
import * as tileUtil from "./util/tile_util";
import {
  getCurrentWordField,
  resetCurrentWord,
  foundWordsToArray
} from "./util/board_util";

export default class Tile {
  constructor() {
    this.tiles = document.querySelectorAll("#tiles li");
    this.word = null;
    this.toggleWordSelection = this.toggleWordSelection.bind(this);
    this.selectTile = this.selectTile.bind(this);
    this.activateTiles = this.activateTiles.bind(this);
    this.deActivateTiles = this.deActivateTiles.bind(this);
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
    for (let i = 1; i < 17; i++) {
      const tile = shuffledTiles.pop();
      const randomLetter = tileUtil.sample(tile);
      //should iterate through this.tiles and delete tile ids..
      document.getElementById(`t${i}`).innerHTML = randomLetter;
    }
  }

  activateTiles() {
    this.tiles.forEach(tile => {
      tile.className = "false";
      tile.addEventListener("mouseover", tileUtil.toggleTilesOn);
      tile.addEventListener("mouseout", tileUtil.toggleTilesOff);
      tile.addEventListener("mousedown", this.handleTileClick);
    });
  }

  deActivateTiles() {
    this.tiles.forEach(tile => {
      tile.className = "inactive";
      tile.removeEventListener("mouseover", tileUtil.toggleTilesOn);
      tile.removeEventListener("mouseover", this.selectTile);
      tile.removeEventListener("mouseout", tileUtil.toggleTilesOff);
      tile.removeEventListener("mousedown", this.handleTileClick);
    });
  }

  handleTileClick(e) {
    debugger;
    const currentWord = getCurrentWordField().innerHTML;
    const isStartOfWord = !currentWord.length;
    const currentTile = e.target;

    if (isStartOfWord) {
      this.createNewWord(currentTile);
    } else {
      this.isValidWord(currentWord);
    }
  }

  createNewWord(tile) {
    this.toggleWordSelection(true);
    let firstLetterNode = tile;
    firstLetterNode.className = "selected";
    this.word = new Word();
    this.word.addLetter(firstLetterNode);
    getCurrentWordField().innerHTML = this.word.letterNodes[0].innerHTML;
  }

  isValidWord(word) {
    //Formats word for x-ref to word bank
    word = word
      .split("")
      .map(char => char.toUpperCase())
      .join("");

    const firstLetter = word[0];
    const isRealWord = wordBank[firstLetter].includes(word);
    const isValidLength = word.length > 2;
    const hasNotBeenFound = !foundWordsToArray().includes(word);

    debugger;
    if (isRealWord && isValidLength && hasNotBeenFound) {
      debugger;
      //function to append new word to word list and increase score
      this.submitWord(word, true);
    } else this.submitWord(word, false);
  }

  submitWord(word, wasValid) {
    debugger;
    if (wasValid) {
      debugger;
      this.flashTileVerdict(true);
      Board.awardPoints(word);

      setTimeout(this.toggleWordSelection, 200);
    } else {
      debugger;
      this.flashTileVerdict(false);

      setTimeout(this.toggleWordSelection, 200);
    }
    debugger;
    resetCurrentWord();
    this.word.removeAllLetters();
  }

  flashTileVerdict(verdict) {
    debugger;
    // const selectedWord = document.getElementsByClassName("selected");
    const selectedWord = this.word.letterNodes;

    for (let i = 0; i < selectedWord.length; i++) {
      selectedWord[i].className = verdict ? "accepted" : "rejected";
    }
  }

  toggleWordSelection(isStartOfWord = false) {
    if (isStartOfWord) {
      //handles cases for user's first selection &
      //toggles on further selection highlighting
      this.tiles.forEach(tile => {
        tile.removeEventListener("mouseover", tileUtil.toggleTilesOn);
        tile.removeEventListener("mouseout", tileUtil.toggleTilesOff);
        tile.addEventListener("mouseover", this.selectTile);
      });
    } else {
      resetCurrentWord();
      this.word.removeAllLetters();
      //toggles off selection highlighting & activation highlighting is toggled on
      this.tiles.forEach(tile => {
        tile.className = "false";
        tile.removeEventListener("mouseover", this.selectTile);
        tile.addEventListener("mouseover", tileUtil.toggleTilesOn);
        tile.addEventListener("mouseout", tileUtil.toggleTilesOff);
      });
    }
  }

  selectTile(e) {
    const tile = e.target;
    debugger;

    //checks proximity validity of new tile selection
    if (this.word.isValidMove(tile)) {
      this.word.letterNodes.forEach(node => {
        node.className = "selected";
      });

      //formats tail of word to lowerCase
      const letters = tileUtil.toLowerCase(this.word.letterNodes);

      getCurrentWordField().innerHTML = letters.join("");
    }
  }
}
