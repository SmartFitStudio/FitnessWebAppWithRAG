import { Component, OnInit } from '@angular/core';

import { ProgressoResponse } from '../../../../services/models';
import { ProgressService } from '../../../../services/services/progress.service';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { MultiLineGraphComponent } from '../multi-line-graph/multi-line-graph.component';
import { calcolaPesoIdealeKg } from '../../services/functions/utilitiesForHealthStatus';
@Component({
  selector: 'app-user-progress-card',
  standalone: true,
  imports: [MultiLineGraphComponent],
  templateUrl: './user-progress-card.component.html',
  styleUrl: './user-progress-card.component.scss'
})
export class UserProgressCardComponent implements OnInit {
  messages: string[] = [];
  level: 'success' | 'error' = 'success';

  private progressData: ProgressoResponse[] = [];


  constructor(private progressService: ProgressService,
    private handleError: ErrorHandlerService
  ) {
  }

  ngOnInit(): void {
    this.progressService.getLastNProgressi({
      N: 10
    }).subscribe({
      next: (response) => {
        this.progressData = response;
        console.log(this.progressData);
      },
      error: (error) => {
        this.handleError.handleError(error).forEach((value) => {
          this.messages.push(value.message);
        });
      }
    }
    )
  }
  
  get data():{
    xAxesValue: Date,
    FirstYAxesValue: number,
    SecondYAxesValue: number,
  }[]  {
    return this.progressData.map((value) => {
      return {
        xAxesValue: new Date(value.dataMisurazione),
        FirstYAxesValue: value.pesoKg,
        SecondYAxesValue: calcolaPesoIdealeKg(value.pesoKg),
      }});
    }
  
}
