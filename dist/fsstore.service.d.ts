import { FsUtil } from '@firestitch/common';
export declare class FsStoreObject {
    private name;
    private event;
    private value;
    static readonly EVENT_SET: string;
    static readonly EVENT_REMOVE: string;
    static readonly EVENT_INIT: string;
    constructor(name: any, event: any, value?: any);
}
export declare class FsStore {
    private FsUtil;
    private storage;
    private observers;
    constructor(FsUtil: FsUtil);
    observe(name?: string): any;
    get(key: any, options?: Object): any;
    set(key: any, value: any, options?: Object): this;
    remove(key: any, options?: Object): this;
    clear(): this;
}
