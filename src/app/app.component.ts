import { Component } from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {UserService} from "./shared/service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  login(): void {
    this.authService.loginWithRedirect();
  }
}
