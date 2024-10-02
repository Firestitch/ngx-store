import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FsStore } from './store.service';

import { isAfter, subMinutes } from 'date-fns';
import { clone } from '@firestitch/common';

import { FsPersistance, FsPersistanceConfig } from '../interfaces/persistance.interface';


@Injectable()
export class FsPersistanceStore<T extends FsPersistance = any, TData = any> {

  protected _value: { data: TData, date: Date };
  protected _enabled = false;
  protected _namespace: string;
  protected _openedInDialog = false;
  protected _persistConfig: FsPersistanceConfig;

  protected STORE_KEY: string;

  constructor(
    protected _store: FsStore,
    protected _route: ActivatedRoute,
  ) {}

  public get enabled(): boolean {
    return this._enabled;
  }

  public get value(): { data: TData, date: Date } {
    return clone(this._value);
  }

  public get namespace(): string {
    return this._namespace;
  }

  public setConfig(persistanceConfig: T, namespace: string, inDialog = false): void {
    this._namespace = namespace;
    this._openedInDialog = inDialog;

    if (typeof persistanceConfig === 'object') {
      this._persistConfig = { ...<FsPersistanceConfig>persistanceConfig };
    } else {
      this._persistConfig = {};
    }

    if (this._route.snapshot.queryParams.persist === 'clear') {
      this.save({}, true);
    }

    // if filter in dialog - we should disable persistance
    if (
      this._route.snapshot.queryParams.persist !== 'disable'
      && persistanceConfig
      && !this._openedInDialog
    ) {
      this._enabled = true;
    }

    this.restore();
  }

  public save(data, force = false): void {
    if (!this._enabled && !force) {
      return;
    }

    if (typeof data === 'object') {
      data = Object.keys(data)
        .reduce((accum, key) => {
          const val = data[key];

          if (val !== null && val !== void 0) {
            accum[key] = val;
          }

          return accum;
        }, {});
    }

    // if filter in dialog - we should disable persistance
    if (!this._namespace && !force) {
      return;
    }

    this._putDataToLocalStore({
      data,
      date: new Date()
    })
  }

  /**
   * Restoring values from local storage
   */
  public restore(): void {
    if (!this.enabled) {
      return;
    }

    let value = this._retrieveDataFromLocalStore();

    // Default value if data doesn't exists
    if (!value || !value.data) {
      value = { data: {}, date: new Date() };
    } else if (value) {
      // Check if data is too old
      if (this._persistConfig.timeout) {
        const date = new Date(value.date);

        if (isAfter(subMinutes(date, this._persistConfig.timeout), new Date())) {
          value = { data: {}, date: new Date() };
        }
      }
    }

    this._value = value;
  }

  public clear() {
    this.save({});
  }

  public getDataFromScope<TScopeData = any>(name: string): TScopeData {
    return this.value.data[name];
  }

  public saveDataToScope<TScopeData = any>(name: string, value: TScopeData): void {
    const data = {
      ...this.value.data,
      [name]: value
    };

    this.save(data);
  }

  private _putDataToLocalStore(value) {
    const storeData = this._store.get(this.STORE_KEY) || {};
    storeData[this._namespace] = value;

    this._value = value;

    this._store.set(this.STORE_KEY, storeData);
  }

  private _retrieveDataFromLocalStore() {
    const storeData = this._store.get(this.STORE_KEY);

    if (storeData) {
      return storeData[this._namespace];
    } else {
      return {};
    }
  }
}
