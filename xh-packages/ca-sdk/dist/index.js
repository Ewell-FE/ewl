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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
var global = {};

if (typeof window !== 'undefined') {
  global = window;
}

var caSdk = function () {
  function caSdk(option) {
    this.signTxtUrl = option.signTxtUrl;
    this.getSignTxtUrl = option.getSignTxtUrl;
    this.http = option.http;
    this.times = option.times || 20;
    this.subscribeEvent = option.subscribeEvent;
    this.getBase64Event = option.getBase64Event;
    this.getSignTxt = this.getSignTxt.bind(this);
    this.signFetch = this.signFetch.bind(this);
    this.signTxt = this.signTxt.bind(this);
  }

  caSdk.prototype.getSignTxt = function (url, bizSn, resolve) {
    var _this = this;

    this.http(url || this.getSignTxtUrl, {
      bizSn: bizSn
    }).then(function (result) {
      _this.subscribeEvent && _this.subscribeEvent(result, resolve);
    });
  };

  caSdk.prototype.signFetch = function (url, options, obj, resolve, reject) {
    if (options === void 0) {
      options = {
        signType: '1'
      };
    }

    if (obj === void 0) {
      obj = {};
    }

    Object.assign(options, {
      signType: options.signType || "1"
    });
    var that = this;

    if (options.signType === '1') {
      that.http(url || that.signTxtUrl, options, obj).then(function (data) {
        if (data.state === 'success') {
          resolve(__assign(__assign({}, data), {
            signType: '1'
          }));
        } else {
          that.signFetch(url, __assign(__assign({}, options), {
            signType: '2'
          }), obj, resolve, reject);
        }
      })["catch"](function (e) {
        reject(e);
      });
    } else if (options.signType === '2') {
      that.http(url || that.signTxtUrl, options, obj).then(function (result) {
        that.getBase64Event && that.getBase64Event(result);
        that.subscribe(result.data, resolve);
      })["catch"](function (e) {
        reject(e);
      });
    }
  };

  caSdk.prototype.signTxt = function (url, options, obj) {
    if (options === void 0) {
      options = {
        signType: '1'
      };
    }

    var that = this;
    return new Promise(function (resolve, reject) {
      that.signFetch(url, __assign({}, options), obj || {}, resolve, reject);
    });
  };

  caSdk.prototype.subscribe = function (key, resolve) {
    var _this = this;

    var that = this;
    var num = 0;
    clearInterval(this.timer);
    that.timer = setInterval(function () {
      if (num >= _this.times) {
        clearInterval(_this.timer);
        _this.subscribeEvent && _this.subscribeEvent(null, resolve);
      } else {
        that.getSignTxt(undefined, key, resolve);
        num++;
      }
    }, 3000);
  };

  caSdk.prototype.clear = function () {
    clearInterval(this.timer);
  };

  return caSdk;
}();

exports["default"] = caSdk;

/***/ })
/******/ ]);