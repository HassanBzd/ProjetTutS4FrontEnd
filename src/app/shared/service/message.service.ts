import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {GroupMessage} from '../model/groupMessage';
import {Observable} from 'rxjs';
import {ChatToComponent} from '../../chat/chat-to/chat-to.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageURL = environment.baseURL + 'message/';

  currentComponent: ChatToComponent | undefined;

  constructor(
    private httpClient: HttpClient
  ) { }

  send(message: GroupMessage): Observable<object> {
    return this.httpClient.post(this.messageURL + 'send', message);
  }
  getMessageInGroup(groupId: number): Observable<GroupMessage[]> {
    return this.httpClient.get<GroupMessage[]>(this.messageURL + 'messagesInGroup/' + groupId);
  }
  // Update messages
  updateWithUserMessage(): void {
    // console.log('refresh messages in service', this.currentComponent);
    this.currentComponent?.refreshMessages();
  }
}
