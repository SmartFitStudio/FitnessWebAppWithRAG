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
  private lastMassaGrassaValue: number | null = null;

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
        this.lastMassaGrassaValue = this.progressData[0].percentualeMassaGrassa;
        if (this.lastMassaGrassaValue) {
          this.data = {
            labels: ['Massa grassa', 'Massa magra'],
            datasets: [
                {
                    data: [this.lastMassaGrassaValue, 100 - this.lastMassaGrassaValue],
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
  

    get dataMasse():{
      xAxesValue: Date,
      FirstYAxesValue: number,
      SecondYAxesValue?: number,
    }[]  {
      return this.progressData.map((value) => {
        return {
          xAxesValue: new Date(value.dataMisurazione),
          FirstYAxesValue: value.percentualeMassaGrassa,
          SecondYAxesValue: value.percentualeMassaMuscolare,
        }});
      }
      
}
