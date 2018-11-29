# Flabbergast

### [Play Flabbergast][play game]
[play game]: http://www.playflabbergast.com

![play](./app/assets/readme_images/flabbergastPlayDemoGif.gif)

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

### Architecture and Technologies

This project was built with the following technologies:

- `JavaScript` for game logic
- `Webpack` to bundle js files
- `Firebase` for high score persistence

-------------------

