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
var Rx_1 = require("rxjs/Rx");
var classes_1 = require("../classes");
var FsStore = (function () {
    function FsStore() {
        this.storage = window.localStorage;
        this.observers = [];
    }
    FsStore.prototype.observe = function (name) {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            _this.observers.push(observer);
            if (name) {
                observer.next(new classes_1.FsStoreObject(name, classes_1.FsStoreObject.EVENT_INIT, _this.get(name)));
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
        for (var o = 0; o < this.observers.length; o++) {
            this.observers[o].next(new classes_1.FsStoreObject(key, classes_1.FsStoreObject.EVENT_SET, value));
        }
        return this;
    };
    FsStore.prototype.remove = function (key, options) {
        if (options === void 0) { options = {}; }
        delete this.storage[key];
        for (var o = 0; o < this.observers.length; o++) {
            this.observers[o].next(new classes_1.FsStoreObject(key, classes_1.FsStoreObject.EVENT_REMOVE));
        }
        return this;
    };
    FsStore.prototype.clear = function () {
        for (var i = 0; i < this.storage.length; i++) {
            var key = this.storage.key(i);
            for (var o = 0; o < this.observers.length; o++) {
                this.observers[o].next(new classes_1.FsStoreObject(key, classes_1.FsStoreObject.EVENT_REMOVE));
            }
        }
        this.storage.clear();
        return this;
    };
    FsStore = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], FsStore);
    return FsStore;
}());
exports.FsStore = FsStore;
//# sourceMappingURL=fsstore.service.js.map