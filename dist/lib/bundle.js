/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleStartButton = exports.startReset = undefined;

var _tile = __webpack_require__(/*! ./tile */ "./lib/tile.js");

var Tile = _interopRequireWildcard(_tile);

var _timer = __webpack_require__(/*! ./timer */ "./lib/timer.js");

var Timer = _interopRequireWildcard(_timer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var startReset = exports.startReset = function startReset() {
  document.getElementById("start-button").onclick = function () {
    Timer.resetTimer();
    Tile.clearWord();
    Tile.createTiles();
    toggleStartButton("start");
    activateGame();
  };
};

var toggleStartButton = exports.toggleStartButton = function toggleStartButton(requestType) {
  requestType === "start" ? document.getElementById("start-button").innerHTML = "Reset" : document.getElementById("start-button").innerHTML = "Start";
};

var activateGame = function activateGame() {
  Timer.startTimer();
  Tile.activateTiles();
};

/***/ }),

/***/ "./lib/canvas.js":
/*!***********************!*\
  !*** ./lib/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tile = __webpack_require__(/*! ./tile.js */ "./lib/tile.js");

var _board = __webpack_require__(/*! ./board.js */ "./lib/board.js");

document.addEventListener("DOMContentLoaded", function () {
  (0, _tile.createTiles)();
  (0, _board.startReset)();
  document.getElementById("sub-words").innerHTML = "TESTING";
});

/***/ }),

/***/ "./lib/tile.js":
/*!*********************!*\
  !*** ./lib/tile.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearWord = exports.submitWord = exports.formWord = exports.deSelectTiles = exports.tileSelection = exports.toggleTileActivation = exports.activateTiles = exports.createTiles = undefined;

var _word = __webpack_require__(/*! ./word */ "./lib/word.js");

var _word2 = _interopRequireDefault(_word);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { dictionary } from "./legal-words";

var oldVersionTiles = [["R", "I", "F", "O", "B", "X"], ["I", "F", "E", "H", "E", "Y"], ["D", "E", "N", "O", "W", "S"], ["U", "T", "O", "K", "N", "D"], ["H", "M", "S", "R", "A", "O"], ["L", "U", "P", "E", "T", "S"], ["A", "C", "I", "T", "O", "A"], ["Y", "L", "G", "K", "U", "E"], ["Qu", "B", "M", "J", "O", "A"], ["E", "H", "I", "S", "P", "N"], ["V", "E", "T", "I", "G", "N"], ["B", "A", "L", "I", "Y", "T"], ["E", "Z", "A", "V", "N", "D"], ["R", "A", "L", "E", "S", "C"], ["U", "W", "I", "L", "R", "G"], ["P", "A", "C", "E", "M", "D"]];

var newVersionTiles = [["A", "A", "E", "E", "G", "N"], ["E", "L", "R", "T", "T", "Y"], ["A", "O", "O", "T", "T", "W"], ["A", "B", "B", "J", "O", "O"], ["E", "H", "R", "T", "V", "W"], ["C", "I", "M", "O", "T", "V"], ["D", "I", "S", "T", "T", "Y"], ["E", "I", "O", "S", "S", "T"], ["D", "E", "L", "R", "V", "Y"], ["A", "C", "H", "O", "P", "S"], ["H", "I", "M", "N", "Qu", "U"], ["E", "E", "I", "N", "S", "U"], ["E", "E", "G", "H", "N", "W"], ["A", "F", "F", "K", "P", "S"], ["H", "L", "N", "N", "R", "Z"], ["D", "E", "I", "L", "R", "X"]];

var sample = function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
};

var shuffleTiles = function shuffleTiles(tileSet) {
  for (var i = tileSet.length - 1; i > 0; i--) {
    var randomIdx = Math.floor(Math.random() * (i + 1));
    var temp = tileSet[i];
    tileSet[i] = tileSet[randomIdx];
    tileSet[randomIdx] = temp;
  }

  return tileSet;
};

var createTiles = exports.createTiles = function createTiles() {
  var shuffledTiles = shuffleTiles(newVersionTiles).slice(0);
  for (var i = 1; i < 17; i++) {
    var tile = shuffledTiles.pop();
    var randomLetter = sample(tile);
    document.getElementById("t" + i).innerHTML = randomLetter;
  }
};

var activateTiles = exports.activateTiles = function activateTiles() {
  document.querySelectorAll("#tiles li").forEach(function (li) {
    li.addEventListener("mouseover", toggleTileActivation);
    li.addEventListener("mouseout", toggleTileActivation);
    li.addEventListener("click", formWord);
  });
};

var toggleTileActivation = exports.toggleTileActivation = function toggleTileActivation(e) {
  var li = e.target;

  if (li.className === "false") li.className = "focused";else if (li.className === "focused") li.className = "false";
};

var tileSelection = exports.tileSelection = function tileSelection(e) {
  var li = e.target;

  if (word.isValid(li)) {
    word.letterNodes.forEach(function (node) {
      node.className = "selected";
    });

    var currentWordText = word.letterNodes.map(function (letterNode) {
      var isFirstLetter = letterNode.value === word.letterNodes[0].value;
      return isFirstLetter ? letterNode.innerHTML : letterNode.innerHTML.toLowerCase();
    });

    document.getElementById("current-word-text").innerHTML = currentWordText.join("");
  }
};

var deSelectTiles = exports.deSelectTiles = function deSelectTiles(nodeArray) {
  nodeArray.forEach(function (tile) {
    tile.className = "false";
  });
};

