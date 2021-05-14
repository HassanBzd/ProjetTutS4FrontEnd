import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/model/user';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  users: User[] = [
    {id: 6, name: 'thomas'},
    {id: 58, name: 'badr'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
