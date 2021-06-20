import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/service/user.service';
import {User} from '@auth0/auth0-spa-js';
import {ChatService} from '../../shared/service/chat.service';
import {Group} from '../../shared/model/group';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  constructor(private userService: UserService, public chatService: ChatService) { }

  ngOnInit(): void {
  }

  changeCurrentUser(group: Group): void {
    this.chatService.setCurrentGroupId(group.grpId);
    this.chatService.isChatting = true;
  }

  isSelectedGroup(group: Group): boolean {
    return this.chatService.currentGroupId === group.grpId;
  }

  newChat(): void {
    this.chatService.isChatting = false;
  }

  getGroupName(group: Group): string {
    let name = '';
    this.userService.usersList.forEach(user => {
      this.userService.parseUserId(user);
      group.users.forEach(chatUser => {
        if (chatUser.user === this.userService.parseUserId(user) && chatUser.user !== this.userService.getCurrentUserId()) {
          name += user.name + '; ';
        }
      });
    });
    return name.substring(0, name.length - 2); // On enlève le dernier '; '
  }
}
