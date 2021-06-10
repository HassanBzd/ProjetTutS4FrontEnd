import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatListComponent} from './chat-list/chat-list.component';
import {ChatToComponent} from './chat-to/chat-to.component';

const routes: Routes = [
  {
    path: '', component: ChatListComponent
  },
  {
    path: 'list', component: ChatListComponent
  },
  {
    path: 'chatTo/:id', component: ChatToComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
