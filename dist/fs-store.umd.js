(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Observable'), require('@firestitch/common'), require('@angular/common/http'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Observable', '@firestitch/common', '@angular/common/http', '@angular/common'], factory) :
	(factory((global['fs-store'] = {}),global.core,global.Observable,global.common,global.http,global.common$1));
}(this, (function (exports,core,Observable,common,http,common$1) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
var FsStore = (function () {
    function FsStore(FsUtil$$1) {
        this.FsUtil = FsUtil$$1;
        this.storage = window.localStorage;
        this.observers = [];
    }
    /**
     * @param {?=} name
     * @return {?}
     */
    FsStore.prototype.observe = /**
     * @param {?=} name
     * @return {?}
     */
    function (name) {
        var _this = this;
        return Observable.Observable.create(function (observer) {
            _this.observers.push(observer);
            if (name) {
                observer.next(new FsStoreObject(name, FsStoreObject.EVENT_INIT, _this.get(name)));
            }
        }).filter(function (FsStoreObject) {
            return !name || name === FsStoreObject.name;
        });
    };
    /**
     * @param {?} key
     * @param {?=} options
     * @return {?}
     */
    FsStore.prototype.get = /**
     * @param {?} key
     * @param {?=} options
     * @return {?}
     */
    function (key, options) {
        if (options === void 0) { options = {}; }
        if (this.storage.hasOwnProperty(key)) {
            try {
                return JSON.parse(this.storage[key]);
            }
            catch (/** @type {?} */ e) { }
        }
        if (options['default'] !== undefined) {
            return options['default'];
        }
        return undefined;
    };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    FsStore.prototype.set = /**
     * @param {?} key
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    function (key, value, options) {
        if (options === void 0) { options = {}; }
        this.storage[key] = JSON.stringify(value);
        this.FsUtil.each(this.observers, function (observer) {
            observer.next(new FsStoreObject(key, FsStoreObject.EVENT_SET, value));
        });
        return this;
    };
    /**
     * @param {?} key
     * @param {?=} options
     * @return {?}
     */
    FsStore.prototype.remove = /**
     * @param {?} key
     * @param {?=} options
     * @return {?}
     */
    function (key, options) {
        if (options === void 0) { options = {}; }
        delete this.storage[key];
        this.FsUtil.each(this.observers, function (observer) {
            observer.next(new FsStoreObject(key, FsStoreObject.EVENT_REMOVE));
        });
        return this;
    };
    /**
     * @return {?}
     */
    FsStore.prototype.clear = /**
     * @return {?}
     */
    function () {
        var _loop_1 = function (i) {
            var /** @type {?} */ key = this_1.storage.key(i);
            this_1.FsUtil.each(this_1.observers, function (observer) {
                observer.next(new FsStoreObject(key, FsStoreObject.EVENT_REMOVE));
            });
        };
        var this_1 = this;
        for (var /** @type {?} */ i = 0; i < this.storage.length; i++) {
            _loop_1(i);
        }
        this.storage.clear();
        return this;
    };
    FsStore.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    FsStore.ctorParameters = function () { return [
        { type: common.FsUtil, },
    ]; };
    return FsStore;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FsStoreModule = (function () {
    function FsStoreModule() {
    }
    /**
     * @return {?}
     */
    FsStoreModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: FsStoreModule,
            providers: [FsStore]
        };
    };
    FsStoreModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common$1.CommonModule,
                        http.HttpClientModule
                    ],
                    declarations: [],
                    providers: [
                        FsStore
                    ],
                    exports: []
                },] },
    ];
    /** @nocollapse */
    FsStoreModule.ctorParameters = function () { return []; };
    return FsStoreModule;
}());

exports.FsStoreModule = FsStoreModule;
exports.FsStoreObject = FsStoreObject;
exports.FsStore = FsStore;

Object.defineProperty(exports, '__esModule', { value: true });

})));
