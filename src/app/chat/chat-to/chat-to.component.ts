import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../shared/service/message.service';
import {GroupMessage} from '../../shared/model/groupMessage';
import {Router} from '@angular/router';
import {UserService} from '../../shared/service/user.service';
import {ChatService} from '../../shared/service/chat.service';
import {User} from '@auth0/auth0-spa-js';
import {Group} from '../../shared/model/group';

@Component({
  selector: 'app-chat-to',
  templateUrl: './chat-to.component.html',
  styleUrls: ['./chat-to.component.scss']
})
export class ChatToComponent implements OnInit {
  group: Group = {users: [], fullUsers: []};
  userId = this.userService.getCurrentUserId();

  messageToSend: GroupMessage = {datetimeSent: new Date(), message: ''};
  chatMessages: GroupMessage[] = [];
  showEmojiPicker = false;

  selectedUser: User | undefined;

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private router: Router,
    private chatService: ChatService
  ) {
   }

  ngOnInit(): void {
    this.messageService.currentComponent = this;
    this.chatService.currentComponent = this;
    if (this.chatService.currentGroupId !== -1) {
      this.refreshMessages();
    }
  }

  refreshMessages(): void {
    console.log('refresh messages in component');
    this.chatService.getGroup(this.chatService.currentGroupId).subscribe(
    group => {
      const fullUsers: User[] = [];
      this.userService.usersList.forEach(user => {
        this.userService.parseUserId(user);
        group.users.forEach(chatUser => {
          if (chatUser.user === this.userService.parseUserId(user)) {
            fullUsers.push(user);
          }
        });
      });
      this.group = group;
      if (!this.group.grpId) {
        return;
      }
      // Find messages
      this.messageService.getMessageInGroup(this.group.grpId).subscribe(
        messages => {
          messages.forEach(message => message.datetimeSent = new Date(message.datetimeSent));
          messages.sort((a: GroupMessage, b: GroupMessage) => {
            return a.datetimeSent.getTime() - b.datetimeSent.getTime();
          });
          this.chatMessages = messages;
        }
      );
      this.group.fullUsers = fullUsers;
    });
  }

  send(): void {
    this.messageToSend.senderId = this.userId;
    this.messageToSend.groupId = this.chatService.currentGroupId;
    this.messageToSend.datetimeSent = new Date();
    this.messageService.send(this.messageToSend).subscribe(() => this.messageToSend.message = '');
  }

  toggleEmojiPicker(): void {
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any): void {
    this.messageToSend.message += event.emoji.native;
    // this.showEmojiPicker = false;
  }

  get isOwner(): boolean {
    // console.log(this.userId, this.group.owner?.user, this.userId === this.group.owner?.user);
    return this.userId === this.group.owner?.user;
  }
  get availableUsers(): User[] {
    const res: User[] = [];
    this.userService.usersList.forEach(user => {
      let found = false;
      const userId = this.userService.parseUserId(user);
      this.group.users.forEach(chatUser => {
        if (chatUser.user === userId) {
          found = true;
        }
      });
      // Si l'utilisateur n'est pas dans le groupe (found) et si il n'est pas séléctionné (selectedUser)
      if (!found) {
        res.push(user);
      }
    });
    return res;
  }
  addMember(): void {
    if (!this.selectedUser) {
      return;
    }
    this.chatService.addUserToGroup(this.userService.parseUserId(this.selectedUser)).subscribe(_ => {
      this.selectedUser = undefined;
      this.refreshMessages();
    });
  }
  deleteMember(user: User): void {
    this.chatService.removeUserFromGroup(this.userService.parseUserId(user)).subscribe(_ => {
      this.refreshMessages();
    });
  }
  getSenderName(senderId: string | undefined): string {
    return this.userService.usersList.find(user => this.userService.parseUserId(user) === senderId)?.name ?? ' ';
  }
  getUserStatus(user: User): string {
    return this.userService.getUserStatus(user);
  }
}
