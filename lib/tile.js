const sample = (array) => {
  return array[Math.floor (Math.random() * array.length)];
};

export const tiles = {
  1: sample(['R','I','F','O','B','X']),
  2: sample(['I','F','E','H','E','Y']),
  3: sample(['D','E','N','O','W','S']),
  4: sample(['U','T','O','K','N','D']),

  5: sample(['H','M','S','R','A','O']),
  6: sample(['L','U','P','E','T','S']),
  7: sample(['A','C','I','T','O','A']),
  8: sample(['Y','L','G','K','U','E']),

  9: sample(['Qu','B','M','J','O','A']),
 10: sample(['E','H','I','S','P','N']),
 11: sample(['V','E','T','I','G','N']),
 12: sample(['B','A','L','I','Y','T']),

 13: sample(['E','Z','A','V','N','D']),
 14: sample(['R','A','L','E','S','C']),
 15: sample(['U','W','I','L','R','G']),
 16: sample(['P','A','C','E','M','D'])
};

export const createTiles =
  () => {
    for (let i = 1; i < 17; i++) {
      document.getElementById(`t${i}`).innerHTML =
      tiles[i];
    }
  };
