import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideToastr } from 'ngx-toastr';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
const firebaseConfig = {
  apiKey: 'AIzaSyB6KZsQjFg9HSJZr302N0XtbkQdKqX_HJs',
  authDomain: 'dbschool-a8cf8.firebaseapp.com',
  projectId: 'dbschool-a8cf8',
  storageBucket: 'dbschool-a8cf8.appspot.com',
  messagingSenderId: '573412851059',
  appId: '1:573412851059:web:38a8f50042086c096c5906',
  measurementId: 'G-WR9HERDFEN',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAnimations(),
    provideFirestore(() => getFirestore()),
    provideToastr(),

    provideClientHydration(),
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig },
    provideAnimationsAsync(),
  ],
};
