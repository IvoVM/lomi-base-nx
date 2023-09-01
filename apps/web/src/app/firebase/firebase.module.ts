import { NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from 'environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers:[
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore())
    )
  ]
})
export class FirebaseModule { }
