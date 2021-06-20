import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MessageService} from './message.service';
import {UserService} from './user.service';
import {UpdateStatusDto} from "../model/updateStatusDto";
import {ChatService} from "./chat.service";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private chatService: ChatService
  ) { }

  private stompClient: Stomp.Client | undefined;

  public async connect(): Promise<void> {
    return new Promise<void>((resolve, error) => {
      if (!this.stompClient) {
        const ws = new SockJS(environment.baseURL + 'ws');
        this.stompClient = Stomp.over(ws);
        this.stompClient.connect({ login: this.userService.getCurrentUserId() }, () => {
          // Update des messages
          this.stompClient?.subscribe('/user/updateMessages', (message: Stomp.Message) => {
            this.messageService.updateWithUserMessage();
          });
          // Update groupList
          this.stompClient?.subscribe('/user/updateGroups', (message: Stomp.Message) => {
            console.log('refresh groups');
            this.chatService.fetchGroupsWithUser().subscribe();
          });
          // Update status
          this.stompClient?.subscribe('/updateStatus', (message: Stomp.Message) => {
            const dto: UpdateStatusDto = JSON.parse(message.body);
            this.userService.updateStatus(dto);
          });
          resolve();
        }, error);
      } else {
        resolve();
      }
    });
  }
}
