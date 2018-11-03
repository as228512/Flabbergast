const getMusicField = () => {
  return document.getElementById("myAudio");
};

export const playMusic = () => {
  getMusicField().play();
};

export const stopMusic = () => {
  getMusicField().pause();
  getMusicField().currentTime = 0;
};
