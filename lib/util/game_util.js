export const getCurrentTime = () => {
  const time = getTimerField();

  return Number(time.innerHTML.replace(/[^\d]/g, ""));
};

export const getTimerField = () => {
  return document.getElementsByClassName("timer")[0];
};
