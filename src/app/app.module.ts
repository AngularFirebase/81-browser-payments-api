import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';


// Firebase setup instructions

// 1. delete this line, then...
import { firebaseConfig } from '../env';
import { PaymentRequestComponent } from './payment-request/payment-request.component'; 

// 2. Add your own firebase config to environment.ts
// 3. Then use it to initialize angularfire2 below, like so AngularFireModule.initializeApp(environment.firebaseConfig),

import { PaymentService } from './payment.service';

@NgModule({
  declarations: [
    AppComponent,
    PaymentRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
