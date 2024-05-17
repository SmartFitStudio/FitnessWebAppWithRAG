import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AllenamentoResponse } from '../../../../services/models';

@Component({
    selector: 'app-period-input-training-card',
    templateUrl: './period-input-training-card.component.html',
    styleUrls: ['./period-input-training-card.component.scss'],
    standalone: true
})
export class PeriodInputTrainingCardComponent {
  private _training!: AllenamentoResponse;

  @Input({required:true})
  set training(value: AllenamentoResponse) {
    this._training = value;
  }

  @Output() private add: EventEmitter<AllenamentoResponse> = new EventEmitter<AllenamentoResponse>();

  aggiungi(){
    this.add.emit(this._training);
  }

  //BOILERPLATE CODE
  get training(): AllenamentoResponse {
    return this._training;
  }
}
