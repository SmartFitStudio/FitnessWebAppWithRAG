import { Component, Input } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
@Component({
  selector: 'app-multi-line-graph',
  standalone: true,
  imports: [AgChartsAngular],
  templateUrl: './multi-line-graph.component.html',
  styleUrl: './multi-line-graph.component.scss'
})
export class MultiLineGraphComponent {
  public chartOptions!: AgChartOptions;

  @Input() x1Name!: string;
  @Input() y1Name!: string;

  @Input() x2Name!: string;
  @Input() y2Name!: string;

  @Input()
  set graphData(value: {
    xAxesValue: Date,
    FirstYAxesValue: number,
    SecondYAxesValue?: number,
  }[]) {
    this.chartOptions = {
      title: {
        text: "",
      },
      data: value,
      axes: [
        {
          type: "time",
          position: "bottom",
          nice: false,
          label: {
            format: "%d/%m/%Y",
          },
        },
        {
          type: "number",
          position: "left",
        },
      ],
      
      series: [
        {
          type: "line",
          xKey: 'xAxesValue',
          yKey: 'FirstYAxesValue',
          xName: this.x1Name,  // Nome assegnato alla serie x
          yName: this.y1Name,  // Nome assegnato alla prima serie y
          marker: {
            stroke: '#fd6384',
            fillOpacity: 0.9,
            fill: '#fd6384',
        },
        },
        {
          type: "line",
          xKey: 'xAxesValue',
          yKey: 'SecondYAxesValue',
          xName: this.x2Name,  // Nome assegnato alla serie x
          yName: this.y2Name,  // Nome assegnato alla seconda serie y
          marker: {
            stroke: '#ffcb62',
            fillOpacity: 0.5,
            fill: '#ffcb62',
        },
        },
        
      ],
      background: {
        fill: '#f5f5f3',
      },
    };
  }
  
}
