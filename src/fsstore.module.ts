import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsStore } from './services';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  entryComponents: [
  ],
  declarations: [
  ],
  providers: [
    FsStore
  ],
})
export class FsStoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsStoreModule,
      providers: [FsStore]
    };
  }
}
