import * as wordUtil from "./util/word_util";

export default class Word {
  constructor() {
    this.letterNodes = [];
    this.currentWord = "";
  }

  isValidMove(tile) {
    const lastLetterNode = this.letterNodes[this.letterNodes.length - 1];
    const isSibling = this.isNextTo(tile.tileEl, lastLetterNode);
    const isSelf = this.isSelf(tile.tileEl);

    if (isSelf) return true;
    else if (isSibling) {
      this.addLetter(tile);
      return true;
    } else return false;
  }

  isNextTo(letterNode, lastLetterNode) {
    const differential = letterNode.value - lastLetterNode.value;
    const standardDiffs = wordUtil.standardNodeDifferentials;
    const cornerDiffs = wordUtil.cornerNodeDifferentials;
    const sideDiffs = wordUtil.sideNodeDifferentials;

    const isCornerNode = cornerDiffs[lastLetterNode.value] ? true : false;
    const isSideNode = sideDiffs[lastLetterNode.value] ? true : false;

    if (isCornerNode) {
      if (cornerDiffs[lastLetterNode.value].includes(differential)) {
        return true;
      }
    } else if (isSideNode) {
      if (sideDiffs[lastLetterNode.value].includes(differential)) {
        return true;
      }
    } else if (standardDiffs.includes(differential)) return true;

    return false;
  }

  isSelf(letterNode) {
    const letterNodes = this.letterNodes;
    const currentWord = this.currentWord;

    for (let i = 0; i < letterNodes.length; i++) {
      if (letterNodes[i].value === letterNode.value) {
        const reSelectedLetters = letterNodes.slice(0, i + 1);
        const deSelectedLetters = letterNodes.slice(i);

        this.deSelectLetters(deSelectedLetters);
        // this.letterNodes = reSelectedLetters;
        this.reConstructWord(reSelectedLetters);
        debugger
        return true;
      }
    }

    return false;
  }
  
  reConstructWord(letterNodeArray) {
    this.letterNodes = letterNodeArray;
    this.currentWord = "";
    
    letterNodeArray.forEach(letterNode => {
      this.currentWord += letterNode.innerHTML;
    })
  }

  deSelectLetters(letterNodeArray) {
    letterNodeArray.forEach(letterNode => {
      letterNode.className = "false";
    });
  }

  rejectMove(letterNode) {
    const removeListener = () => {
      letterNode.className = "false";
      letterNode.removeEventListener("mouseout", removeListener);
    };

    letterNode.className = "inactive";
    letterNode.addEventListener("mouseout", removeListener);
  }

  addLetter(tile) {
    this.letterNodes.push(tile.tileEl);
    this.currentWord += tile.letter;
  }

  removeAllLetters() {
    this.letterNodes = [];
    this.currentWord = "";
  }
}
