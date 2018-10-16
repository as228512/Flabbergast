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

  document.querySelectorAll("#tiles li").forEach(function (li) {
    li.addEventListener("mouseover", Tile.toggleTileActivation);
    li.addEventListener("mouseout", Tile.toggleTileActivation);
    li.addEventListener("click", Tile.formWord);
  });
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

var toggleTileActivation = exports.toggleTileActivation = function toggleTileActivation(e) {
  var li = e.target;

  if (li.className === "false") li.className = "focused";else if (li.className === "focused") li.className = "false";
};

var formWord = exports.formWord = function formWord(e) {
  var li = e.target;
  var currentWordText = document.getElementById("current-word-text").innerHTML;

  currentWordText === "" ? currentWordText += "" + li.innerHTML : currentWordText += "" + li.innerHTML.toLowerCase();

  document.getElementById("current-word-text").innerHTML = currentWordText;
};

var clearWord = exports.clearWord = function clearWord(e) {
  document.getElementById("current-word-text").innerHTML = "";
};

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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map