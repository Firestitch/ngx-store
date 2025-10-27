import { Component, inject } from '@angular/core';
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
  private exampleComponent = inject(FsExampleComponent);
  private message = inject(FsMessage);
  private store = inject(FsPersistanceStore);


  public config = {};
  public data;
  public scope;
  public storedData = {};

  constructor() {
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
