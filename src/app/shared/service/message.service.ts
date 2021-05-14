import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Message} from '../model/message';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageURL = environment.baseURL + 'message/';

  constructor(private httpClient: HttpClient) {
  }

  send(message: Message): Observable<object> {
    return this.httpClient.post(this.messageURL + 'send', message);
  }
  getMessageWithUser(userId: string): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.messageURL + 'chatWithUser/' + userId);
  }
}
