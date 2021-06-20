import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Ticket} from '../model/ticket';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketURL = environment.baseURL + 'ticket/';

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  create(ticket: Ticket): Observable<object> {
    ticket.senderId = this.userService.getCurrentUserId();
    return this.httpClient.post(this.ticketURL + 'create', ticket);
  }

  getTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(this.ticketURL + 'getTicketsForUser');
  }

  getOneTicket(ticketId: number): Observable<Ticket> {
    return this.httpClient.get<Ticket>(this.ticketURL + 'getTicket/' + ticketId);
  }
}
