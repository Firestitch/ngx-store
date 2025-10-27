import { Component, inject } from '@angular/core';
import { FsStore } from '@firestitch/store';
import { FsMessage } from '@firestitch/message';
import { MatButton } from '@angular/material/button';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'first-example',
    templateUrl: 'first-example.component.html',
    standalone: true,
    imports: [MatButton, JsonPipe]
})
export class FirstExampleComponent {
  private _store = inject(FsStore);
  private _message = inject(FsMessage);


  public data = null;
  constructor() {
    const _store = this._store;

    _store.observe('data')
      .subscribe((store) => {
        this.data = store.value;
      });
  }

  public clear() {
    this._store.clear();
  }

  public set() {
    this._store.set('data', { name: 'John Doe' });
  }

  public remove() {
    this._store.remove('data');
  }

  public get() {
    this._message.info(JSON.stringify(this._store.get('data')));
  }
}
