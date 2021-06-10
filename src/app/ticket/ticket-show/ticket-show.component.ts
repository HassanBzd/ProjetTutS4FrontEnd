import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../shared/service/ticket.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Ticket} from "../../shared/model/ticket";

@Component({
  selector: 'app-ticket-show',
  templateUrl: './ticket-show.component.html',
  styleUrls: ['./ticket-show.component.scss']
})
export class TicketShowComponent implements OnInit {

  ticket: Ticket | undefined;

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    const ticketId = this.route.snapshot.paramMap.get('ticketId');
    if (ticketId == null) {
      this.router.navigate(['/ticket/list']);
    }
    else {
      this.ticketService.getOneTicket(Number(ticketId)).subscribe(ticket => this.ticket = ticket);
    }
  }

}
