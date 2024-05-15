import { Component, Input } from '@angular/core';
import { AllenamentoEsercizioRequest, AllenamentoEsercizioResponse, ExerciseResponse } from '../../../../services/models';

@Component({
    selector: 'app-train-exercise-card',
    templateUrl: './train-exercise-card.component.html',
    styleUrls: ['./train-exercise-card.component.scss'],
    standalone: true
})
export class TrainExerciseCardComponent {
private _trainingExercise!: AllenamentoEsercizioResponse;
private _exercise!: ExerciseResponse;

@Input({ required: true })
get trainingExercise() {
  return this._trainingExercise;
}
set trainingExercise(value: AllenamentoEsercizioResponse) {
  this._trainingExercise = value;
}

@Input({ required: true })
get exercise() {
  return this._exercise;
}
set exercise(value: ExerciseResponse) {
  this._exercise = value;
}

get exerciseCover(): string | undefined {
  if (this._exercise.cover) {
    return 'data:image/jpg;base64,' + this._exercise.cover
  }
  return 'https://source.unsplash.com/user/c_v_r/1900x800'; //ritorna un immageine di un sito che genera immagini random
}

}
