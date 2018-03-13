(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("@firestitch/store", [], factory);
	else if(typeof exports === 'object')
		exports["@firestitch/store"] = factory();
	else
		root["@firestitch/store"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./fsstore.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fsstore_service_1 = __webpack_require__("./fsstore.service.ts");
var http_1 = __webpack_require__("@angular/common/http");
var core_1 = __webpack_require__("@angular/core");
var common_1 = __webpack_require__("@angular/common");
var FsStoreModule = (function () {
    function FsStoreModule() {
    }
    FsStoreModule_1 = FsStoreModule;
    FsStoreModule.forRoot = function () {
        return {
            ngModule: FsStoreModule_1,
            providers: [fsstore_service_1.FsStore]
        };
    };
    FsStoreModule = FsStoreModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule
            ],
            declarations: [],
            providers: [
                fsstore_service_1.FsStore
            ],
            exports: []
        })
    ], FsStoreModule);
    return FsStoreModule;
    var FsStoreModule_1;
}());
exports.FsStoreModule = FsStoreModule;


/***/ }),

/***/ "./fsstore.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var Observable_1 = __webpack_require__("rxjs/Observable");
var common_1 = __webpack_require__("@firestitch/common");
var FsStoreObject = (function () {
    function FsStoreObject(name, event, value) {
        this.name = name;
        this.event = event;
        this.value = value;
    }
    FsStoreObject.EVENT_SET = 'set';
    FsStoreObject.EVENT_REMOVE = 'remove';
    FsStoreObject.EVENT_INIT = 'init';
    return FsStoreObject;
}());
exports.FsStoreObject = FsStoreObject;
var FsStore = (function () {
    function FsStore(FsUtil) {
        this.FsUtil = FsUtil;
        this.storage = window.localStorage;
        this.observers = [];
    }
    FsStore.prototype.observe = function (name) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.observers.push(observer);
            if (name) {
                observer.next(new FsStoreObject(name, FsStoreObject.EVENT_INIT, _this.get(name)));
            }
        }).filter(function (FsStoreObject) {
            return !name || name === FsStoreObject.name;
        });
    };
    FsStore.prototype.get = function (key, options) {
        if (options === void 0) { options = {}; }
        if (this.storage.hasOwnProperty(key)) {
            try {
                return JSON.parse(this.storage[key]);
            }
            catch (e) { }
        }
        if (options['default'] !== undefined) {
            return options['default'];
        }
        return undefined;
    };
    FsStore.prototype.set = function (key, value, options) {
        if (options === void 0) { options = {}; }
        this.storage[key] = JSON.stringify(value);
        this.FsUtil.each(this.observers, function (observer) {
            observer.next(new FsStoreObject(key, FsStoreObject.EVENT_SET, value));
        });
        return this;
    };
    FsStore.prototype.remove = function (key, options) {
        if (options === void 0) { options = {}; }
        delete this.storage[key];
        this.FsUtil.each(this.observers, function (observer) {
            observer.next(new FsStoreObject(key, FsStoreObject.EVENT_REMOVE));
        });
        return this;
    };
    FsStore.prototype.clear = function () {
        var _loop_1 = function (i) {
            var key = this_1.storage.key(i);
            this_1.FsUtil.each(this_1.observers, function (observer) {
                observer.next(new FsStoreObject(key, FsStoreObject.EVENT_REMOVE));
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.storage.length; i++) {
            _loop_1(i);
        }
        this.storage.clear();
        return this;
    };
    FsStore = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [common_1.FsUtil])
    ], FsStore);
    return FsStore;
}());
exports.FsStore = FsStore;


/***/ }),

/***/ "./index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./fsstore.module.ts"));
__export(__webpack_require__("./fsstore.service.ts"));


/***/ }),

/***/ "@angular/common":
/***/ (function(module, exports) {

module.exports = require("@angular/common");

/***/ }),

/***/ "@angular/common/http":
/***/ (function(module, exports) {

module.exports = require("@angular/common/http");

/***/ }),

/***/ "@angular/core":
/***/ (function(module, exports) {

module.exports = require("@angular/core");

/***/ }),

/***/ "@firestitch/common":
/***/ (function(module, exports) {

module.exports = require("@firestitch/common");

/***/ }),

/***/ "rxjs/Observable":
/***/ (function(module, exports) {

module.exports = require("rxjs/Observable");

/***/ })

/******/ });
});
//# sourceMappingURL=index.map