import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { firebaseConfig } from 'environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoadingInterceptor } from './modules/home/pages/dashboard/interceptors/loading.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      NgxSpinnerModule,
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore())
    ),
    NgxSpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
};
