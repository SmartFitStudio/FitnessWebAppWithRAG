import { Component, Input } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
@Component({
  selector: 'app-mono-line-graph',
  standalone: true,
  imports: [AgChartsAngular],
  templateUrl: './mono-line-graph.component.html',
  styleUrl: './mono-line-graph.component.scss'
})
export class MonoLineGraphComponent {
  public chartOptions!: AgChartOptions;

  @Input() xName!: string;
  @Input() yName!: string;

  @Input()
  set graphData(value: {
    xAxesValue: Date,
    YAxesValue: number,
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
          yKey: 'YAxesValue',
          xName: this.xName,  // Nome assegnato alla serie x
          yName: this.yName,  // Nome assegnato alla seconda serie y
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
