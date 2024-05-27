import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AllenamentoEsercizioRequest, ExerciseResponse } from '../../../../services/models';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss'],
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, ScrollPanelModule]
})
export class ExerciseCardComponent {
  isOpenInputView = false;
  trainingExerciseForm = this.formBuilder.group({
    serie: [, [Validators.required, Validators.min(0)]],
    ripetizioni: [, [Validators.required, Validators.min(0)]],
    recupero: [, [Validators.required, Validators.min(0)]]
  });

  private _exercise!: ExerciseResponse;
  private _isAnOrderedInput: boolean = false;
  private _storeViewActive: boolean = false;
  private allenamentoEsercizioRequest: AllenamentoEsercizioRequest = {
    id_esercizio: -1,
    id_allenamento: -1,
    index: -1,
    serie: 0,
    ripetizioni: 0,
    recupero: 0
  };

  constructor(private formBuilder: FormBuilder
  ) { }

  @Input({ required: true })
  set exercise(value: ExerciseResponse) {
    this._exercise = value;
  }

  @Input()
  set OrderedInput(value: boolean) {
    this._isAnOrderedInput = value;
  }

  @Input()
  set storeView(value: boolean) {
    this._storeViewActive = value;
  }

  isModifiable(): boolean {
    return this._exercise.creator_username != "default";
  }

  changeInputView() {
    this.isOpenInputView = !this.isOpenInputView;
  }

  @Output() private delete: EventEmitter<ExerciseResponse> = new EventEmitter<ExerciseResponse>();
  @Output() private edit: EventEmitter<ExerciseResponse> = new EventEmitter<ExerciseResponse>();
  @Output() private import: EventEmitter<number> = new EventEmitter<number>();
  @Output() private addExerciseToTraining: EventEmitter<AllenamentoEsercizioRequest> = new EventEmitter<AllenamentoEsercizioRequest>();

  onDelete() {
    this.delete.emit(this._exercise);
  }
  onEdit() {
    this.edit.emit(this._exercise);
  }
  importExercise() {
    console.log("importo l'esercizio");
    this.import.emit(this._exercise.id);
  }

  /*
  Aggiungo l'esercizio all'allenamento
  */
  addExerciseToTrain() {
    this.updateExerciseTraining();
    if(this.trainingExerciseForm.valid){
      this.addExerciseToTraining.emit(this.allenamentoEsercizioRequest);
      this.clearInput();
      this.changeInputView();
    }
  }

  //BOILERPLATE CODE

  get exerciseCover(): string | undefined {
    if (this._exercise.cover) {
      return 'data:image/jpg;base64,' + this._exercise.cover
    }
    return 'https://source.unsplash.com/user/c_v_r/1900x800'; //ritorna un immageine di un sito che genera immagini random
  }
  get exercise(): ExerciseResponse {
    return this._exercise;
  }
  get isAnOrderedInput(): boolean {
    return this._isAnOrderedInput;
  }
  get storeViewActive(): boolean {
    return this._storeViewActive;
  }
  get IsSerieInputValid(): boolean {
    return this.trainingExerciseForm.controls.serie.valid;
  }
  get IsRipetizioniInputValid(): boolean {
    return this.trainingExerciseForm.controls.ripetizioni.valid;
  }
  get IsRecuperoInputValid(): boolean {
    return this.trainingExerciseForm.controls.recupero.valid;
  }
  private clearInput() {
    if (this.allenamentoEsercizioRequest) {
      this.allenamentoEsercizioRequest = {
        id_esercizio: this._exercise.id,
        id_allenamento: -1,
        index: -1,
        serie: 0,
        ripetizioni: 0,
        recupero: 0
      };
      this.trainingExerciseForm.reset();
    }
  }
  /*
Quando clicco su elimina, emetto l'evento per eliminare l'esercizio.
Viene gestito dal padre che ha il servizio per eliminare l'esercizio.
*/

  private updateExerciseTraining() {
    if (this.allenamentoEsercizioRequest && this.trainingExerciseForm.valid) {
      this.allenamentoEsercizioRequest.id_esercizio = this._exercise.id;
      if (this.trainingExerciseForm.value.serie) {
        this.allenamentoEsercizioRequest.serie = this.trainingExerciseForm.value.serie;
      }
      if (this.trainingExerciseForm.value.ripetizioni) {
        this.allenamentoEsercizioRequest.ripetizioni = this.trainingExerciseForm.value.ripetizioni;
      }
      if (this.trainingExerciseForm.value.recupero) {
        this.allenamentoEsercizioRequest.recupero = this.trainingExerciseForm.value.recupero;
      }
    }
  }
}
