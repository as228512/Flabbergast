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

/***/ "./lib/canvas.js":
/*!***********************!*\
  !*** ./lib/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tile = __webpack_require__(/*! ./tile.js */ "./lib/tile.js");

document.addEventListener("DOMContentLoaded", function () {
  debugger;
  (0, _tile.createTiles)();

  afdafa;
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
var tiles = exports.tiles = {
  1: ['R', 'I', 'F', 'O', 'B', 'X'].sample,
  2: ['I', 'F', 'E', 'H', 'E', 'Y'].sample,
  3: ['D', 'E', 'N', 'O', 'W', 'S'].sample,
  4: ['U', 'T', 'O', 'K', 'N', 'D'].sample,

  5: ['H', 'M', 'S', 'R', 'A', 'O'].sample,
  6: ['L', 'U', 'P', 'E', 'T', 'S'].sample,
  7: ['A', 'C', 'I', 'T', 'O', 'A'].sample,
  8: ['Y', 'L', 'G', 'K', 'U', 'E'].sample,

  9: ['Qu', 'B', 'M', 'J', 'O', 'A'].sample,
  10: ['E', 'H', 'I', 'S', 'P', 'N'].sample,
  11: ['V', 'E', 'T', 'I', 'G', 'N'].sample,
  12: ['B', 'A', 'L', 'I', 'Y', 'T'].sample,

  13: ['E', 'Z', 'A', 'V', 'N', 'D'].sample,
  14: ['R', 'A', 'L', 'E', 'S', 'C'].sample,
  15: ['U', 'W', 'I', 'L', 'R', 'G'].sample,
  16: ['P', 'A', 'C', 'E', 'M', 'D'].sample
};

var createTiles = exports.createTiles = function createTiles() {
  document.getElementById("t1").innerHtml = tiles[1];
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map