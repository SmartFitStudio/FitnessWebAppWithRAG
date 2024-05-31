import { Component, Input } from '@angular/core';
import { PianoAlimentareRag } from '../../../../services/models';
import { DietaGiornalieraComponent } from '../dieta-giornaliera/dieta-giornaliera.component';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-piano-alimentare-view',
  standalone: true,
  imports: [DietaGiornalieraComponent, NgFor, NgIf],
  templateUrl: './piano-alimentare-view.component.html',
  styleUrl: './piano-alimentare-view.component.scss'
})
export class PianoAlimentareViewComponent {
 private _pianoAlimentare!: PianoAlimentareRag | undefined;
 private _printView = false;

 @Input({required: true}) 
 set pianoAlimentare(pianoAlimentare: PianoAlimentareRag | undefined) {
    this._pianoAlimentare = pianoAlimentare;
  }
  @Input()
  set printView(printView: boolean) {
      this._printView = printView;
  }



  //BOILERPLATE CODE
  get pianoAlimentare(): PianoAlimentareRag | undefined{
    return this._pianoAlimentare;
  }
  get printView(): boolean {
    return this._printView;
  }
}
