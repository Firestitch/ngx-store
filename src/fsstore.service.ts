import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { FsUtil } from '../common/fsutil.service';

export class FsStoreObject {
  static readonly EVENT_SET = 'set';
  static readonly EVENT_REMOVE = 'remove';
  static readonly EVENT_INIT = 'init';

  constructor(private name, private event, private value?) {}
}

@Injectable()
export class FsStore {
  private storage: any = window.localStorage;
  private observers: Observer<any>[] = [];

  constructor(private FsUtil: FsUtil) {}

  observe(name?: string) {
    return Observable.create((observer: Observer<any>) => {
      this.observers.push(observer);
      if (name) {
        observer.next(new FsStoreObject(name, FsStoreObject.EVENT_INIT, this.get(name)));
      }

    }).filter((FsStoreObject) => {
      return !name || name === FsStoreObject.name;
    });
  }

  get(key, options: Object = {}) {

    if (this.storage.hasOwnProperty(key)) {
      try {
        return JSON.parse(this.storage[key]);
      } catch (e) {}
    }

    if (options['default'] !== undefined) {
      return options['default'];
    }

    return undefined;
  }

  set(key, value, options: Object = {}) {
    this.storage[key] = JSON.stringify(value);
    this.FsUtil.each(this.observers, function(observer) {
      observer.next(new FsStoreObject(key, FsStoreObject.EVENT_SET, value));
    });

    return this;
  }

  remove(key, options: Object = {}) {
    delete this.storage[key];
    this.FsUtil.each(this.observers, function(observer) {
      observer.next(new FsStoreObject(key, FsStoreObject.EVENT_REMOVE));
    });
    return this;
  }

  clear() {
     for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      this.FsUtil.each(this.observers, function(observer) {
        observer.next(new FsStoreObject(key, FsStoreObject.EVENT_REMOVE));
      });
    }
    this.storage.clear();
    return this;
  }
}
