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
exports.start = undefined;

var _tile = __webpack_require__(/*! ./tile.js */ "./lib/tile.js");

var start = exports.start = function start() {
  var btn = document.getElementById("start-button");

  btn.onclick = (0, _tile.createTiles)();
  debugger;
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
  // document.getElementById("start-button").onclick = createTiles();
  (0, _board.start)();
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

var tiles = exports.tiles = {
  1: sample(['R', 'I', 'F', 'O', 'B', 'X']),
  2: sample(['I', 'F', 'E', 'H', 'E', 'Y']),
  3: sample(['D', 'E', 'N', 'O', 'W', 'S']),
  4: sample(['U', 'T', 'O', 'K', 'N', 'D']),

  5: sample(['H', 'M', 'S', 'R', 'A', 'O']),
  6: sample(['L', 'U', 'P', 'E', 'T', 'S']),
  7: sample(['A', 'C', 'I', 'T', 'O', 'A']),
  8: sample(['Y', 'L', 'G', 'K', 'U', 'E']),

  9: sample(['Qu', 'B', 'M', 'J', 'O', 'A']),
  10: sample(['E', 'H', 'I', 'S', 'P', 'N']),
  11: sample(['V', 'E', 'T', 'I', 'G', 'N']),
  12: sample(['B', 'A', 'L', 'I', 'Y', 'T']),

  13: sample(['E', 'Z', 'A', 'V', 'N', 'D']),
  14: sample(['R', 'A', 'L', 'E', 'S', 'C']),
  15: sample(['U', 'W', 'I', 'L', 'R', 'G']),
  16: sample(['P', 'A', 'C', 'E', 'M', 'D'])
};

var createTiles = exports.createTiles = function createTiles() {
  for (var i = 1; i < 17; i++) {
    document.getElementById('t' + i).innerHTML = tiles[i];
  }
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map