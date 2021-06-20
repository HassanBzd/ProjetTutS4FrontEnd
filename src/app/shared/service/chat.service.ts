import { Injectable } from '@angular/core';
import {ChatToComponent} from '../../chat/chat-to/chat-to.component';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '@auth0/auth0-spa-js';
import {UserService} from './user.service';
import {Group} from '../model/group';
import {AddRemoveUserToGroupDto} from '../model/addRemoveUserToGroupDto';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private groupURL = environment.baseURL + 'group/';

  currentGroupId = -1;
  currentComponent: ChatToComponent | undefined;
  isChatting = true;

  groups: Group[] = [];

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  setCurrentGroupId(grpId: number | undefined): void {
    this.currentGroupId = grpId ?? -1;
    this.currentComponent?.refreshMessages();
  }

  createChat(users: User[]): Observable<Group> {
    const userList: string[] = [];
    users.forEach(user => userList.push(this.userService.parseUserId(user)));
    return this.httpClient.post<Group>(this.groupURL + 'create', userList);
  }

  fetchGroupsWithUser(): Observable<Group[]> {
    return this.httpClient.get<Group[]>(this.groupURL + 'getGroupsWithUser/' + this.userService.getCurrentUserId())
      .pipe(map((groups: Group[]) => this.groups = groups));
  }


  getGroup(grpId: number): Observable<Group> {
    return this.httpClient.get<Group>(this.groupURL + 'getGroup/' + grpId);
  }
  removeUserFromGroup(userId: string): Observable<object> {
    const body: AddRemoveUserToGroupDto = {
      groupId: this.currentGroupId,
      userId
    };
    return this.httpClient.post(this.groupURL + 'removeUser', body);
  }
  addUserToGroup(userId: string): Observable<object> {
    const body: AddRemoveUserToGroupDto = {
      groupId: this.currentGroupId,
      userId
    };
    return this.httpClient.post(this.groupURL + 'addUser', body);
  }
}
