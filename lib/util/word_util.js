export const standardNodeDifferentials = [-5, -4, -3, -1, 1, 3, 4, 5];

export const sideNodeDifferentials = {
  5: [-4, -3, 1, 4, 5],
  8: [-5, -4, -1, 3, 4],
  9: [-4, -3, 1, 4, 5],
  12: [-5, -4, -1, 3, 4]
};

export const cornerNodeDifferentials = {
  1: [1, 4, 5],
  4: [-1, 3, 4],
  13: [-4, -3, 1],
  16: [-1, -4, -5]
};

export const toLowerCase = letterNodes => {
  return letterNodes.map(letterNode => {
    const isFirstLetter = letterNode.value === letterNodes[0].value;
    return isFirstLetter
      ? letterNode.innerHTML
      : letterNode.innerHTML.toLowerCase();
  });
};

export const toUpperCase = word => {
  return word
    .split("")
    .map(char => char.toUpperCase())
    .join("");
};
