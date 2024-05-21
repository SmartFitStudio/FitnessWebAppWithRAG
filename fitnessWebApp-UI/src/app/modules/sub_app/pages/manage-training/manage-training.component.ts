import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { TrainingManagerService } from '../../services/training-manager-service/training-manager.service';
import { AllenamentoEsercizioRequest, ExerciseResponse } from '../../../../services/models';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrainExerciseHandlerComponent } from '../../components/train-exercise-handler/train-exercise-handler.component';
import { MyExerciseListComponent } from '../my-exercise-list/my-exercise-list.component';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';
import { MessageHandler } from '../../../../services/myServices/error-handler/MessageHandler';

@Component({
  selector: 'app-manage-training',
  templateUrl: './manage-training.component.html',
  styleUrls: ['./manage-training.component.scss'],
  providers: [TrainingManagerService],
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule, NgClass, MyExerciseListComponent, TrainExerciseHandlerComponent, FeedbackInfoPointComponent]
})
export class ManageTrainingComponent extends MessageHandler  implements OnInit {

  trainingForm = this.formBuilder.group({
    nome_allenamento: ['', Validators.required],
    descrizione_allenamento: [''],
    durata_in_ore_allenamento: [0, [Validators.min(0)]]
  });

  private _openedTab = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _trainManager: TrainingManagerService,
    private formBuilder: FormBuilder,
    @Inject(ErrorHandlerService) handleError: ErrorHandlerService
  ) { 
    super(handleError);
  }

  ngOnInit(): void {
    const allenamento_id = this.activatedRoute.snapshot.params['training_id'];
    if (allenamento_id != null && allenamento_id != undefined) {
      let observer$ = this._trainManager.setInfoByTrainingId$(allenamento_id).subscribe({
        complete: () => {
          this.trainingForm.patchValue({
            nome_allenamento: this._trainManager.train.name,
            descrizione_allenamento: this._trainManager.train.description,
            durata_in_ore_allenamento: this._trainManager.train.durata_in_ore
          });
          observer$.unsubscribe();
        },
        error: (error) => {
          this.handleErrorMessages(error);
        }
      });
    }
  }

  //HANDLER OUTPUTS
  addExerciseToTrainingHandler($event: AllenamentoEsercizioRequest) {
    this._trainManager.addExerciseToTrain($event);
  }
  deleteExerciseFromTraining($event: number) {//index is passed
    this._trainManager.removeExerciseToTrain($event);
  }
  goUp($event: number) { //index is passed
    this._trainManager.goUp($event);
  }
  goDown($event: number) { //index is passed
    this._trainManager.goDown($event);
  }

  submitTrain() {
    if (!this.trainingForm.valid) {
      this.addMessage('warn', 'Compila correttamente i campi obbligatori');
      return;
    }
    this.update_training_data();
    let observer$ = this._trainManager.saveTraining$().subscribe({
      complete: () => {
        this.router.navigate([sub_appRoutingModule.full_myTrainsPath]);
        observer$.unsubscribe(); //in realta rxjs gestisce il completamento e la disiscrizione
      },
      error: (error) => {
        this.handleErrorMessages(error);
      }
    });
  }

  /*BOILERPLATE CODE */
  private update_training_data() {
    if (this.trainingForm.valid) {
      if (this.trainingForm.value.nome_allenamento) {
        this._trainManager.setTrainName(this.trainingForm.value.nome_allenamento);
      }
      if (this.trainingForm.value.descrizione_allenamento) {
        this._trainManager.setTrainDescription(this.trainingForm.value.descrizione_allenamento);
      }
      if (this.trainingForm.value.durata_in_ore_allenamento) {
        this._trainManager.setTrainDuration(this.trainingForm.value.durata_in_ore_allenamento);
      }
    }
  }
  get openedTab(): number {
    return this._openedTab;
  }
  //Passa al prossimo tab
  next() {
    this.clearMessages();
    if (!this.trainingForm.valid) {
      this.addMessage('warn', 'Compila correttamente i campi obbligatori');
      return;
    }
    this._openedTab++;
  }
  //Torna al tab precedente
  goBack() {
    this._openedTab--;
  }
  get training_exercises(): AllenamentoEsercizioRequest[] {
    return this._trainManager.trainingExercisesRequest;
  }
  getExercisesOfTrainingById(id: number): ExerciseResponse | null {
    return this._trainManager.getExerciseResponseById(id);
  }
  get IsNomeAllenamentoInputValid(): boolean {
    return this.trainingForm.controls.nome_allenamento.valid;
  }
  get IsDurataAllenamentoInputValid(): boolean {
    return this.trainingForm.controls.durata_in_ore_allenamento.valid;
  }
  get IsDescrizioneAllenamentoInputValid(): boolean {
    return this.trainingForm.controls.descrizione_allenamento.valid;
  }
  get IsTrainingFormValid(): boolean {
    return this.trainingForm.valid;
  }
}
