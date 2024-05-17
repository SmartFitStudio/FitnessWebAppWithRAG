import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExerciseResponse, PeriodoAllenamentoRequest } from '../../../../services/models';
import { PeriodoGiornata } from '../../../../services/myModels/periodoGiornata';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-period-day-card',
    templateUrl: './period-day-card.component.html',
    styleUrls: ['./period-day-card.component.scss'],
    standalone: true,
    imports: [NgIf]
})
export class PeriodDayCardComponent {
private _index!: number;
private _allenamenti:  PeriodoAllenamentoRequest[] = []; //

@Input({required: true})
set index(value: number) {
  this._index = value;
}

@Input()
set allenamenti(value: PeriodoAllenamentoRequest[]) {
  this._allenamenti = value;
}

@Output() private requestToAdd: EventEmitter<{day: number, periodo:PeriodoGiornata}> = new EventEmitter<{day: number, periodo:PeriodoGiornata}>();
@Output() private requestToRemove: EventEmitter<{day: number, periodo:PeriodoGiornata}> = new EventEmitter<{day: number, periodo:PeriodoGiornata}>();

addAllenamento(periodo: PeriodoGiornata) {
  this.requestToAdd.emit({day:this._index, periodo: periodo});
}
removeAllenamento(periodo: PeriodoGiornata) {
  this.requestToRemove.emit({day:this._index, periodo: periodo});
}

//BOILERPLATE CODE
get PeriodoGiornata(): typeof PeriodoGiornata {
  return PeriodoGiornata;
}
get allenamenti(): PeriodoAllenamentoRequest[] {
  return this._allenamenti;
}
get index(): number {
  return this._index;
}
get allenamentoPerodoMattina (): PeriodoAllenamentoRequest | undefined {
  return this.allenamenti.find((allenamento) => allenamento.periodo_giornata == 'MATTINA');
}
get allenamentoPerodoPomeriggio (): PeriodoAllenamentoRequest | undefined {
  return this.allenamenti.find((allenamento) => allenamento.periodo_giornata == 'POMERIGGIO');
}
get allenamentoPerodoSera (): PeriodoAllenamentoRequest | undefined {
  return this.allenamenti.find((allenamento) => allenamento.periodo_giornata == 'SERA');
}
}
