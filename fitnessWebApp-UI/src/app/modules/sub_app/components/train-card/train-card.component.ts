import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AllenamentoResponse } from '../../../../services/models';

@Component({
    selector: 'app-train-card',
    templateUrl: './train-card.component.html',
    styleUrls: ['./train-card.component.scss'],
    standalone: true
})
export class TrainCardComponent {
  private _train!: AllenamentoResponse;

  @Input()
  set train(value: AllenamentoResponse) {
    this._train = value;
  }

  @Output() private delete: EventEmitter<AllenamentoResponse> = new EventEmitter<AllenamentoResponse>();
  @Output() private edit: EventEmitter<AllenamentoResponse> = new EventEmitter<AllenamentoResponse>();
  @Output() private openDetail: EventEmitter<AllenamentoResponse> = new EventEmitter<AllenamentoResponse>();
  /*
  Quando clicco su elimina, emetto l'evento per eliminare l'esercizio.
  Viene gestito dal padre che ha il servizio per eliminare l'esercizio.
  */
  onDelete() {
    this.delete.emit(this._train);
  }

  onEdit() {
    this.edit.emit(this._train);
  }

  openDetails(){
    this.openDetail.emit(this._train)
  }

  //BOILERPLATE CODE
  get train(): AllenamentoResponse {
    return this._train;
  }

}
