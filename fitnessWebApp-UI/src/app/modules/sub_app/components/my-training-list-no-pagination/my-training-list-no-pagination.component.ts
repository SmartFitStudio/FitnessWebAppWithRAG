import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AllenamentoResponse } from '../../../../services/models';
import { TrainService } from '../../../../services/services';
import { PeriodInputTrainingCardComponent } from '../period-input-training-card/period-input-training-card.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-my-training-list-no-pagination',
    templateUrl: './my-training-list-no-pagination.component.html',
    styleUrls: ['./my-training-list-no-pagination.component.scss'],
    standalone: true,
    imports: [NgFor, PeriodInputTrainingCardComponent]
})
export class MyTrainingListNoPaginationComponent implements OnInit {

  private _trainings: AllenamentoResponse[] = [];
  constructor(private trainService: TrainService) { }

  ngOnInit(): void {
    this.trainService.findAllAllenamentoByAuthenticatedUserNoPagination().subscribe((trainings) => {
      this._trainings = trainings;
    });
  }

  @Output() private add_training: EventEmitter<AllenamentoResponse> = new EventEmitter<AllenamentoResponse>();
  aggiungiAllenamento($event: AllenamentoResponse) {
    this.add_training.emit($event);
  }

  //BOILERPLATE CODE
  get trainings(): AllenamentoResponse[] {
    return this._trainings;
  }
}
