import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExerciseResponse, PeriodoAllenamentoRequest } from '../../../../services/models';
import { PeriodoGiornata } from '../../../../services/myModels/periodoGiornata';
import { NgIf } from '@angular/common';
import { NgVarDirective } from '../../directives/ngVar/ng-var.directive';

@Component({
  selector: 'app-period-day-card',
  templateUrl: './period-day-card.component.html',
  styleUrls: ['./period-day-card.component.scss'],
  standalone: true,
  imports: [NgIf, NgVarDirective]
})
export class PeriodDayCardComponent {
  private _index!: number;
  private _allenamenti: PeriodoAllenamentoRequest[] = []; //
  private _allenamenti_minimazed: { id_allenamento: number, nome_allenamento: string }[] = [];

  @Input({ required: true })
  set index(value: number) {
    this._index = value;
  }

  @Input({ required: true})
  set allenamenti(value: PeriodoAllenamentoRequest[]) {
    this._allenamenti = value;
  }

  @Input({ required: true})
  set allenamenti_info_minimazed(value: { id_allenamento: number, nome_allenamento: string }[]) {
    this._allenamenti_minimazed = value;
  }

  @Output() private requestToAdd: EventEmitter<{ day: number, periodo: PeriodoGiornata }> = new EventEmitter<{ day: number, periodo: PeriodoGiornata }>();
  @Output() private requestToRemove: EventEmitter<{ day: number, periodo: PeriodoGiornata }> = new EventEmitter<{ day: number, periodo: PeriodoGiornata }>();

  addAllenamento(periodo: PeriodoGiornata) {
    this.requestToAdd.emit({ day: this._index, periodo: periodo });
  }
  removeAllenamento(periodo: PeriodoGiornata) {
    this.requestToRemove.emit({ day: this._index, periodo: periodo });
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
  get allenamentoPeriodoMattina(): { id_allenamento: number, nome_allenamento: string } | undefined {
    const id_allenamento = this.getAllenamentoPeriodoByPeriodoGiornata(PeriodoGiornata.MATTINA)?.id_allenamento;
    return this._allenamenti_minimazed.find((allenamento) => allenamento.id_allenamento == id_allenamento);
  }
  get allenamentoPeriodoPomeriggio(): { id_allenamento: number, nome_allenamento: string } | undefined {
    const id_allenamento = this.getAllenamentoPeriodoByPeriodoGiornata(PeriodoGiornata.POMERIGGIO)?.id_allenamento;
    return this._allenamenti_minimazed.find((allenamento) => allenamento.id_allenamento == id_allenamento);
  }
  get allenamentoPeriodoSera(): { id_allenamento: number, nome_allenamento: string } | undefined {
    const id_allenamento = this.getAllenamentoPeriodoByPeriodoGiornata(PeriodoGiornata.SERA)?.id_allenamento;
    return this._allenamenti_minimazed.find((allenamento) => allenamento.id_allenamento == id_allenamento);
  }

  private getAllenamentoPeriodoByPeriodoGiornata(periodo: PeriodoGiornata): PeriodoAllenamentoRequest | undefined {
    return this.allenamenti.find((allenamento) => allenamento.periodo_giornata == periodo);
  }
}
