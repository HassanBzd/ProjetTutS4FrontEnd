import { Component, OnInit } from '@angular/core';
import {User} from '@auth0/auth0-spa-js';
import {UserService} from '../../shared/service/user.service';
import {ChatService} from '../../shared/service/chat.service';
import {Group} from '../../shared/model/group';

@Component({
  selector: 'app-chat-new',
  templateUrl: './chat-new.component.html',
  styleUrls: ['./chat-new.component.scss']
})
export class ChatNewComponent implements OnInit {

  selectedUser: User | undefined;
  selectedUsers: User[] = [];
  availableUsers: User[] = [];

  constructor(private userService: UserService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.availableUsers = this.userService.usersList.filter(user =>
      this.userService.parseUserId(user) !== this.userService.getCurrentUserId()
    );
  }
  addSelectedUser(): void {
    if (this.selectedUser) {
      this.selectedUsers.push(this.selectedUser);
      this.availableUsers = this.availableUsers.filter(user => user !== this.selectedUser);
      this.selectedUser = undefined;
    }
  }
  create(): void {
    this.chatService.createChat(this.selectedUsers).subscribe(
      (group: Group) => {
        this.chatService.setCurrentGroupId(group.grpId);
        this.chatService.isChatting = true;
      } );
  }
}
