import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService as OAuthService} from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public clientId = 'kfVJre1y5dvwjy6JWDzYmN1hAhF1HMmr';
  public clientSecret = 'WqK3DJ-a5NCdL5qukpNXL3DEw7Tr1kZv2S0Jr48pTRlaa44VZHLyOZFYFM1kzDHr';
  public redirectUri = 'http://localhost:8081/';

  constructor(
    private httpClient: HttpClient,
    private auth: OAuthService
  ) { }

  login(): void {
    this.auth.loginWithRedirect();
  }
}
