export default class Word {
  constructor() {
    this.letterNodes = [];
  }

  isValid(letterNode) {
    const lastLetterNode = this.letterNodes[this.letterNodes.length - 1];
    const isSibling = this.isNextTo(letterNode, lastLetterNode);
    const isSelf = this.isSelf(letterNode);

    debugger;

    if (isSelf) return true;
    else if (isSibling) {
      this.add(letterNode);
      return true;
    } else return false;
  }

  isNextTo(letterNode, lastLetterNode) {
    // if (!lastLetterNode) return;
    const standardNodeDifferentials = [-5, -4, -3, -1, 1, 3, 4, 5];
    const cornerNodeDifferentials = {
      1: [1, 4, 5],
      4: [-1, 3, 5],
      13: [-4, -3, 1],
      16: [-1, -4, -5]
    };

    const differential = letterNode.value - lastLetterNode.value;

    const isCornerNode = cornerNodeDifferentials[lastLetterNode.value]
      ? true
      : false;

    if (isCornerNode) {
      if (
        cornerNodeDifferentials[lastLetterNode.value].includes(differential)
      ) {
        return true;
      }
    } else if (standardNodeDifferentials.includes(differential)) return true;

    return false;
  }

  isSelf(letterNode) {
    const currentWord = this.letterNodes;
    let result = false;

    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i].value === letterNode.value) {
        const backTrackedWord = currentWord.slice(0, i + 1);
        this.letterNodes = backTrackedWord;
        result = true;
        break;
      }
    }

    return result;
  }

  add(letterNode) {
    this.letterNodes.push(letterNode);
  }
}
