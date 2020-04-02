import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.css']
})
export class PublicoComponent implements OnInit, OnDestroy {

  body = document.getElementsByTagName('body')[0];

  constructor() { }

  ngOnInit(): void {

    this.body.classList.remove('container');

  }

  ngOnDestroy() {

    this.body.classList.add('container');

  }

}
