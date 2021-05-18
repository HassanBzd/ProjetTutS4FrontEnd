import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../shared/service/message.service';
import {Message} from '../../shared/model/message';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '@auth0/auth0-angular';
import {UserService} from "../../shared/service/user.service";

@Component({
  selector: 'app-chat-to',
  templateUrl: './chat-to.component.html',
  styleUrls: ['./chat-to.component.scss']
})
export class ChatToComponent implements OnInit {
  messageToSend = '';
  chatMessages: Message[] = [];
  receiverId = '';
  senderId = '';

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Verify that id are set
    const tempReceiver = this.route.snapshot.paramMap.get('id');
    if (!tempReceiver) {
      console.log('TODO: erreur', tempReceiver);
      return;
    }
    this.receiverId = tempReceiver;
    this.senderId = this.userService.getCurrentUserId();

    this.refreshMessages();

    this.messageService.currentRefreshCallback = this.refreshMessages;
  }

  refreshMessages(): void {
    this.messageService.getMessageWithUser(this.receiverId).subscribe(
      messages => {this.chatMessages = messages; console.log(messages); }
    );
  }

  send(): void {
    // Send message
    const message: Message = {
      message: this.messageToSend,
      receiverId: this.receiverId,
      senderId: this.senderId
    };
    this.messageService.send(message).subscribe();
  }
}
