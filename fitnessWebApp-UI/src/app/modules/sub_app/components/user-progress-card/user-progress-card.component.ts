import { Component, Inject, OnInit } from '@angular/core';

import { ProgressoResponse } from '../../../../services/models';
import { ProgressService } from '../../../../services/services/progress.service';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { MultiLineGraphComponent } from '../multi-line-graph/multi-line-graph.component';
import { calcolaPesoIdealeKg } from '../../services/functions/utilitiesForHealthStatus';
import { MessageHandler } from '../../../../services/myServices/error-handler/MessageHandler';
import {MatTabsModule} from '@angular/material/tabs';
import { MonoLineGraphComponent } from '../mono-line-graph/mono-line-graph.component';
import { ChartModule } from 'primeng/chart';
import { ProgressTableComponent } from '../progress-table/progress-table.component';

@Component({
  selector: 'app-user-progress-card',
  standalone: true,
  imports: [MultiLineGraphComponent, MatTabsModule, MonoLineGraphComponent, ChartModule, ProgressTableComponent],
  templateUrl: './user-progress-card.component.html',
  styleUrl: './user-progress-card.component.scss'
})
export class UserProgressCardComponent extends MessageHandler implements OnInit {
  data: any;
  options: any;

  private progressData: ProgressoResponse[] = [];
  private documentStyle = getComputedStyle(document.documentElement);
  private textColor = this.documentStyle.getPropertyValue('--text-color');
  private MAX_PROGRESS_TO_RETRIEVE = 10;
  private lastMassaMagraValue: number | null = null;

  constructor(private progressService: ProgressService,
    @Inject(ErrorHandlerService) handleError: ErrorHandlerService
  ) {
    super(handleError);
  }

  ngOnInit(): void {
    this.progressService.getLastNProgressi({
      N: this.MAX_PROGRESS_TO_RETRIEVE
    }).subscribe({
      next: (response) => {
        this.progressData = response;
      },
      error: (error) => {
        this.handleErrorMessages(error);
      },
      complete: () => {
        this.lastMassaMagraValue = this.progressData[0].percentualeMassaMagra;
        if (this.lastMassaMagraValue) {
          this.data = {
            labels: ['Massa magra', 'Massa grassa'],
            datasets: [
                {
                    data: [this.lastMassaMagraValue, 100 - this.lastMassaMagraValue],
                    backgroundColor: [this.documentStyle.getPropertyValue('--blue-500'), this.documentStyle.getPropertyValue('--yellow-500'), this.documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [this.documentStyle.getPropertyValue('--blue-400'), this.documentStyle.getPropertyValue('--yellow-400'), this.documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };
        }
      }
    }
    )
    
  this.options = {
      plugins: {
          legend: {
              labels: {
                  usePointStyle: true,
                  color: this.textColor
              }
          }
      }
  };
  }
  
  get dataPeso():{
    xAxesValue: Date,
    FirstYAxesValue: number,
    SecondYAxesValue?: number,
  }[]  {
    return this.progressData.map((value) => {
      return {
        xAxesValue: new Date(value.dataMisurazione),
        FirstYAxesValue: value.pesoKg,
        SecondYAxesValue: calcolaPesoIdealeKg(value.altezzaCm),
      }});
    }
  
  get seriesPeso(): any[] {
     return [
      {
        type: "line",
        xKey: 'xAxesValue',
        yKey: 'FirstYAxesValue',
        xName: 'Tempo',  // Nome assegnato alla serie x
        yName: 'Peso',  // Nome assegnato alla prima serie y
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
        xName: 'Tempo',  // Nome assegnato alla serie x
        yName: 'Peso ideale',  // Nome assegnato alla seconda serie y
        marker: {
          stroke: '#ffcb62',
          fillOpacity: 0.5,
          fill: '#ffcb62',
      },
      },
    ]
  }

    get dataMassaGrassa():{
      xAxesValue: Date,
      YAxesValue: number,
    }[]  {
      return this.progressData.map((value) => {
        return {
          xAxesValue: new Date(value.dataMisurazione),
          YAxesValue: value.percentualeMassaGrassa,
        }});
      }
  
     

    
      
}
