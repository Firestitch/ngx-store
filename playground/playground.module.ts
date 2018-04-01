import './../tools/assets/playground.scss';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FsStoreModule, FsStore } from '../src';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app/material.module';
import { FsExampleModule } from '@firestitch/example';
import { FsExamplesComponent } from '../tools/components/examples/examples.component';
import { FirstExampleComponent } from './app/components/first-example/first-example.component';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsStoreModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsExampleModule,
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    FirstExampleComponent,
    FsExamplesComponent
  ],
  providers: [
    FsStore
  ],
})
export class PlaygroundModule {
}
