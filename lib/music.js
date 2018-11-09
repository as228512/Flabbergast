export default class Music {
  constructor() {
    this.backgroundAudio = document.getElementById("backgroundAudio");
    this.successAudio = document.getElementById("successAudio");
    this.rejectAudio = document.getElementById("rejectAudio");
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

  playMusic() {
    this.backgroundAudio.volume = 0.4;
    this.backgroundAudio.play();
  }

  stopMusic() {
    this.backgroundAudio.currentTime = 0;
    this.backgroundAudio.pause();
  }
}
