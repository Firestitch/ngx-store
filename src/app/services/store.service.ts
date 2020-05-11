import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { FsStoreObject } from '../classes/store-object';


@Injectable()
export class FsStore {
  private storage: any = window.localStorage;

  constructor() {
    if (!(<any>window).fsStoreObservers) {
      (<any>window).fsStoreObservers = [];
    }
  }

  public observe(name: string): Observable<FsStoreObject> {
    return new Observable((observer: Observer<any>) => {
      this._getObservers().push({ name: name, observer: observer });
      observer.next(new FsStoreObject(name, FsStoreObject.EVENT_INIT, this.get(name)));
    });
  }

  public get(key, options: { default?: boolean } = {}) {

    if (this.storage.hasOwnProperty(key)) {
      try {
        return JSON.parse(this.storage[key]);
      } catch (e) {}
    }

    if (options.default !== undefined) {
      return options.default;
    }

    return undefined;
  }

  public set(name, value, options: Object = {}) {
    this.storage[name] = JSON.stringify(value);
    this._getObservers()
      .filter(item => {
        return item.name === name;
      }).forEach(item => {
        item.observer.next(new FsStoreObject(name, FsStoreObject.EVENT_SET, value));
      });

    return this;
  }

  public remove(name, options: Object = {}) {
    delete this.storage[name];
    this._getObservers()
      .filter(item => {
        return item.name === name;
      })
      .forEach((observer) => {
        observer.next(new FsStoreObject(name, FsStoreObject.EVENT_REMOVE));
      });

    return this;
  }

  public clear() {
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      this._getObservers().forEach(item => {
        item.observer.next(new FsStoreObject(key, FsStoreObject.EVENT_REMOVE));
      });
    }
    this.storage.clear();
    return this;
  }

  private _getObservers() {
    return (<any>window).fsStoreObservers;
  }
}
