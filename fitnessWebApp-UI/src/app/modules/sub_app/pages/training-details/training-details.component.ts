import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllenamentoEsercizioResponse, ExerciseResponse, PageResponseAllenamentoEsercizioResponse } from '../../../../services//models';
import { ExerciseService, TrainExerciseService, TrainService } from '../../../../services/services';
import { StopWatchService } from '../../services/stop-watch-service/stop-watch.service';
import { StopWatch } from '../../services/stop-watch-service/stop-watch.interface';
import { Subscription } from 'rxjs';
import { TrainingManagerService } from '../../services/training-manager-service/training-manager.service';
import { TrainExerciseCardComponent } from '../../components/train-exercise-card/train-exercise-card.component';
import { NgFor, NgIf } from '@angular/common';
import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';

@Component({
    selector: 'app-training-details',
    templateUrl: './training-details.component.html',
    styleUrls: ['./training-details.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf, TrainExerciseCardComponent, FeedbackInfoPointComponent]
})
export class TrainingDetailsComponent implements OnInit, OnDestroy {
  messages: Array<string> = [];
  level: 'success' | 'error' = 'success';

  public stopwatch!: StopWatch;
  private subscriptions: Subscription = new Subscription(); //Iscrizioni dell observer

  constructor(
    private trainingManagerService: TrainingManagerService,
    private timerService: StopWatchService,
    private activatedRoute: ActivatedRoute,
    private handleError: ErrorHandlerService
  ) {
    this.subscriptions.add(
      this.timerService.stopWatch$.subscribe( //Iscrizione all'observable del cronometro e mappo il valore in stopwatch
        (val: StopWatch) => (this.stopwatch = val)
      )
    );
  }

  ngOnInit(): void {
    const allenamento_id = this.activatedRoute.snapshot.params['training_id'];
    if (allenamento_id) {
      let trainingInfoSubscription = this.trainingManagerService.setInfoByTrainingId$(allenamento_id).subscribe({
        complete: () => {
          trainingInfoSubscription.unsubscribe();
        },
        error: (error) => {
          this.level = 'error';
          this.messages = this.handleError.handleError(error);
        }
      });
    }
  }
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  //CRONOMETRO
  public startCount(): void {
    this.timerService.startCount();
  }
  public stopCount(): void {
    this.timerService.stopTimer();
  }
  public resetTimer(): void {
    this.timerService.resetTimer();
  }


  //BOILERPLATE CODE

  get nomeAllenamento(): string {
    return this.trainingManagerService.train.name;
  }
  get descrizioneAllenamento(): string {
    return this.trainingManagerService.train.description as string;
  }
  get durataAllenamento(): number {
    return this.trainingManagerService.train.durata_in_ore as number;
  }
  get trainingExercisesList(): Array<AllenamentoEsercizioResponse> {
    return this.trainingManagerService.trainingExercisesResponse;
  }
  get exercises(): Array<ExerciseResponse> {
    return this.trainingManagerService.exercisesResponse;
  }
  get exerciseNumber(): number {
    return this.trainingManagerService.trainingExercisesResponse.length;
  }

  public getExerciseById(id: number | undefined): ExerciseResponse | null {
    if (id === undefined) {
      return null;
    }
    return this.trainingManagerService.getExerciseResponseById(id);
  }


}
