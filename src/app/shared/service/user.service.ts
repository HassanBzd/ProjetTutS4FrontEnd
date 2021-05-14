import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '@auth0/auth0-angular';
import {User} from '@auth0/auth0-spa-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private authService: AuthService) { }



  /*getUserList(): Observable<User[]> {
    this.
  }*/
}
