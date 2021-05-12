import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'ProjetTutS4FrontEnd';

  public isLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login();
  }
}
