import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsStoreModule, FsStore } from '@firestitch/store';
import { FsMessageModule } from '@firestitch/message';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './material.module';
import { FirstExampleComponent } from './components/first-example/first-example.component';
import { PersistanceComponent } from './components/persistance/persistance.component';
import { RouterModule } from '@angular/router';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
    FsExampleModule.forRoot(),
    FsStoreModule.forRoot(),
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    FirstExampleComponent,
    PersistanceComponent,
  ]
})
export class PlaygroundModule {
}
