const getMusicField = () => {
  return document.getElementById("myAudio");
};

export const playMusic = () => {
  let music = getMusicField();
  music.play();
};
