import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { FsStoreObject } from '../classes';

@Injectable()
export class FsStore {
  private storage: any = window.localStorage;
  private observers: Observer<any>[];

  constructor() {
    (<any>window).fsStoreObservers = [];
  }

  private getObservers() {
    return (<any>window).fsStoreObservers;
  }

  observe(name?: string) {
    return Observable.create((observer: Observer<any>) => {
      this.getObservers().push(observer);
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
    this.getObservers().forEach((observer) => {
      observer.next(new FsStoreObject(key, FsStoreObject.EVENT_SET, value));
    });

    return this;
  }

  remove(key, options: Object = {}) {
    delete this.storage[key];
    this.getObservers().forEach((observer) => {
      observer.next(new FsStoreObject(key, FsStoreObject.EVENT_REMOVE));
    });

    return this;
  }

  clear() {
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      this.getObservers().forEach((observer) => {
        observer.next(new FsStoreObject(key, FsStoreObject.EVENT_REMOVE));
      });
    }
    this.storage.clear();
    return this;
  }
}
