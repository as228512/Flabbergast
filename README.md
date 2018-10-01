## Sample JS Project Proposal: Flabbergast - Clone variation of Boggle

### Background

Boggle is a word game played using a grid of lettered dice that players shuffle and then attempt to find words in sequences of adjacent letters.
Some basic rules include...

1) The board is shuffled upon player start
2) The player has a set time to find as many adjacent word sequences as possible to claim the highest score.
3) Word length determines point value.
4) Words can only be scored once per round and a letter may only be used once within an attempted word.

### Functionality & MVP  

With Flabbergast, users will be able to:

- [ ] Start and reset the game board
- [ ] Select letters to form words

In addition, this project will include:

- [ ] A timer showing remaining player time
- [ ] A previously spelled words box
- [ ] Player score and word length point values
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn, and my personal webpage.  Game controls will include Start, Reset.

![wireframes](https://i.imgur.com/Xj5bFKV.png)

### Architecture and Technologies

**NB**: one of the main things you should be researching and deciding upon while you write this proposal is what technologies you plan to use.  Identify and create a plan of attack for the major technical challenges in your project.

This project will be implemented with the following technologies:

- `JavaScript` for game logic,
- `Canvas` for effects rendering,
- `Webpack` to bundle js files.

In addition to the entry file, there will be two scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `letter.js` elements and rendering them to the DOM.

`tile.js`: this script will handle the logic behind the scenes.  A grid object will hold a `type` (letter) and a 2D array of `rows`.
