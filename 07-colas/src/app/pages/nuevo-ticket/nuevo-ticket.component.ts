import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { WebsocketService } from '../../services/websocket.service';

import { UltimoTicket } from '../../interfaces/interface';

@Component({
  selector: 'app-nuevo-ticket',
  templateUrl: './nuevo-ticket.component.html',
  styleUrls: ['./nuevo-ticket.component.css']
})
export class NuevoTicketComponent implements OnInit {

  loading: boolean = false;

  ticket: UltimoTicket = {};

  constructor(
    private http: HttpClient,
    private wsService: WebsocketService
  ) { }

  ngOnInit(): void {

    this.getUltimoTicket();

    this.escucharSockets();

  }

  escucharSockets() {

    this.wsService.listen( 'ultimo-ticket' ).subscribe( (resp: any) => this.ticket = resp.data );

  }

  generarTicket() {

    this.wsService.emit( 'generar-nuevo-ticket' );

  }

  getUltimoTicket() {

    this.loading = true;

    this.http.get<UltimoTicket>( environment.socketConfig.url + '/ultimo-ticket' ).subscribe( (resp: any) => {

      this.loading = false;

      this.ticket = resp.data;

    });

  }

}
