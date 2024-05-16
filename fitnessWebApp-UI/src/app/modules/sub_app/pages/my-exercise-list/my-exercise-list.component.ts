import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  AllenamentoEsercizioRequest, ExerciseResponse, PageResponseExerciseResponse } from '../../../../services/models';
import { ExerciseService } from '../../../../services/services';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { Router, RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-my-exercise-list',
    templateUrl: './my-exercise-list.component.html',
    styleUrls: ['./my-exercise-list.component.scss'],
    standalone: true,
    imports: [NgIf, RouterLink, NgFor, ExerciseCardComponent, AsyncPipe]
})
export class MyExerciseListComponent implements OnInit {
  exerciseResponse$?: Observable<PageResponseExerciseResponse>;
  totalPages? = 0;
  page = 0;
  size = 5;
  pages: any = [];
  message = '';
  level: 'success' |'error' = 'success';

  private _isListForInput = false; // La lista è per la selezione di un esercizio da aggiungere ad un allenamento? Viene passato dal padre
  private _is_adding_permitted = true; // Do la possibilità all'utente di andare sulla schermata per creare un nuovo esericizio? di default si, ma viene passato dal padre

  constructor(
    private exerciseService: ExerciseService,
    private router: Router
  ) {
  }

  /*
  Funzione di trackby utilizzata per evitare che angular ricarichi tutti i componenti della lista nell' ngfor
  */
  trackByExerciseResponse(index: number, exercise: ExerciseResponse): number {
    return exercise.id as number;
  }

  ngOnInit(): void {
    this.findAllMyExercise();
  }

  @Input()
  set isListForInput(value: boolean) {
    this._isListForInput = value;
  }

  @Input()
  set isAddingPermitted(value: boolean) {
    this._is_adding_permitted = value;
  }

  get isListForInput() {
    return this._isListForInput;
  }

  get newExerciseLink(): string {
    return sub_appRoutingModule.full_manageExercisePath;
  }

  get isAddingPermitted() {
    return this._is_adding_permitted;
  }

  private findAllMyExercise() {
    
    this.exerciseResponse$ = this.exerciseService.findAllExercise({
      page: this.page,
      size: this.size
    }).pipe(
      map((response: PageResponseExerciseResponse) => {
        this.totalPages = response.totalPages;
         this.pages = Array(response.totalPages)
            .fill(0)
            .map((x, i) => i);
        return response;
      })
    );
  }

  deleteExercise(exerciseResponse: ExerciseResponse) {
    this.exerciseService.deleteExercise({ 'exercise-id': exerciseResponse.id as number})
      .subscribe({
        next: () => {
          this.message = 'Exercise deleted';
          this.level = 'success';
          this.findAllMyExercise();
        },
        error: () => {
          this.message = 'Error deleting exercise';
          this.level = 'error';
        }
      });
  }

  editExercise(exerciseResponse: ExerciseResponse) {
    this.router.navigate([sub_appRoutingModule.full_manageExercisePath , exerciseResponse.id]);
  }
  get goToStore(): string {
    return sub_appRoutingModule.full_exerciseStorePath;
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllMyExercise();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllMyExercise();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllMyExercise();
  }

  goToLastPage() {
    this.page = this.totalPages as number - 1;
    this.findAllMyExercise();
  }

  goToNextPage() {
    this.page++;
    this.findAllMyExercise();
  }

  isLastPage() {
    return this.page === this.totalPages as number - 1;
  }

  @Output() private addExerciseToTraining: EventEmitter<AllenamentoEsercizioRequest> = new EventEmitter<AllenamentoEsercizioRequest>();

  addExerciseToTrainingHandler($event: AllenamentoEsercizioRequest){
    this.addExerciseToTraining.emit($event);
  }
}
