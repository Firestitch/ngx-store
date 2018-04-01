"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=store-object.js.map