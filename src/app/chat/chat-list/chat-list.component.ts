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

  groups: Group[] = [];

  constructor(private userService: UserService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getGroupsWithUser().subscribe(groups => {
      this.groups = groups;
    });
  }

  changeCurrentUser(group: Group): void {
    this.chatService.setCurrentGroupId(group.grpId);
    this.chatService.isChatting = true;
  }

  isSelectedGroup(group: Group): boolean {
    return this.chatService.currentGroupId === group.grpId;
  }

  // TODO: move
  getUserStatus(user: User): string {
    console.log(this.userService.getUserStatus(user));
    return this.userService.getUserStatus(user);
  }
  newChat(): void {
    this.chatService.isChatting = false;
  }
}
