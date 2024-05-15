import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AllenamentoEsercizioRequest, AllenamentoEsercizioResponse, ExerciseResponse } from '../../../../services/models';

@Component({
    selector: 'app-train-exercise-handler',
    templateUrl: './train-exercise-handler.component.html',
    styleUrls: ['./train-exercise-handler.component.scss'],
    standalone: true
})
export class TrainExerciseHandlerComponent {

private _trainingExercise! : AllenamentoEsercizioRequest;
private _exercise!: ExerciseResponse;
private _index!: number;

@Input({ required: true })
get trainingExercise() {
  return this._trainingExercise;
}
set trainingExercise(value: AllenamentoEsercizioRequest) {
  this._trainingExercise = value;
}

@Input({ required: true })
get exercise() {
  return this._exercise;
}
set exercise(value: ExerciseResponse) {
  this._exercise = value;
}

@Input({ required: true })
set index(value: number) {
   this._index = value;
   this._trainingExercise.index = value;
}

get exerciseCover(): string | undefined {
  if (this._exercise.cover) {
    return 'data:image/jpg;base64,' + this._exercise.cover
  }
  return 'https://source.unsplash.com/user/c_v_r/1900x800'; //ritorna un immageine di un sito che genera immagini random
}

get isFirts(){
  return this._trainingExercise.index === 0;
}

@Output() private deleteExercise: EventEmitter<number> = new EventEmitter<number>();
@Output() private goUp: EventEmitter<number> = new EventEmitter<number>();
@Output() private goDown: EventEmitter<number> = new EventEmitter<number>();

deleteExerciseFromTraining(){
  this.deleteExercise.emit(this._index);
}
up(){
    this.goUp.emit(this._index);
}

down(){
  this.goDown.emit(this._index);
}

}
