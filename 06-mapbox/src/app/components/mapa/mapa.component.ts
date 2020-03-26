import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { WebsocketService } from '../../services/websocket.service';
import { Lugar } from '../../interfaces/interfaces';

import * as mapboxgl from 'mapbox-gl';

interface RespMarcadores {
  [ket: string]: Lugar;
}

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  lugares: RespMarcadores = {};

  mapa: mapboxgl.Map;

  constructor(
    private http: HttpClient,
    private wsService: WebsocketService
  ) { }

  ngOnInit(): void {

    this.http.get<RespMarcadores>('http://localhost:5000/mapa').subscribe( lugares => {

      this.lugares = lugares;

      this.crearMapa();

    });

    this.escucharSockets();

  }

  escucharSockets() {

    // marcador-nuevo
    this.wsService.listen( 'marcador-nuevo' ).subscribe( (marcador: Lugar) => {

      this.agregarMarcador( marcador );

    });

    // marcador-mover

    // marcador-borrar

  }

  crearMapa() {

    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibXJvbmRvbjcyIiwiYSI6ImNqeGJyNnVhYzA3MWwzeXBlaHlzc3ZleG4ifQ.TwvVQCK3WtQFEVKGdEp1kg';

    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.75512993582937, 45.349977429009954],
      zoom: 15.8
    });

    for ( const [id, marcador] of Object.entries(this.lugares) ) {

      this.agregarMarcador( marcador );

    }

  }

  agregarMarcador( marcador: Lugar ) {

    const h2 = document.createElement('h2');
    h2.innerText = marcador.nombre;

    const btnBorrar = document.createElement('button');
    btnBorrar.innerText = 'Borrar';

    const div = document.createElement('div');
    div.append( h2, btnBorrar );

    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setDOMContent( div );

    const marker = new mapboxgl.Marker({
      draggable: true,
      color: marcador.color
    })
    .setLngLat([marcador.lng, marcador.lat])
    .setPopup( customPopup )
    .addTo( this.mapa );

    marker.on('drag', () => {

      const lngLat = marker.getLngLat();

      console.log(lngLat);

      // TODO: crear evento para emitir las coordenadas de este marcador

    });

    btnBorrar.addEventListener('click', () => {

      marker.remove();

      // TODO: Eliminar el marcador mediante sockets

    });

  }

  crearMarcador() {

    const customMarker: Lugar =  {
      id: new Date().toISOString(),
      lng: -75.75512993582937,
      lat: 45.349977429009954,
      nombre: 'Sin nombre',
      color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    };

    this.agregarMarcador( customMarker );

    // emitir marcador-nuevo
    this.wsService.emit( 'marcador-nuevo', customMarker );

  }

}
