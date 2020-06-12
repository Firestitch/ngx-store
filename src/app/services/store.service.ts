import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs';

import { FsStoreObject } from '../classes/store-object';
import { StoreObserver } from './../interfaces/store-observer';

@Injectable()
export class FsStore {

  private _storage: any = window.localStorage;
  private _storeObservers = [];

  public observe(name: string): Observable<FsStoreObject> {
    return new Observable((observer: Observer<any>) => {
      this._getObservers().push({ name: name, observer: observer });
      observer.next(new FsStoreObject(name, FsStoreObject.EVENT_INIT, this.get(name)));
    });
  }

  public get(key, options: { default?: boolean } = {}) {

    if (this._storage.hasOwnProperty(key)) {
      try {
        return JSON.parse(this._storage[key]);
      } catch (e) {}
    }

    if (options.default !== undefined) {
      return options.default;
    }

    return undefined;
  }

  public set(name, value, options: Object = {}) {
    this._storage[name] = JSON.stringify(value);
    this._getObservers()
      .filter((storeObserver: StoreObserver) => {
        return storeObserver.name === name;
      }).forEach((storeObserver: StoreObserver) => {
        storeObserver.observer.next(new FsStoreObject(name, FsStoreObject.EVENT_SET, value));
      });

    return this;
  }

  public remove(name, options: Object = {}) {
    delete this._storage[name];
    this._getObservers()
      .filter((item: StoreObserver) => {
        return item.name === name;
      })
      .forEach((storeObserver: StoreObserver) => {
        storeObserver.observer.next(new FsStoreObject(name, FsStoreObject.EVENT_REMOVE));
      });

    return this;
  }

  public clear() {
    for (let i = 0; i < this._storage.length; i++) {
      const key = this._storage.key(i);
      this._getObservers().forEach(item => {
        item.observer.next(new FsStoreObject(key, FsStoreObject.EVENT_REMOVE));
      });
    }
    this._storage.clear();

    return this;
  }

  private _getObservers(): StoreObserver[] {
    return this._storeObservers;
  }

}
