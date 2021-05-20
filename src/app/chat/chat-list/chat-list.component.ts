import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/service/user.service';
import {User} from '@auth0/auth0-spa-js';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  users: User[] | null | undefined = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserList().subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }
  getUserId(user: User): string {
    return this.userService.parseUserId(user);
  }

}
