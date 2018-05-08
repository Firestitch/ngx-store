import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  providers: [],
})
export class FsStoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsStoreModule,
      providers: []
    };
  }
}
