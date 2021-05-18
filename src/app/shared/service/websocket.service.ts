import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MessageService} from './message.service';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) { }

  private stompClient: Stomp.Client | undefined;

  public async connect(): Promise<void> {
    return new Promise<void>((resolve, error) => {
      if (!this.stompClient) {
        const ws = new SockJS(environment.baseURL + 'ws');
        this.stompClient = Stomp.over(ws);
        this.stompClient.connect({ login: this.userService.getCurrentUserId() }, () => {
          // Update des messages
          this.stompClient?.subscribe('/updateMessages', (message: Stomp.Message) => {
            this.messageService.updateWithUserMessage();
          });
        }, error);
      } else {
        resolve();
      }
    });
  }
}
