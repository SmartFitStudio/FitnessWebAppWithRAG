import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PeriodoResponse } from '../../../../services/models';
import { ObiettivoPeriodoPipePipe } from '../../services/pipes/obiettivo-periodo-pipe.pipe';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-period-card',
    templateUrl: './period-card.component.html',
    styleUrls: ['./period-card.component.scss'],
    standalone: true,
    imports: [NgIf, ObiettivoPeriodoPipePipe]
})
export class PeriodCardComponent {
  private _periodo!: PeriodoResponse;


  @Input()
  set periodo(value: PeriodoResponse) {
    this._periodo = value;
  }

  get periodo(): PeriodoResponse {
    return this._periodo;
  }

  @Output() private delete: EventEmitter<PeriodoResponse> = new EventEmitter<PeriodoResponse>();
  @Output() private edit: EventEmitter<PeriodoResponse> = new EventEmitter<PeriodoResponse>();
  @Output() private openDetail: EventEmitter<PeriodoResponse> = new EventEmitter<PeriodoResponse>();
  /*
  Quando clicco su elimina, emetto l'evento per eliminare l'esercizio.
  Viene gestito dal padre che ha il servizio per eliminare l'esercizio.
  */
  onDelete() {
    this.delete.emit(this._periodo);
  }

  onEdit() {
    this.edit.emit(this._periodo);
  }

  openDetails(){
    this.openDetail.emit(this._periodo)
  }

}
