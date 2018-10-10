const sample = (array) => {
  return array[Math.floor (Math.random() * array.length)];
};

export const tiles = {
  1: ['R','I','F','O','B','X'],
  2: ['I','F','E','H','E','Y'],
  3: ['D','E','N','O','W','S'],
  4: ['U','T','O','K','N','D'],

  5: ['H','M','S','R','A','O'],
  6: ['L','U','P','E','T','S'],
  7: ['A','C','I','T','O','A'],
  8: ['Y','L','G','K','U','E'],

  9: ['Qu','B','M','J','O','A'],
 10: ['E','H','I','S','P','N'],
 11: ['V','E','T','I','G','N'],
 12: ['B','A','L','I','Y','T'],

 13: ['E','Z','A','V','N','D'],
 14: ['R','A','L','E','S','C'],
 15: ['U','W','I','L','R','G'],
 16: ['P','A','C','E','M','D']
};

export const createTiles =
  () => {
    for (let i = 1; i < 17; i++) {
      document.getElementById(`t${i}`).innerHTML = sample(tiles[i]);
    }
  };
