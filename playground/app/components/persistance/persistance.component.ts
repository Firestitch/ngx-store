import { Component } from '@angular/core';
import { FsExampleComponent } from '@firestitch/example';
import { FsMessage } from '@firestitch/message';
import { FsPersistanceStore } from '@firestitch/store';


@Component({
  selector: 'persistance',
  templateUrl: 'persistance.component.html',
  styleUrls: ['persistance.component.scss'],
  providers: [FsPersistanceStore]
})
export class PersistanceComponent {

  public config = {};
  public data;
  public scope;
  public storedData = {};

  constructor(
    private exampleComponent: FsExampleComponent,
    private message: FsMessage,
    private store: FsPersistanceStore,
  ) {
    this.store.setConfig(true, 'default');
  }

  public storeData() {
    if (!!this.scope) {
      this.store.saveDataToScope(this.scope, this.data);
    } else {
      this.store.save(this.data);
    }
  }

  public retrieveData() {
    this.store.restore();

    this.storedData = this.store.value;
  }

  public clear() {
    this.store.clear();
    this.retrieveData();
  }
}
