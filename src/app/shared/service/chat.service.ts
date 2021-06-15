import { Injectable } from '@angular/core';
import {ChatToComponent} from '../../chat/chat-to/chat-to.component';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '@auth0/auth0-spa-js';
import {UserService} from './user.service';
import {Group} from '../model/group';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private groupURL = environment.baseURL + 'group/';

  currentGroupId = -1;
  currentComponent: ChatToComponent | undefined;
  isChatting = true;

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  setCurrentGroupId(grpId: number | undefined): void {
    this.currentGroupId = grpId ?? -1;
    console.log(this.currentComponent);
    this.currentComponent?.refreshMessages();
  }

  createChat(users: User[]): Observable<object> {
    const userList: string[] = [];
    users.forEach(user => userList.push(this.userService.parseUserId(user)));
    return this.httpClient.post(this.groupURL + 'create', userList);
  }

  getGroupsWithUser(): Observable<Group[]> {
    return this.httpClient.get<Group[]>(this.groupURL + 'getGroupsWithUser/' + this.userService.getCurrentUserId());
  }
  getGroup(grpId: number): Observable<Group> {
    return this.httpClient.get<Group>(this.groupURL + 'getGroup/' + grpId);
  }
}
