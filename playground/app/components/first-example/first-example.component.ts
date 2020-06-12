import { Component } from '@angular/core';
import { FsStore } from '@firestitch/store';
import { FsMessage } from '@firestitch/message';


@Component({
  selector: 'first-example',
  templateUrl: 'first-example.component.html'
})
export class FirstExampleComponent {

  public data = null;
  constructor(private _store: FsStore,
              private _message: FsMessage) {
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
