const getMusicField = () => {
  return document.getElementById("myAudio");
};

export const playMusic = () => {
  getMusicField().volume = 0.2;
  getMusicField().play();
};

export const stopMusic = () => {
  getMusicField().pause();
  getMusicField().currentTime = 0;
};
