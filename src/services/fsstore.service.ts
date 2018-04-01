import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { filter } from 'rxjs/operator/filter';
import { FsStoreObject } from '../classes';

@Injectable()
export class FsStore {
  private storage: any = window.localStorage;
  private observers: Observer<any>[] = [];

  constructor() {}

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
    for (let o = 0; o < this.observers.length; o++) {
      this.observers[o].next(new FsStoreObject(key, FsStoreObject.EVENT_SET, value));
    }

    return this;
  }

  remove(key, options: Object = {}) {
    delete this.storage[key];
    for (let o = 0; o < this.observers.length; o++) {
      this.observers[o].next(new FsStoreObject(key, FsStoreObject.EVENT_REMOVE));
    }
    return this;
  }

  clear() {
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      for (let o = 0; o < this.observers.length; o++) {
        this.observers[o].next(new FsStoreObject(key, FsStoreObject.EVENT_REMOVE));
      }
    }
    this.storage.clear();
    return this;
  }
}
