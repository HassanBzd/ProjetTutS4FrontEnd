import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AuthModule as OAuthModule} from '@auth0/auth0-angular';
import {AuthModule} from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot({
      domain: 'dev-qzfc4ny.eu.auth0.com',
      clientId: 'kfVJre1y5dvwjy6JWDzYmN1hAhF1HMmr'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
