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
exports.clearWord = exports.formWord = exports.toggleTileSelection = exports.toggleTileActivation = exports.activateTiles = exports.createTiles = undefined;

var _word = __webpack_require__(/*! ./word */ "./lib/word.js");

var _word2 = _interopRequireDefault(_word);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var word;
var sample = function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
};

var tiles = {
  1: ["R", "I", "F", "O", "B", "X"],
  2: ["I", "F", "E", "H", "E", "Y"],
  3: ["D", "E", "N", "O", "W", "S"],
  4: ["U", "T", "O", "K", "N", "D"],

  5: ["H", "M", "S", "R", "A", "O"],
  6: ["L", "U", "P", "E", "T", "S"],
  7: ["A", "C", "I", "T", "O", "A"],
  8: ["Y", "L", "G", "K", "U", "E"],

  9: ["Qu", "B", "M", "J", "O", "A"],
  10: ["E", "H", "I", "S", "P", "N"],
  11: ["V", "E", "T", "I", "G", "N"],
  12: ["B", "A", "L", "I", "Y", "T"],

  13: ["E", "Z", "A", "V", "N", "D"],
  14: ["R", "A", "L", "E", "S", "C"],
  15: ["U", "W", "I", "L", "R", "G"],
  16: ["P", "A", "C", "E", "M", "D"]
};

var createTiles = exports.createTiles = function createTiles() {
  for (var i = 1; i < 17; i++) {
    document.getElementById("t" + i).innerHTML = sample(tiles[i]);
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

var toggleTileSelection = exports.toggleTileSelection = function toggleTileSelection(e) {
  var li = e.target;

  debugger;

  if (word.isValid(li)) {
    word.letterNodes.forEach(function (node) {
      node.className = "selected";
    });

    var currentWordText = word.letterNodes.map(function (letterNode) {
      return letterNode.innerHTML;
    });

    document.getElementById("current-word-text").innerHTML = currentWordText.join("");

    // if (li.className === "focused") li.className = "false";
    // else if (li.className === "false") li.className = "selected";
  }
};

////
////
////
////
////
var formWord = exports.formWord = function formWord(e) {
  var currentWordField = document.getElementById("current-word-text");

  //handles cases for user's first selection
  if (currentWordField.innerHTML === "") {
    var firstLetterNode = e.target;
    firstLetterNode.className = "selected";
    word = new _word2.default();
    word.add(firstLetterNode);
    currentWordField.innerHTML = word.letterNodes[0].innerHTML;
  }

  //toggles further selection highlighting
  document.querySelectorAll("#tiles li").forEach(function (li) {
    li.removeEventListener("mouseover", toggleTileActivation);
    li.removeEventListener("mouseout", toggleTileActivation);
    li.addEventListener("mouseover", toggleTileSelection);
  });

  // const li = e.target;
  //
  // if (word.isValid(li)) {
  // }
  //
  // let currentWordText = document.getElementById("current-word-text").innerHTML;
  //
  // currentWordText === ""
  //   ? (currentWordText += `${li.innerHTML}`)
  //   : (currentWordText += `${li.innerHTML.toLowerCase()}`);
  //
  // document.getElementById("current-word-text").innerHTML = currentWordText;
};

//   let firstLetter = e.target;
//   firstLetter.className = "selected";
//
//   document.querySelectorAll("#tiles li").forEach(li => {
//     li.removeEventListener("mouseover", toggleTileActivation);
//     li.removeEventListener("mouseout", toggleTileActivation);
//     li.addEventListener("mouseover", toggleTileSelection);
//     li.addEventListener("mouseout", toggleTileSelection);
//   });
//
//   const li = e.target;
//
//   let currentWordText = document.getElementById("current-word-text").innerHTML;
//
//   currentWordText === ""
//     ? (currentWordText += `${li.innerHTML}`)
//     : (currentWordText += `${li.innerHTML.toLowerCase()}`);
//
//   document.getElementById("current-word-text").innerHTML = currentWordText;
// };

////
////
////
////
////

var clearWord = exports.clearWord = function clearWord(e) {
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

      debugger;

      if (isSelf) return true;else if (isSibling) {
        this.add(letterNode);
        return true;
      } else return false;
    }
  }, {
    key: "isNextTo",
    value: function isNextTo(letterNode, lastLetterNode) {
      // if (!lastLetterNode) return;
      var standardNodeDifferentials = [-5, -4, -3, -1, 1, 3, 4, 5];
      var cornerNodeDifferentials = {
        1: [1, 4, 5],
        4: [-1, 3, 5],
        13: [-4, -3, 1],
        16: [-1, -4, -5]
      };

      var differential = letterNode.value - lastLetterNode.value;

      var isCornerNode = cornerNodeDifferentials[lastLetterNode.value] ? true : false;

      if (isCornerNode) {
        if (cornerNodeDifferentials[lastLetterNode.value].includes(differential)) {
          return true;
        }
      } else if (standardNodeDifferentials.includes(differential)) return true;

      return false;
    }
  }, {
    key: "isSelf",
    value: function isSelf(letterNode) {
      var currentWord = this.letterNodes;
      var result = false;

      for (var i = 0; i < currentWord.length; i++) {
        if (currentWord[i].value === letterNode.value) {
          var backTrackedWord = currentWord.slice(0, i + 1);
          this.letterNodes = backTrackedWord;
          result = true;
          break;
        }
      }

      return result;
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