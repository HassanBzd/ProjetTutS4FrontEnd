import { Injectable } from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {User} from '@auth0/auth0-spa-js';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: User | null | undefined;

  constructor(private authService: AuthService) { }

  getCurrentUserId(): string {
    if (!this.currentUser) {
      console.log('current User null'); // TODO
      return '';
    }
    return this.currentUser?.sub?.split('|')[1] ?? '';
  }
  fetchUser(): Observable<User | null | undefined> {
    return this.authService.user$.pipe(map((user: User | null | undefined) => this.currentUser = user));
  }
  getUserList(): Observable<User[] | null | undefined> {
    //return
  }
}
