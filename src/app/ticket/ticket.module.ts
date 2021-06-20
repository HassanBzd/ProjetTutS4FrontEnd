import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { TicketComponent } from './ticket.component';
import {TicketRoutingModule} from './ticket-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import { TicketShowComponent } from './ticket-show/ticket-show.component';
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    TicketListComponent,
    NewTicketComponent,
    TicketComponent,
    TicketShowComponent,
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    FormsModule,
    MatListModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class TicketModule { }
