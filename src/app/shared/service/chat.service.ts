import { Injectable } from '@angular/core';
import {ChatToComponent} from '../../chat/chat-to/chat-to.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUserId = '';
  currentComponent: ChatToComponent | undefined;

  constructor() { }

  setCurrentUserId(userId: string): void {
    this.currentUserId = userId;
    console.log(this.currentComponent);
    this.currentComponent?.refreshMessages();
  }
}
