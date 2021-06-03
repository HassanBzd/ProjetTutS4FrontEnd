import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatListComponent} from './chat-list/chat-list.component';

const routes: Routes = [
  {
    path: '', component: ChatListComponent
  },
  {
    path: 'list', loadChildren: () => import('./chat-list/chat-list.module').then(m => m.ChatListModule)
  },
  {
    path: 'chatTo', loadChildren: () => import('./chat-to/chat-to.module').then(m => m.ChatToModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
