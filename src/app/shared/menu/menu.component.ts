import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService} from '@auth0/auth0-angular';
import {UserService} from 'src/app/shared/service/user.service';
import {WebsocketService} from 'src/app/shared/service/websocket.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private userService: UserService,
              private websocketService: WebsocketService) {}

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
  logout(): void{
    this.authService.logout();
  }
}
