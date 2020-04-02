import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Ticket } from '../../interfaces/interface';

import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.css']
})
export class PublicoComponent implements OnInit, OnDestroy {

  body = document.getElementsByTagName('body')[0];

  tickets: Ticket[] = [];

  constructor(
    private http: HttpClient,
    private wsService: WebsocketService
  ) { }

  ngOnInit(): void {

    this.body.classList.remove('container');

    this.getUltimosCuatro();

    this.escucharSockets();

  }

  escucharSockets() {

    this.wsService.listen( 'ultimos-cuatro' ).subscribe( (resp: any) => this.tickets = resp.data );

  }

  getUltimosCuatro() {

    this.http.get( environment.socketConfig.url + '/ultimos-cuatro' ).subscribe( (resp: any) => this.tickets = resp.data );

  }

  ngOnDestroy() {

    this.body.classList.add('container');

  }

}
