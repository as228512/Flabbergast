export default class Music {
  constructor() {
    this.audio = document.getElementById("myAudio");
  }

  playMusic() {
    this.audio.volume = 0.2;
    this.audio.play();
  }

  stopMusic() {
    this.audio.currentTime = 0;
    this.audio.pause();
  }
}
