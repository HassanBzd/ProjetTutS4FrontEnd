import { Component, OnInit } from '@angular/core';
import {Ticket} from '../../shared/model/ticket';
import {TicketService} from '../../shared/service/ticket.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent implements OnInit {

  public ticket: Ticket = { datetimeSent: new Date() };

  constructor(private ticketService: TicketService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.ticketService.create(this.ticket).subscribe(_ => {
      this.router.navigate(['/ticket/list']);
    });
  }
}
