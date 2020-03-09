import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Ventas' },
  ];

  public lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.getData();

  }

  getData() {

    this.http.get('http://localhost:5000/grafica').subscribe( (data: any) => this.lineChartData = data );

  }

}
