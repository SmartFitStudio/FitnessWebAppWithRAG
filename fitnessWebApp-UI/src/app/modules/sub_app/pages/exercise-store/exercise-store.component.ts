import { Component, ErrorHandler, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { PageResponseExerciseResponse, ExerciseResponse, AllenamentoEsercizioRequest } from '../../../../services/models';
import { ExerciseService } from '../../../../services/services';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { MessageHandler } from '../../../../services/myServices/error-handler/MessageHandler';

@Component({
  selector: 'app-exercise-store',
  templateUrl: './exercise-store.component.html',
  styleUrls: ['./exercise-store.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, ExerciseCardComponent, AsyncPipe, FeedbackInfoPointComponent]
})
export class ExerciseStoreComponent extends MessageHandler {
  exerciseResponse$?: Observable<PageResponseExerciseResponse>;

  private totalPages? = 0;
  private _page = 0;
  private _size = 5;
  private _pages: any = [];

  constructor(
    private exerciseService: ExerciseService,
    private router: Router,
    @Inject(ErrorHandlerService) handleError: ErrorHandlerService
  ) {
    super(handleError);
  }

  ngOnInit(): void {
    this.findAllStoreExercise();
  }

  /**
   * GESTIONE TRAMITE NON SOTTOSCRIZIONE per provare la renderizzazione tramite async pipe
   */
  private findAllStoreExercise() {
    this.exerciseResponse$ = this.exerciseService.getExercisesFromPublicStore({
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
      })
    );
  }

  importExercise($event: number) {
    console.log($event);
    this.exerciseService.importExercise({ 'exercise-id': $event }).subscribe({
      next: () => {
        this.addMessage('success', 'Exercise imported');

        this.findAllStoreExercise();
      },
      error: () => {
        this.addMessage('error', 'Error importing exercise');
      }
    });
  }

  /*BOILERPLATE CODE */
  gotToPage(page: number) {
    this._page = page;
    this.findAllStoreExercise();
  }

  goToFirstPage() {
    this._page = 0;
    this.findAllStoreExercise();
  }

  goToPreviousPage() {
    this._page--;
    this.findAllStoreExercise();
  }

  goToLastPage() {
    this._page = this.totalPages as number - 1;
    this.findAllStoreExercise();
  }

  goToNextPage() {
    this._page++;
    this.findAllStoreExercise();
  }

  isLastPage() {
    return this._page === this.totalPages as number - 1;
  }

  get newExerciseLink(): string {
    return sub_appRoutingModule.full_manageExercisePath;
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
  /*
  Funzione di trackby utilizzata per evitare che angular ricarichi tutti i componenti della lista nell' ngfor
  */
  trackByExerciseResponse(index: number, exercise: ExerciseResponse): number {
    return exercise.id as number;
  }

}
