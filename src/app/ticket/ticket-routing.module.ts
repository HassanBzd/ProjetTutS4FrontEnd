import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketListComponent} from './ticket-list/ticket-list.component';
import {TicketComponent} from './ticket.component';
import {NewTicketComponent} from './new-ticket/new-ticket.component';
import {TicketShowComponent} from './ticket-show/ticket-show.component';

const routes: Routes = [
  {
    path: '', component: TicketComponent, children: [
      {
        path: '', redirectTo: 'list', pathMatch: 'full'
      },
      {
        path: 'list', component: TicketListComponent
      },
      {
        path: 'new', component: NewTicketComponent
      },
      {
        path: 'show/:ticketId', component: TicketShowComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
