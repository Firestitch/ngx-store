import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FsStoreObject } from '../classes/store-object';


@Injectable()
export class FsStore {
  private storage: any = window.localStorage;

  constructor() {
    if (!(<any>window).fsStoreObservers) {
      (<any>window).fsStoreObservers = [];
    }
  }

  public observe(name?: string) {
    return new Observable((observer: Observer<any>) => {
      this.getObservers().push(observer);
      if (name) {
        observer.next(new FsStoreObject(name, FsStoreObject.EVENT_INIT, this.get(name)));
      }

    }).pipe(
      filter(storeObject => {
        return !name || name === storeObject.name;
      }),
    );
  }

  public get(key, options: Object = {}) {

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

  public set(key, value, options: Object = {}) {
    this.storage[key] = JSON.stringify(value);
    this.getObservers().forEach((observer) => {
      observer.next(new FsStoreObject(key, FsStoreObject.EVENT_SET, value));
    });

    return this;
  }

  public remove(key, options: Object = {}) {
    delete this.storage[key];
    this.getObservers().forEach((observer) => {
      observer.next(new FsStoreObject(key, FsStoreObject.EVENT_REMOVE));
    });

    return this;
  }

  public clear() {
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      this.getObservers().forEach((observer) => {
        observer.next(new FsStoreObject(key, FsStoreObject.EVENT_REMOVE));
      });
    }
    this.storage.clear();
    return this;
  }

  private getObservers() {
    return (<any>window).fsStoreObservers;
  }
}
