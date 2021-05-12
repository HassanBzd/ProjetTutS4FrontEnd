import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';


import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatCardModule
  ]
})
export class AuthModule { }
