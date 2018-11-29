# Flabbergast

### [Play Flabbergast][play game]
[play game]: http://www.playflabbergast.com

![play](./app/assets/readme_images/flabbergastPlayDemoGif.gif)


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

### Functionality & MVP  

With Flabbergast, users will be able to:

- [ ] Start and reset the game board
- [ ] Select letters to form words

In addition, this project will include:

- [ ] A timer showing remaining player time
- [ ] A previously spelled words box
- [ ] Player score and word length point values
- [ ] A production README

### Architecture and Technologies

**NB**: one of the main things you should be researching and deciding upon while you write this proposal is what technologies you plan to use.  Identify and create a plan of attack for the major technical challenges in your project.

This project will be implemented with the following technologies:

- `JavaScript` for game logic,
- `Canvas` for effects rendering,
- `Webpack` to bundle js files.

In addition to the entry file, there will be two scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `letter.js` elements and rendering them to the DOM.

`tile.js`: this script will handle the logic behind the scenes.  A grid object will hold a `type` (letter) and a 2D array of `rows`.
