import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { registerLicense } from '@syncfusion/ej2-base';
import { environment } from './environments/environment';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CodeInputModule } from 'angular-code-input';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HttpTokenInterceptor } from './app/services/interceptor/http-token.interceptor';
import { HttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule, CodeInputModule),
        HttpClient,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpTokenInterceptor,
            multi: true // multiple interceptors
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(), provideAnimationsAsync()
    ]
})
  .catch(err => console.error(err));

  registerLicense(environment.licenseKey);
