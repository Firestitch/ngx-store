import { Injectable, NgModule } from '@angular/core';
import { Observable as Observable$1 } from 'rxjs/Observable';
import { FsUtil } from '@firestitch/common';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
        return Observable$1.create(function (observer) {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    FsStore.ctorParameters = function () { return [
        { type: FsUtil, },
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
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        HttpClientModule
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

export { FsStoreModule, FsStoreObject, FsStore };
