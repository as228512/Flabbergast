export default class Music {
  constructor() {
    this.audio = document.getElementById("myAudio");
  }

  playMusic() {
    this.audio.currentTime = 0;
    this.audio.volume = 0.2;
    this.audio.play();
  }
}
