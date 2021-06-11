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
  loaded = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private websocketService: WebsocketService
  ) {
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isConnected => {
      // Fetch user
      if (isConnected) {
        console.log('Already authenticated');
        this.userService.fetchUser().subscribe(
          _ => {
            console.log('user fetched', this.userService.getCurrentUserId());
            this.websocketService.connect()
              .then(
                () => {
                  // Fetch users status
                  this.userService.getAllUserStatus().subscribe(_ => {
                    // Ready to use app
                    this.loaded = true;
                    console.log('connected');
                  });
                }
              ).catch(
              (reason) => console.log(reason)
            );
          }
        );
      }
      // Authenticate
      else {
        console.log('Login');
        this.authService.loginWithRedirect();
      }
    });
  }


}
