import * as tileUtil from "./util/tile_util";
import {
  getCurrentWordField,
  resetCurrentWord,
  foundWordsToArray
} from "./util/board_util";

export default class Tile {
  constructor(tileEl, letter) {
    this.tileEl = tileEl;
    this.letter = letter;
  }

  activateTile() {
    this.tileEl.className = "false";
    this.tileEl.addEventListener("mouseover", this.toggleTilesOn);
    this.tileEl.addEventListener("mouseout", this.toggleTilesOff);
  }

  deActivateTile(isGameOver = false) {
    if (isGameOver) this.tileEl.innerHTML = "?";
    this.tileEl.className = "inactive";
    this.tileEl.removeEventListener("mouseover", this.toggleTilesOn);
    this.tileEl.removeEventListener("mouseout", this.toggleTilesOff);
  }

  toggleTilesOn(e) {
    const currentTile = e.target;

    if (currentTile.className === "false") currentTile.className = "focused";

    const focusedTileEls = tileUtil.getFocusedTileEls();

    //makes sure only one tile is className "focus" at a time
    for (let i = 0; i < focusedTileEls.length; i++) {
      let el = focusedTileEls[i];
      if (el !== currentTile) el.className = "false";
    }
  }

  toggleTilesOff(e) {
    const currentTile = e.target;

    if (currentTile.className === "focused") currentTile.className = "false";
  }

  flashTileVerdict(verdict) {
    this.tileEl.className = verdict ? "accepted" : "rejected";
  }

  toggleSelectionStatus(isStartOfWord) {
    if (isStartOfWord) {
      this.tileEl.removeEventListener("mouseover", tileUtil.toggleTilesOn);
      this.tileEl.removeEventListener("mouseout", tileUtil.toggleTilesOff);
    } else {
      //toggles off selection highlighting & activation highlighting is toggled on
      this.tileEl.className = "false";
      this.tileEl.addEventListener("mouseover", tileUtil.toggleTilesOn);
      this.tileEl.addEventListener("mouseout", tileUtil.toggleTilesOff);
    }
  }
}
