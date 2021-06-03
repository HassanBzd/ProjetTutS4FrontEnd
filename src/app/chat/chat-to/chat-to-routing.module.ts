import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatToComponent} from './chat-to.component';
const routes: Routes = [

  {
      path: ':id', component: ChatToComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatToRoutingModule { }
