import { FsStore } from './fsstore.service';
import { HttpClientModule } from '@angular/common/http';

import { JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

export * from './fsstore.service';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
declarations: [    
],
providers: [
  FsStore
],
exports: [
  
]
})
export class FsStoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsStoreModule,
      providers: [FsStore]
    };
  }
}
