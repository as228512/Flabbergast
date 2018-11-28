import * as boardUtil from "./util/board_util";

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
    this.crowdApplauseAudio = document.getElementById("crowdApplauseAudio");
    this.parent = document.querySelector(".mute-audio-hook");
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

  playCrowdApplauseAudio() {
    this.crowdApplauseAudio.currentTime = 0;
    this.crowdApplauseAudio.volume = 0.2;
    this.crowdApplauseAudio.play();
  }

  playMusic() {
    this.backgroundAudio.volume = 0.4;
    this.backgroundAudio.play();
  }

  togglemuteMusic() {
    this.backgroundAudio.muted = true;
  }

  stopMusic() {
    this.backgroundAudio.currentTime = 0;
    this.backgroundAudio.pause();
  }

  setupMuteButton() {
    this.parent.onclick = () => this.toggleAudioMuteButton();
  }

  toggleAudioMuteButton() {
    const isAudioMuted = this.backgroundAudio.muted;
    this.toggleAllAudio(isAudioMuted);
    debugger;

    if (isAudioMuted) {
      const audio = document.createElement("i");
      audio.className = "fas fa-volume-up";
      this.parent.replaceChild(audio, this.parent.firstElementChild);
    } else {
      const mutedAudio = document.createElement("i");
      mutedAudio.className = "fas fa-volume-mute";
      this.parent.replaceChild(mutedAudio, this.parent.firstElementChild);
    }
  }

  toggleAllAudio(isAudioMuted) {
    if (isAudioMuted) {
      this.backgroundAudio.muted = false;
      this.successAudio.muted = false;
      this.rejectAudio.muted = false;
      this.threeAudio.muted = false;
      this.twoAudio.muted = false;
      this.oneAudio.muted = false;
      this.goAudio.muted = false;
      this.gameOverAudio.muted = false;
      this.crowdApplauseAudio.muted = false;
    } else {
      this.backgroundAudio.muted = true;
      this.successAudio.muted = true;
      this.rejectAudio.muted = true;
      this.threeAudio.muted = true;
      this.twoAudio.muted = true;
      this.oneAudio.muted = true;
      this.goAudio.muted = true;
      this.gameOverAudio.muted = true;
      this.crowdApplauseAudio.muted = true;
    }
  }
}
