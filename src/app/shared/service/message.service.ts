import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageURL = environment.baseURL + 'message/';

  constructor(private httpClient: HttpClient) {
  }

  send(message: string): void {
    const testMessge = {
      senderId: '1',
      receiverId: '2',
      message: 'Premier message trop bien'
    };
    this.httpClient.post(this.messageURL + 'send', testMessge).subscribe();
  }
}
