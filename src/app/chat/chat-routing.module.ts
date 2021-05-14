import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatComponent} from './chat.component';
import {ChatToComponent} from './chat-to/chat-to.component';
import {ChatListComponent} from './chat-list/chat-list.component';

const routes: Routes = [
  {
    path: '', component: ChatComponent, children: [
      {
        path: 'chatTo/:id', component: ChatToComponent
      },
      {
        path: 'list', component: ChatListComponent
      },
      {
        path: '', redirectTo: 'list', pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
