import { deSelectTiles } from "./tile";

export default class Word {
  constructor() {
    this.letterNodes = [];
  }

  isValidMove(letterNode) {
    const lastLetterNode = this.letterNodes[this.letterNodes.length - 1];
    const isSibling = this.isNextTo(letterNode, lastLetterNode);
    const isSelf = this.isSelf(letterNode);

    if (isSelf) return true;
    else if (isSibling) {
      this.add(letterNode);
      return true;
    } else return false;
  }

  isNextTo(letterNode, lastLetterNode) {
    const standardNodeDifferentials = [-5, -4, -3, -1, 1, 3, 4, 5];
    const sideNodeDifferentials = {
      5: [-4, -3, 1, 4, 5],
      8: [-5, -4, -1, 3, 4],
      9: [-4, -3, 1, 4, 5],
      12: [-5, -4, -1, 3, 4]
    };
    const cornerNodeDifferentials = {
      1: [1, 4, 5],
      4: [-1, 3, 4],
      13: [-4, -3, 1],
      16: [-1, -4, -5]
    };

    const differential = letterNode.value - lastLetterNode.value;

    const isCornerNode = cornerNodeDifferentials[lastLetterNode.value]
      ? true
      : false;

    const isSideNode = sideNodeDifferentials[lastLetterNode.value]
      ? true
      : false;

    if (isCornerNode) {
      if (
        cornerNodeDifferentials[lastLetterNode.value].includes(differential)
      ) {
        return true;
      }
    } else if (isSideNode) {
      if (sideNodeDifferentials[lastLetterNode.value].includes(differential)) {
        return true;
      }
    } else if (standardNodeDifferentials.includes(differential)) return true;

    return false;
  }

  isSelf(letterNode) {
    const currentWord = this.letterNodes;

    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i].value === letterNode.value) {
        const backTrackedWord = currentWord.slice(0, i + 1);
        const deSelectedWord = currentWord.slice(i);

        deSelectTiles(deSelectedWord);
        this.letterNodes = backTrackedWord;
        return true;
      }
    }

    return false;
  }

  add(letterNode) {
    this.letterNodes.push(letterNode);
  }
}
