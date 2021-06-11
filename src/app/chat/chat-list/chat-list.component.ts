import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/service/user.service';
import {User} from '@auth0/auth0-spa-js';
import {ChatService} from '../../shared/service/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.userService.getUserList().subscribe(users => {
      this.users = users.filter(user => this.userService.parseUserId(user) !== this.userService.getCurrentUserId());
    });
  }

  changeCurrentUser(user: User): void {
    this.chatService.setCurrentUserId(this.userService.parseUserId(user));
  }

  isSelectedUser(user: User): boolean {
    return this.chatService.currentUserId === this.userService.parseUserId(user);
  }
  getUserStatus(user: User): string {
    console.log(this.userService.getUserStatus(user));
    return this.userService.getUserStatus(user);
  }
}
