import { Injectable } from '@angular/core';
import {AuthService as OAuthService} from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: OAuthService
  ) { }

  login(): void {
    this.auth.loginWithRedirect();
  }
}
