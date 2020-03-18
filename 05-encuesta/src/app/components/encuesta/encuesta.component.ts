import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] }
  };

  public barChartLabels: Label[] = ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4'];

  public barChartType: ChartType = 'bar';

  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    {data: [ 65, 59, 80, 81 ], label: 'Entrevistados'}
  ];

  constructor(
    private http: HttpClient,
    public wsService: WebsocketService
  ) { }

  ngOnInit(): void {

    this.http.get('http://localhost:5000/grafica').subscribe( (data: any) => this.barChartData = data );

    this.escucharSocket();

  }

  escucharSocket() {

    this.wsService.listen('cambio-grafica').subscribe( (data: any) => this.barChartData = data );

  }

}
