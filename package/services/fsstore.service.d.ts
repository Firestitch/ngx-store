export declare class FsStore {
    private storage;
    private observers;
    constructor();
    observe(name?: string): any;
    get(key: any, options?: Object): any;
    set(key: any, value: any, options?: Object): this;
    remove(key: any, options?: Object): this;
    clear(): this;
}
