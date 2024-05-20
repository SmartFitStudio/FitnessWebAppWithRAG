import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {  AllenamentoEsercizioRequest, ExerciseResponse, PageResponseExerciseResponse } from '../../../../services/models';
import { ExerciseService } from '../../../../services/services';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { Router, RouterLink } from '@angular/router';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';
import { MessageHandler } from '../../../../services/myServices/error-handler/MessageHandler';

@Component({
    selector: 'app-my-exercise-list',
    templateUrl: './my-exercise-list.component.html',
    styleUrls: ['./my-exercise-list.component.scss'],
    standalone: true,
    imports: [NgIf, RouterLink, NgFor, ExerciseCardComponent, AsyncPipe, FeedbackInfoPointComponent]
})
export class MyExerciseListComponent extends MessageHandler implements OnInit {
  exerciseResponse$?: Observable<PageResponseExerciseResponse>;

  private totalPages? = 0;
  private _page = 0;
  private _size = 5;
  private _pages: any = [];
  private _isListForInput = false; // La lista è per la selezione di un esercizio da aggiungere ad un allenamento? Viene passato dal padre
  private _is_adding_permitted = true; // Do la possibilità all'utente di andare sulla schermata per creare un nuovo esericizio? di default si, ma viene passato dal padre

  constructor(
    private exerciseService: ExerciseService,
    private router: Router,
    @Inject(ErrorHandlerService) handleError: ErrorHandlerService
  ) {
    super(handleError);
  }

  @Input()
  set isListForInput(value: boolean) {
    this._isListForInput = value;
  }

  @Input()
  set isAddingPermitted(value: boolean) {
    this._is_adding_permitted = value;
  }

  ngOnInit(): void {
    this.findAllMyExercise();
  }

  private findAllMyExercise() {
    this.exerciseResponse$ = this.exerciseService.findAllAuthenticatedUserExercisesPaginated({
      page: this._page,
      size: this._size
    }).pipe(
      map((response: PageResponseExerciseResponse) => {
        this.totalPages = response.totalPages;
         this._pages = Array(response.totalPages)
            .fill(0)
            .map((x, i) => i);
        return response;
      }),
      catchError((error) => {
       this.handleErrorMessages(error);
        return EMPTY;
      }
    ));
  }

  deleteExercise(exerciseResponse: ExerciseResponse) {
    this.exerciseService.deleteExercise({ 'exercise-id': exerciseResponse.id as number})
      .subscribe({
        next: () => {
          this._messages = ['Esercizio eliminato con successo'];
          this._level = 'success';
          this.findAllMyExercise();
        },
        error: (error) => {
          this.handleErrorMessages(error);
        }
      });
  }

  editExercise(exerciseResponse: ExerciseResponse) {
    this.router.navigate([sub_appRoutingModule.full_manageExercisePath , exerciseResponse.id]);
  }

  @Output() private addExerciseToTraining: EventEmitter<AllenamentoEsercizioRequest> = new EventEmitter<AllenamentoEsercizioRequest>();
  addExerciseToTrainingHandler($event: AllenamentoEsercizioRequest){
    this.addExerciseToTraining.emit($event);
  }

  /*BOILERPLATE CODE */
  gotToPage(page: number) {
    this._page = page;
    this.findAllMyExercise();
  }
  goToFirstPage() {
    this._page = 0;
    this.findAllMyExercise();
  }
  goToPreviousPage() {
    this._page --;
    this.findAllMyExercise();
  }
  goToLastPage() {
    this._page = this.totalPages as number - 1;
    this.findAllMyExercise();
  }
  goToNextPage() {
    this._page++;
    this.findAllMyExercise();
  }
  isLastPage() {
    return this._page === this.totalPages as number - 1;
  }
  get page(): number {
    return this._page;
  }
  get size(): number {
    return this._size;
  }
  get pages(): any {
    return this._pages;
  }
  get isListForInput() {
    return this._isListForInput;
  }

  get isAddingPermitted() {
    return this._is_adding_permitted;
  }
  /*
  Funzione di trackby utilizzata per evitare che angular ricarichi tutti i componenti della lista nell' ngfor
  */
  trackByExerciseResponse(index: number, exercise: ExerciseResponse): number {
    return exercise.id as number;
  }

  //LINKS
  get newExerciseLink(): string {
    return sub_appRoutingModule.full_manageExercisePath;
  }
  get goToStore(): string {
    return sub_appRoutingModule.full_exerciseStorePath;
  }
}
