import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../shared/service/message.service';
import {Message} from '../../shared/model/message';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../shared/service/user.service';

@Component({
  selector: 'app-chat-to',
  templateUrl: './chat-to.component.html',
  styleUrls: ['./chat-to.component.scss']
})
export class ChatToComponent implements OnInit {
  userId = this.userService.getCurrentUserId();
  messageToSend = '';
  chatMessages: Message[] = [];
  name = '';
  receiverId = '';
  senderId = '';
  date!: Date;
  timeStamp: Date = new Date();
  showEmojiPicker = false;
  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router
  ) {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
   }

  ngOnInit(): void {
    // Verify that id are set
    const tempReceiver = this.route.snapshot.paramMap.get('id');
    if (!tempReceiver) {
      console.log('TODO: erreur', tempReceiver);
      return;
    }
    this.userService.getUserList().subscribe(
      users => users?.forEach((user) => {
        if (this.receiverId === this.userService.parseUserId(user)) {
          this.name = user.name ?? '';
        }
      }));
    this.receiverId = tempReceiver;
    this.senderId = this.userService.getCurrentUserId();
    this.refreshMessages();

    this.messageService.currentComponent = this;

    this.timeStamp = this.date;
  }

refreshMessages(): void {
    this.messageService.getMessageWithUser(this.receiverId).subscribe(
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

send(): void {
    // Send message
    const message: Message = {
      message: this.messageToSend,
      receiverId: this.receiverId,
      senderId: this.senderId,
      datetimeSent: new Date()
    };
    this.messageService.send(message).subscribe();
    this.messageToSend = '';
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
    this.messageToSend = `${messageToSend}${event.emoji.native}`;
    // this.showEmojiPicker = false;
  }

}
