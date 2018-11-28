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
    this.isMuted = false;
  }

  playSuccessAudio() {
    if (!this.isMuted) {
      this.successAudio.currentTime = 0;
      this.successAudio.volume = 0.1;
      this.successAudio.play();
    }
  }

  playRejectAudio() {
    if (!this.isMuted) {
      this.rejectAudio.currentTime = 0;
      this.rejectAudio.volume = 0.2;
      this.rejectAudio.play();
    }
  }

  playThreeAudio() {
    if (!this.isMuted) {
      this.threeAudio.currentTime = 0;
      this.threeAudio.volume = 0.2;
      this.threeAudio.play();
    }
  }

  playTwoAudio() {
    if (!this.isMuted) {
      this.twoAudio.currentTime = 0;
      this.twoAudio.volume = 0.2;
      this.twoAudio.play();
    }
  }

  playOneAudio() {
    if (!this.isMuted) {
      this.oneAudio.currentTime = 0;
      this.oneAudio.volume = 0.2;
      this.oneAudio.play();
    }
  }

  playGoAudio() {
    if (!this.isMuted) {
      this.goAudio.currentTime = 0;
      this.goAudio.volume = 0.2;
      this.goAudio.play();
    }
  }

  playGameOverAudio() {
    if (!this.isMuted) {
      this.gameOverAudio.currentTime = 0;
      this.gameOverAudio.volume = 0.2;
      this.gameOverAudio.play();
    }
  }

  playCrowdApplauseAudio() {
    if (!this.isMuted) {
      this.crowdApplauseAudio.currentTime = 0;
      this.crowdApplauseAudio.volume = 0.2;
      this.crowdApplauseAudio.play();
    }
  }

  playMusic() {
    if (!this.isMuted) {
      this.backgroundAudio.volume = 0.4;
      this.backgroundAudio.play();
    }
  }

  togglemuteMusic() {
    this.backgroundAudio.muted = true;
  }

  stopMusic() {
    this.backgroundAudio.currentTime = 0;
    this.backgroundAudio.pause();
  }

  setupMuteButton() {
    this.parent.onclick = () => this.toggleAudioMute();
  }

  toggleAudioMute() {
    if (!this.isMuted) {
      this.isMuted = true;
      this.backgroundAudio.muted = true;

      const mutedAudio = document.createElement("i");
      mutedAudio.className = "fas fa-volume-mute";
      this.parent.replaceChild(mutedAudio, this.parent.firstElementChild);
    } else {
      this.isMuted = false;
      this.backgroundAudio.muted = false;

      const audio = document.createElement("i");
      audio.className = "fas fa-volume-up";
      this.parent.replaceChild(audio, this.parent.firstElementChild);
    }
  }
}
