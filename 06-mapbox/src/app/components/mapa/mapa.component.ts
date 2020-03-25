import { Component, OnInit } from '@angular/core';

import { Lugar } from '../../interfaces/interfaces';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  lugares: Lugar[] = [
    {
      id: '1',
      nombre: 'Fernando',
      lng: -75.75512993582937,
      lat: 45.349977429009954,
      color: '#dd8fee'
    },
    {
      id: '2',
      nombre: 'Amy',
      lng: -75.75195645527508,
      lat: 45.351584045823756,
      color: '#790af0'
    },
    {
      id: '3',
      nombre: 'Orlando',
      lng: -75.75900589557777,
      lat: 45.34794635758547,
      color: '#19884b'
    }
  ];

  mapa: mapboxgl.Map;

  constructor() { }

  ngOnInit(): void {

    this.crearMapa();

  }

  crearMapa() {

    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibXJvbmRvbjcyIiwiYSI6ImNqeGJyNnVhYzA3MWwzeXBlaHlzc3ZleG4ifQ.TwvVQCK3WtQFEVKGdEp1kg';

    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.75512993582937, 45.349977429009954],
      zoom: 15.8
    });

    for ( const marcador of this.lugares ) {

      this.agregarMarcador( marcador );

    }

  }

  agregarMarcador( marcador: Lugar ) {

    const html = `<h2>${ marcador.nombre }</h2>
                  <br>
                  <button>Borrar</button>`;

    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setHTML( html );

    const marker = new mapboxgl.Marker({
      draggable: true,
      color: marcador.color
    })
    .setLngLat([marcador.lng, marcador.lat])
    .setPopup( customPopup )
    .addTo( this.mapa );

  }

}