////
////
////
////
////
var word;
var formWord = exports.formWord = function formWord(e) {
  var currentWordField = document.getElementById("current-word-text");
  var isEmpty = currentWordField.innerHTML.length === 0;

  if (isEmpty) {
    //handles cases for user's first selection &
    //toggles on further selection highlighting
    document.querySelectorAll("#tiles li").forEach(function (li) {
      li.removeEventListener("mouseover", toggleTileActivation);
      li.removeEventListener("mouseout", toggleTileActivation);
      li.addEventListener("mouseover", tileSelection);
    });

    var firstLetterNode = e.target;
    firstLetterNode.className = "selected";
    word = new _word2.default();
    word.add(firstLetterNode);
    currentWordField.innerHTML = word.letterNodes[0].innerHTML;
  } else {
    submitWord(e.target, currentWordField.innerHTML);
  }
};

var submitWord = exports.submitWord = function submitWord(currentTile, word) {
  word = word.split("").map(function (char) {
    return char.toUpperCase();
  }).join("");
  //toggles off selection highlighting & activation highlighting is toggled on
  console.log("Word was: " + word);
  console.log("Word included: " + dictionary.includes(word));
  document.querySelectorAll("#tiles li").forEach(function (li) {
    li.className = currentTile === li ? "focused" : "false";
    li.removeEventListener("mouseover", tileSelection);
    li.addEventListener("mouseover", toggleTileActivation);
    li.addEventListener("mouseout", toggleTileActivation);
  });

  clearWord();
};

var clearWord = exports.clearWord = function clearWord() {
  document.getElementById("current-word-text").innerHTML = "";
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ "./lib/timer.js":
/*!**********************!*\
  !*** ./lib/timer.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tickTimer = exports.resetTimer = exports.stopTimer = exports.startTimer = undefined;

var _board = __webpack_require__(/*! ./board */ "./lib/board.js");

var timerIntervalId = void 0;
var startTimer = exports.startTimer = function startTimer() {
  timerIntervalId = setInterval(tickTimer, 1000);
};

var stopTimer = exports.stopTimer = function stopTimer() {
  clearInterval(timerIntervalId);
};

var resetTimer = exports.resetTimer = function resetTimer() {
  stopTimer();
  document.getElementsByClassName("timer")[0].innerHTML = "Time: 90";
};

var tickTimer = exports.tickTimer = function tickTimer() {
  var time = Number(document.getElementsByClassName("timer")[0].innerHTML.replace(/[^\d]/g, ""));

  if (time === 0) {
    stopTimer();
    (0, _board.toggleStartButton)();
    return;
  }

  time--;

  document.getElementsByClassName("timer")[0].innerHTML = "Time: " + time;
};

/***/ }),

/***/ "./lib/word.js":
/*!*********************!*\
  !*** ./lib/word.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tile = __webpack_require__(/*! ./tile */ "./lib/tile.js");

var Tile = _interopRequireWildcard(_tile);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Word = function () {
  function Word() {
    _classCallCheck(this, Word);

    this.letterNodes = [];
  }

  _createClass(Word, [{
    key: "isValid",
    value: function isValid(letterNode) {
      var lastLetterNode = this.letterNodes[this.letterNodes.length - 1];
      var isSibling = this.isNextTo(letterNode, lastLetterNode);
      var isSelf = this.isSelf(letterNode);

      if (isSelf) return true;else if (isSibling) {
        this.add(letterNode);
        return true;
      } else return false;
    }
  }, {
    key: "isNextTo",
    value: function isNextTo(letterNode, lastLetterNode) {
      var standardNodeDifferentials = [-5, -4, -3, -1, 1, 3, 4, 5];
      var sideNodeDifferentials = {
        5: [-4, -3, 1, 4, 5],
        8: [-5, -4, -1, 3, 4],
        9: [-4, -3, 1, 4, 5],
        12: [-5, -4, -1, 3, 4]
      };
      var cornerNodeDifferentials = {
        1: [1, 4, 5],
        4: [-1, 3, 4],
        13: [-4, -3, 1],
        16: [-1, -4, -5]
      };

      var differential = letterNode.value - lastLetterNode.value;

      var isCornerNode = cornerNodeDifferentials[lastLetterNode.value] ? true : false;

      var isSideNode = sideNodeDifferentials[lastLetterNode.value] ? true : false;

      if (isCornerNode) {
        if (cornerNodeDifferentials[lastLetterNode.value].includes(differential)) {
          return true;
        }
      } else if (isSideNode) {
        if (sideNodeDifferentials[lastLetterNode.value].includes(differential)) {
          return true;
        }
      } else if (standardNodeDifferentials.includes(differential)) return true;

      return false;
    }
  }, {
    key: "isSelf",
    value: function isSelf(letterNode) {
      var currentWord = this.letterNodes;

      for (var i = 0; i < currentWord.length; i++) {
        if (currentWord[i].value === letterNode.value) {
          var backTrackedWord = currentWord.slice(0, i + 1);
          var deSelectedWord = currentWord.slice(i);

          Tile.deSelectTiles(deSelectedWord);
          this.letterNodes = backTrackedWord;
          return true;
        }
      }

      return false;
    }
  }, {
    key: "add",
    value: function add(letterNode) {
      this.letterNodes.push(letterNode);
    }
  }]);

  return Word;
}();

exports.default = Word;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map