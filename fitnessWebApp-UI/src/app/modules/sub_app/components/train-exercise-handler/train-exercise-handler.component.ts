import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AllenamentoEsercizioRequest,  ExerciseResponse } from '../../../../services/models';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { NgIf } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InplaceModule } from 'primeng/inplace';

@Component({
  selector: 'app-train-exercise-handler',
  templateUrl: './train-exercise-handler.component.html',
  styleUrls: ['./train-exercise-handler.component.scss'],
  standalone: true,
  imports: [NgIf,InputNumberModule,FormsModule, ReactiveFormsModule, MessagesModule,ScrollPanelModule, InplaceModule]
})
export class TrainExerciseHandlerComponent {
  private _trainingExercise!: AllenamentoEsercizioRequest;
  private _exercise!: ExerciseResponse;
  private _index!: number;
  private _is_editing_started = false;

  exerciseInfoForm = this.formBuilder.group({
    serie: [ 0,[Validators.min(0), Validators.required]],
    ripetizioni: [0, [Validators.min(0), Validators.required]],
    recupero: [0, [Validators.min(0), Validators.required]]
  });

  constructor(private formBuilder: FormBuilder) {
    this.exerciseInfoForm.disable();
   }

  @Input({ required: true })
  set trainingExercise(value: AllenamentoEsercizioRequest) {
    this._trainingExercise = value;
    this.bindAllenamentoEsercizioToForm();
  }

  @Input({ required: true })
  set exercise(value: ExerciseResponse) {
    this._exercise = value;
  }

  @Input({ required: true })
  set index(value: number) {
    this._index = value;
    this._trainingExercise.index = value;
  }

  @Output() private deleteExercise: EventEmitter<number> = new EventEmitter<number>();
  @Output() private goUp: EventEmitter<number> = new EventEmitter<number>();
  @Output() private goDown: EventEmitter<number> = new EventEmitter<number>();
  @Output() private updateInfoAllenamentoEsercizio: EventEmitter<AllenamentoEsercizioRequest> = new EventEmitter<AllenamentoEsercizioRequest>();

  deleteExerciseFromTraining() {
    this.deleteExercise.emit(this._index);
  }
  up() {
    this.goUp.emit(this._index);
  }

  down() {
    this.goDown.emit(this._index);
  }

  startEditing(){
    this._is_editing_started = true;
    this.exerciseInfoForm.enable();
  }

  updateInfo() {
    this._is_editing_started = false; //disabilita la modifica
    this.bindFormToAllenamentoEsercizio();
    //importante tieni disable dopo il binding
    this.exerciseInfoForm.disable();
    this._trainingExercise.index = this._index;
    this.updateInfoAllenamentoEsercizio.emit(this._trainingExercise);
  }

  //BOILERPLATE CODE
  private bindFormToAllenamentoEsercizio() {
    if (this.exerciseInfoForm.valid) {
      if(this.exerciseInfoForm.controls.serie.value)
      this._trainingExercise.serie = this.exerciseInfoForm.controls.serie.value;
      if(this.exerciseInfoForm.controls.ripetizioni.value)
      this._trainingExercise.ripetizioni = this.exerciseInfoForm.controls.ripetizioni.value;
      if(this.exerciseInfoForm.controls.recupero.value)
      this._trainingExercise.recupero = this.exerciseInfoForm.controls.recupero.value;
    }
  }
  private bindAllenamentoEsercizioToForm() {
    this.exerciseInfoForm.patchValue({
      serie: this._trainingExercise.serie,
      ripetizioni: this._trainingExercise.ripetizioni,
      recupero: this._trainingExercise.recupero
    });
  }
  get exercise() {
    return this._exercise;
  }
  get trainingExercise() {
    return this._trainingExercise;
  }
  get is_editing_started() {
    return this._is_editing_started;
  }
  get exerciseCover(): string | undefined {
    if (this._exercise.cover) {
      return 'data:image/jpg;base64,' + this._exercise.cover
    }
    return 'https://source.unsplash.com/user/c_v_r/1900x800'; //ritorna un immageine di un sito che genera immagini random
  }

  get IsInputSeriesValid() {
    return this.exerciseInfoForm.controls.serie.valid;
  }
  get IsInputRepsValid() {
    return this.exerciseInfoForm.controls.ripetizioni.valid;
  }
  get IsInputRecoveryValid() {
    return this.exerciseInfoForm.controls.recupero.valid;
  }
  get IsFormValid() {
    return this.exerciseInfoForm.valid;
  }
}
