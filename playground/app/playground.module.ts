import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsStoreModule } from '@firestitch/store';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FirstExampleComponent } from './components/first-example/first-example.component';
import { PersistanceComponent } from './components/persistance/persistance.component';
import { AppMaterialModule } from './material.module';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    RouterModule.forRoot([], {}),
    FsExampleModule.forRoot(),
    FsStoreModule.forRoot(),
    FsMessageModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    FirstExampleComponent,
    PersistanceComponent,
  ]
})
export class PlaygroundModule {
}
