import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { FsExampleModule } from '@firestitch/example';
import { FsStoreModule } from '@firestitch/store';
import { FsMessageModule } from '@firestitch/message';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, FsExampleModule.forRoot(), FsStoreModule.forRoot(), FsMessageModule.forRoot()),
        provideAnimations(),
        provideRouter([])
    ]
})
  .catch(err => console.error(err));

