import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WebsocketService } from '../../services/websocket.service';

import { Ticket } from '../../interfaces/interface';

@Component({
  selector: 'app-escritorio',
  templateUrl: './escritorio.component.html',
  styleUrls: ['./escritorio.component.css']
})
export class EscritorioComponent implements OnInit {

  escritorio: number;

  ticket: Ticket = {};

  constructor(
    private wsService: WebsocketService,
    private activatedRoute: ActivatedRoute
  ) {

    this.escritorio = this.activatedRoute.snapshot.params['id'];

  }

  ngOnInit(): void {

    this.escucharSockets();

  }

  atenderTicket() {

    this.wsService.emit( 'atender-ticket', this.escritorio );

  }

  escucharSockets() {

    this.wsService.listen( 'atendiendo-ticket' ).subscribe( (resp: any) => this.ticket = resp.data );

  }

}
