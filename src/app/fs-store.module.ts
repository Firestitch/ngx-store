import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsStore } from './services/store.service';

@NgModule({
  imports: [
    CommonModule,
  ]
})
export class FsStoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsStoreModule,
      providers: [
        FsStore
      ],
    };
  }
}
