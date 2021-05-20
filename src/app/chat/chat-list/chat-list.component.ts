import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/model/user';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  users: User[] = [
    {id: '117079709829071830908', name: 'thomas', status:'busy'},
    {id: '111585999933138857542', name: 'badr', status:'online'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
