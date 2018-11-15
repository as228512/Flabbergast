import Music from "./music";
import Board from "./board";
import * as gameUtil from "./util/game_util";
import * as boardUtil from "./util/board_util";
import * as tileUtil from "./util/tile_util";

export default class Game {
  constructor() {
    this.board = new Board();
    this.music = new Music();
    this.time = gameUtil.getTimerField();
    this.rank = 0;
    this.database = firebase.database();
    this.highScores = this.retrieveHighScores();
    this.count = 3;
    this.currentDiag = 1;
    this.isLastDiag = false;
    this.intervalId = null;
  }

  setup() {
    const startButton = boardUtil.getStartButton();

    startButton.onclick = () => {
      boardUtil.toggleStartButton("Reset");
      this.resetGame();
      this.countDown();
    };
  }

  countDown() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.countingDown.bind(this), 140);
  }

  countingDown() {
    switch (this.isLastDiag) {
      case false:
        if (this.count === 3 && this.currentDiag === 1)
          this.music.playThreeAudio();
        else if (this.count === 2 && this.currentDiag === 1)
          this.music.playTwoAudio();
        else if (this.count === 1 && this.currentDiag === 1)
          this.music.playOneAudio();

        gameUtil.flashStartSequence(this.currentDiag, this.count);
        this.currentDiag++;
        if (this.currentDiag === 7) this.isLastDiag = true;
        break;

      case true:
        gameUtil.flashStartSequence(this.currentDiag, this.count);
        this.currentDiag = 1;
        this.isLastDiag = this.count === 1 ? "Will Hit Default" : false;
        this.count--;
        break;

      default:
        //when countdown is finished, default activates game
        gameUtil.cleanUpLastSequence(1);
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.playGame();
    }
  }

  playGame() {
    this.music.playGoAudio();
    this.music.playMusic();
    this.board.generateRandomTiles();
    this.startTimer();
    this.board.activateTiles();
  }

  gameOver() {
    this.music.playGameOverAudio();
    this.stopTimer();
    this.board.deActivateTiles(true);
    boardUtil.toggleStartButton("Start");
    tileUtil.finalSweep();
    if (this.isHighScore()) {
      debugger;
      this.toggleHighScoreModel();
    }
  }

  resetGame() {
    this.count = 3;
    this.currentDiag = 1;
    this.isLastDiag = false;
    this.board.deActivateTiles(true);
    this.music.stopMusic();
    this.resetTimer();
    boardUtil.resetCurrentWord();
    boardUtil.resetScore();
    boardUtil.resetFoundWordList();
  }

  startTimer() {
    this.intervalId = setInterval(this.tickTimer.bind(this), 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  resetTimer() {
    this.stopTimer();
    this.time.innerHTML = "Time: 90";
  }

  tickTimer() {
    let time = gameUtil.getCurrentTime();

    if (time === 0) {
      this.gameOver();
      return;
    }

    time--;

    this.time.innerHTML = `Time: ${time}`;
  }

  toggleLeaderBoardModel() {
    const body = gameUtil.getBodyField();
    let model = gameUtil.getLeaderBoardModel();

    if (model) {
      this.toggleModelBackground();
      body.removeChild(model);
    } else {
      model = document.createElement("div");
      model.id = "leader-board-model";
      body.appendChild(model);

      this.generateLeaderBoard(this.highScores);
      this.toggleModelBackground();
    }
  }

  toggleHighScoreModel() {
    const body = gameUtil.getBodyField();
    let model = gameUtil.getHighScoreModel();

    if (model) {
      this.toggleModelBackground();
      body.removeChild(model);
      this.toggleLeaderBoardModel();
    } else {
      model = document.createElement("div");
      model.id = "high-score-model";
      body.appendChild(model);

      this.generateHighScoreForm();
      this.toggleModelBackground();

      const submitButton = gameUtil.getSubmitButton();
      const nameField = gameUtil.getNameField();

      nameField.onclick = () => {
        if (!gameUtil.isValidName(nameField.value)) nameField.value = "";
        nameField.id = "name-field";
      };

      submitButton.onclick = e => {
        if (!gameUtil.isValidName(nameField.value)) {
          e.preventDefault();
          nameField.value = "Enter name here...";
          nameField.id = "name-field-error";
        } else this.handleSubmitClick(e, nameField.value);
      };
    }
  }

  toggleModelBackground() {
    const body = gameUtil.getBodyField();
    const highScoreModel = gameUtil.getHighScoreModel();
    let modelBackground = gameUtil.getModelBackground();

    if (modelBackground) {
      if (highScoreModel) {
        modelBackground.removeEventListener(
          "click",
          this.toggleLeaderBoardModel.bind(this)
        );
      } else {
        modelBackground.removeEventListener(
          "click",
          this.toggleHighScoreModel.bind(this)
        );
      }

      body.removeChild(modelBackground);
    } else {
      modelBackground = this.appendModelBackground();

      if (highScoreModel) {
        modelBackground.addEventListener(
          "click",
          this.toggleHighScoreModel.bind(this)
        );
      } else {
        modelBackground.addEventListener(
          "click",
          this.toggleLeaderBoardModel.bind(this)
        );
      }
    }
  }

  appendModelBackground() {
    const body = gameUtil.getBodyField();

    let modelBackground = document.createElement("div");
    modelBackground.id = "model-background";
    body.appendChild(modelBackground);

    return modelBackground;
  }

  retrieveHighScores() {
    this.database
      .ref("/highScores/")
      .once("value")
      .then(snapshot => {
        this.highScores = snapshot.val().slice(1, 6);
        this.sortHighScores();
      });
  }

  sortHighScores() {
    debugger;
    this.highScores = this.highScores.sort((a, b) => {
      return b.score - a.score;
    });
    debugger;
  }

  isHighScore() {
    const highScores = this.highScores;
    const playerScore = boardUtil.getScore();

    for (let i = 0; i < highScores.length; i++) {
      if (Number(highScores[i].score) < playerScore) {
        this.rank = i + 1;
        return true;
        debugger;
        break;
      }
    }
    debugger;

    return false;
  }

  handleSubmitClick(e, name) {
    e.preventDefault();
    const body = gameUtil.getBodyField();
    const model = gameUtil.getHighScoreModel();

    this.setHighScore(name);
    this.toggleModelBackground();
    body.removeChild(model);
    this.toggleLeaderBoardModel();
  }

  setHighScore(name) {
    const score = boardUtil.getScore();
    this.highScores = this.highScores.slice(0, 4);
    this.highScores.push({ name: `${name}`, score: `${score}` });
    debugger;
    this.sortHighScores();
    debugger;

    for (let i = 0; i < this.highScores.length; i++) {
      this.database.ref(`highScores/${i + 1}`).set({
        name: `${this.highScores[i].name}`,
        score: `${this.highScores[i].score}`
      });
    }
  }

  generateHighScoreForm() {
    const model = gameUtil.getHighScoreModel();
    const form = document.createElement("form");
    const h1 = document.createElement("h1");
    const h1Text = document.createTextNode("Congratulations");
    const ul = document.createElement("ul");
    const liMessage = document.createElement("li");
    const liMessageText = document.createTextNode(
      "You've made the leader board !"
    );
    const nameInput = document.createElement("input");
    const submitInput = document.createElement("input");
    nameInput.value = "Name...";
    nameInput.id = "name-field";
    submitInput.type = "submit";
    submitInput.id = "submit-button";

    model.appendChild(form);
    form.appendChild(h1);
    h1.appendChild(h1Text);
    form.appendChild(ul);
    ul.appendChild(liMessage);
    liMessage.appendChild(liMessageText);
    form.appendChild(nameInput);
    form.appendChild(submitInput);
  }

  generateLeaderBoard(sortedHighScores) {
    let scores = sortedHighScores;
    const model = gameUtil.getLeaderBoardModel();
    // const list = document.createElement("div");
    const highScoreHeading = document.createElement("h1");
    const highScoreHeadingText = document.createTextNode("Leader Board");

    highScoreHeading.appendChild(highScoreHeadingText);
    model.appendChild(highScoreHeading);
    // model.appendChild(list);

    let unorderedList, nameListItem, scoreListItem, liNameText, liScoreText;
    for (let i = 0; i < 5; i++) {
      unorderedList = document.createElement("ul");
      nameListItem = document.createElement("li");
      scoreListItem = document.createElement("li");
      liNameText = document.createTextNode(`${scores[i].name}`);
      liScoreText = document.createTextNode(`${scores[i].score} Points`);

      nameListItem.appendChild(liNameText);
      scoreListItem.appendChild(liScoreText);
      unorderedList.appendChild(nameListItem);
      unorderedList.appendChild(scoreListItem);

      model.appendChild(unorderedList);
    }
  }
}
