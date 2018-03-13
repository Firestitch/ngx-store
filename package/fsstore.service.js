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
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var common_1 = require("@firestitch/common");
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
//# sourceMappingURL=fsstore.service.js.map