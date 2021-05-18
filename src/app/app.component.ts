import {Component, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {UserService} from './shared/service/user.service';
import {WebsocketService} from './shared/service/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private websocketService: WebsocketService
  ) {
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated$) {
      this.userService.fetchUser().subscribe(
        _ => this.websocketService.connect().then(() => console.log('connected')).catch((reason) => console.log(reason))
      );
    }
  }

  login(): void {
    this.authService.loginWithRedirect();
  }
}
