# Flabbergast

### [Play Flabbergast][play game]
[play game]: http://www.playflabbergast.com

![playDemoGif](./app/assets/readme_images/flabbergastPlayDemoGif.gif)

------------------

### Game Information

Flabbergast is a word game, played using a grid of lettered tiles, where players attempt to form words in sequences of adjacent letters.
Some basic rules include...

1) Words must be unique (not previously found) and at least 3 letters long.
2) Horizontal, diagonal, and vertical moves are all legal.
3) Players may only select a tile once, per word (duplicate letters are okay).
4) Word length determines point value...

    | Word Length | Point Value |
    |:-----------:|:-----------:|
    |      3      |      5      |
    |      4      |      10     |
    |      5      |      20     |
    |      6      |      30     |
    |      6+     |      45     |
    
------------------

### Technologies

This project was built with the following technologies:

- `JavaScript` for game logic
- `Webpack` to bundle js files
- `Firebase` for high score persistence

-------------------

### Tile Generation

Each game, DOM elements are fetched and assigned random letters, which are then fed to the `Tile` constructor and pushed into the `Board` held array, or `tileSet`, for future reference and manipulation.

```js
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
```


Each tile position is randomized via Durstenfeld's implementation of the [Fisher–Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm).

```js
  shuffleTiles(tileSet) {
    for (let i = tileSet.length - 1; i > 0; i--) {
      let randomIdx = Math.floor(Math.random() * (i + 1));
      let temp = tileSet[i];
      tileSet[i] = tileSet[randomIdx];
      tileSet[randomIdx] = temp;
    }

    return tileSet;
  }
```
  
------------------
  
### Tile Selection
  
On a user's first tile selection, the `Board` forms a new `Word` instance. `Word` houses all tiles of a user's current word, and will validate and reset on word end (last tile selection).

Tile selection is validated using sum differentials. Each tile holds a value, which is referenced upon selection, to detemine if, either, it is adjacent to the previous tile or is already included in the word.
Both are considered valid, and are shown as approved selections via yellow highlighting; however, should a user's selection be considered invalid, the tile deactivates, effectively making invalid selections impossible.

```js
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
```

```js
  isSelf(letterNode) {
    const letterNodes = this.letterNodes;
    const currentWord = this.currentWord;

    for (let i = 0; i < letterNodes.length; i++) {
      if (letterNodes[i].value === letterNode.value) {
        const reSelectedLetters = letterNodes.slice(0, i + 1);
        const deSelectedLetters = letterNodes.slice(i);

        this.deSelectLetters(deSelectedLetters);
        this.reConstructWord(reSelectedLetters);
        return true;
      }
    }

    return false;
  }
```

![tileSelectionGif](./app/assets/readme_images/tileSelectionGif.gif)

----------------

### Word Validation

Once a `Word` is judged for validity, it's scored, and audio/visual indicators are activated. `setTimeout` is used for the visual indicator, with a 300 millisecond time lag, affording the necessary time for a clear indication of judgement without sacrificing a user's ability to quickly begin the next word.

```js
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
```

```js
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
```

![wordValidationGif](./app/assets/readme_images/wordValidationGif.gif)

--------------------

## Future Additions

- [ ] Toggleable high score button
- [ ] "Standard Hard" & "Endless" game modes
- [ ] Onload animation for gameboard
