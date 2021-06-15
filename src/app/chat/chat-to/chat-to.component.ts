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

  messageToSend: GroupMessage = {datetimeSent: new Date()};
  chatMessages: GroupMessage[] = [];
  showEmojiPicker = false;

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
    console.log(this.userId);
  }

  refreshMessages(): void {
    console.log('refresh messages in component');
    this.chatService.getGroup(this.chatService.currentGroupId).subscribe(
    group => {
      this.userService.getUserList().subscribe(users => {
        const fullUsers: User[] = [];
        users.forEach(user => {
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
    console.log(this.messageToSend);
    const { messageToSend } = this;
    console.log(messageToSend);
    console.log(`${event.emoji.native}`);
    this.messageToSend.message = `${messageToSend}${event.emoji.native}`;
    // this.showEmojiPicker = false;
  }
  addMember(): void {

  }
  getSenderName(senderId: string | undefined): string {
    return this.group.fullUsers.find(user => this.userService.parseUserId(user) === senderId)?.name ?? ' ';
  }
}
