import { Component, Input } from '@angular/core';
import { AllenamentoResponse, PeriodoAllenamentoRequest, PeriodoAllenamentoResponse } from '../../../../services/models';

@Component({
  selector: 'app-training-period-card',
  templateUrl: './training-period-card.component.html',
  styleUrls: ['./training-period-card.component.scss'],
  standalone: true
})
export class TrainingPeriodCardComponent {
  private _allenamento!: AllenamentoResponse;
  private _allenamentoPeriodo!: PeriodoAllenamentoResponse | PeriodoAllenamentoRequest;

  @Input({ required: true })
  set allenamento(value: AllenamentoResponse) {
    this._allenamento = value;
  }

  @Input({ required: true })
  set allenamentoPeriodo(value: PeriodoAllenamentoResponse | PeriodoAllenamentoRequest) {
    this._allenamentoPeriodo = value;
  }


  //BOILERPLATE CODE
  get allenamento(): AllenamentoResponse {
    return this._allenamento;
  }
  get allenamentoPeriodo(): PeriodoAllenamentoResponse | PeriodoAllenamentoRequest {
    return this._allenamentoPeriodo;
  }
}
