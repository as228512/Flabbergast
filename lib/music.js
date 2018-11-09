export default class Music {
  constructor() {
    this.backgroundAudio = document.getElementById("backgroundAudio");
    this.successAudio = document.getElementById("successAudio");
    this.rejectAudio = document.getElementById("rejectAudio");
    this.threeAudio = document.getElementById("threeAudio");
    this.twoAudio = document.getElementById("twoAudio");
    this.oneAudio = document.getElementById("oneAudio");
    this.goAudio = document.getElementById("goAudio");
    this.gameOverAudio = document.getElementById("gameOverAudio");
  }

  playSuccessAudio() {
    this.successAudio.currentTime = 0;
    this.successAudio.volume = 0.1;
    this.successAudio.play();
  }

  playRejectAudio() {
    this.rejectAudio.currentTime = 0;
    this.rejectAudio.volume = 0.2;
    this.rejectAudio.play();
  }

  playThreeAudio() {
    this.threeAudio.currentTime = 0;
    this.threeAudio.volume = 0.2;
    this.threeAudio.play();
  }

  playTwoAudio() {
    this.twoAudio.currentTime = 0;
    this.twoAudio.volume = 0.2;
    this.twoAudio.play();
  }

  playOneAudio() {
    this.oneAudio.currentTime = 0;
    this.oneAudio.volume = 0.2;
    this.oneAudio.play();
  }

  playGoAudio() {
    this.goAudio.currentTime = 0;
    this.goAudio.volume = 0.2;
    this.goAudio.play();
  }

  playGameOverAudio() {
    this.gameOverAudio.currentTime = 0;
    this.gameOverAudio.volume = 0.2;
    this.gameOverAudio.play();
  }

  playMusic() {
    this.backgroundAudio.volume = 0.4;
    this.backgroundAudio.play();
  }

  stopMusic() {
    this.backgroundAudio.currentTime = 0;
    this.backgroundAudio.pause();
  }
}
