import { Component, ErrorHandler, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { PageResponseExerciseResponse, ExerciseResponse } from '../../../../services/models';
import { ExerciseService } from '../../../../services/services';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { PaginatedComponent } from '../../../../services/common/PaginatedComponent';
import { MultiSelectModule } from 'primeng/multiselect';
import { ExerciseCategory, getExerciseCategories } from '../../../../services/myModels/exerciseCategory';
import { FormsModule } from '@angular/forms';
import { FilterSelector } from '../../../../services/myModels/filterSelector';

@Component({
  selector: 'app-exercise-store',
  templateUrl: './exercise-store.component.html',
  styleUrls: ['./exercise-store.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, ExerciseCardComponent, AsyncPipe, FeedbackInfoPointComponent, MultiSelectModule,FormsModule]
})
export class ExerciseStoreComponent  extends PaginatedComponent implements OnInit {
  categories!: FilterSelector[];
  selectedCategories!: FilterSelector[];
  exerciseResponse$?: Observable<PageResponseExerciseResponse>;

  constructor(
    private exerciseService: ExerciseService,
    private router: Router,
    @Inject(ErrorHandlerService) handleError: ErrorHandlerService
  ) {
    super(handleError);
    this.categories = getExerciseCategories();
  }

  ngOnInit(): void {
    this.getData();
  }

  /**
   * GESTIONE TRAMITE NON SOTTOSCRIZIONE per provare la renderizzazione tramite async pipe
   */
  protected override getData() {
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

        this.getData();
      },
      error: () => {
        this.addMessage('error', 'Error importing exercise');
      }
    });
  }

  searchByFilterOptions() {
    this.exerciseResponse$ = this.exerciseService.findExercisesByCategories({
      page: this._page,
      size: this._size,
      categories: this.selectedCategories.map((category) => category.name as ExerciseCategory)
    }).pipe(
      catchError((error) => {
        this.handleErrorMessages(error);
        return EMPTY;
      }
    )
    );
  }

  /*BOILERPLATE CODE */

  get newExerciseLink(): string {
    return sub_appRoutingModule.full_manageExercisePath;
  }
  /*
  Funzione di trackby utilizzata per evitare che angular ricarichi tutti i componenti della lista nell' ngfor
  */
  trackByExerciseResponse(index: number, exercise: ExerciseResponse): number {
    return exercise.id as number;
  }

}
