import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../shared/service/message.service';
import {Message} from '../../shared/model/message';
import {Router} from '@angular/router';
import {UserService} from '../../shared/service/user.service';
import {ChatService} from '../../shared/service/chat.service';
import {User} from '@auth0/auth0-spa-js';

@Component({
  selector: 'app-chat-to',
  templateUrl: './chat-to.component.html',
  styleUrls: ['./chat-to.component.scss']
})
export class ChatToComponent implements OnInit {
  userId = this.userService.getCurrentUserId();

  messageToSend: Message = {datetimeSent: new Date()};
  chatMessages: Message[] = [];
  receiver: User = {};

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
  }

refreshMessages(): void {
  // Find receiver
  this.userService.getUserList().subscribe(
    users => users?.forEach((user) => {
      if (this.chatService.currentUserId === this.userService.parseUserId(user)) {
        this.receiver = user;
        this.messageToSend.senderId = this.userService.getCurrentUserId();
        this.messageToSend.receiverId = this.chatService.currentUserId;

        // Find messages
        this.messageService.getMessageWithUser(this.userService.parseUserId(this.receiver)).subscribe(
          messages => {
            console.log(messages);
            this.chatMessages = messages;
            this.chatMessages.forEach(message => message.datetimeSent = new Date(message.datetimeSent));
            this.chatMessages.sort((a: Message, b: Message) => {
              return a.datetimeSent.getTime() - b.datetimeSent.getTime();
            });
          }
        );
      }
    }));
  }

send(): void {
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

}
