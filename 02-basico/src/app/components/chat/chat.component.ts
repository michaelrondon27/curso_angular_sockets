import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  elemento: HTMLElement;

  mensajes: any[] = [];

  mensajesSubscription: Subscription;

  texto = '';

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {

    this.elemento = document.getElementById('chat-mensajes');

    this.mensajesSubscription = this.chatService.getMessages().subscribe( msg => {

      this.mensajes.push( msg );

      setTimeout( () => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);

    });

  }

  enviar() {

    if ( this.texto.trim().length === 0 ) {
      return;
    }

    this.chatService.sendMessage( this.texto );

    this.texto = '';

  }

  ngOnDestroy() {

    this.mensajesSubscription.unsubscribe();

  }

}
