import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { PageResponseExerciseResponse, ExerciseResponse, AllenamentoEsercizioRequest } from '../../../../services/models';
import { ExerciseService } from '../../../../services/services';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { ExerciseCardComponent } from '../../components/exercise-card/exercise-card.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-exercise-store',
    templateUrl: './exercise-store.component.html',
    styleUrls: ['./exercise-store.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, ExerciseCardComponent, AsyncPipe]
})
export class ExerciseStoreComponent {
  exerciseResponse$?: Observable<PageResponseExerciseResponse>;
  totalPages? = 0;
  page = 0;
  size = 5;
  pages: any = [];
  message = '';
  level: 'success' |'error' = 'success';


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
    this.findAllStoreExercise();
  }

  get newExerciseLink(): string {
    return sub_appRoutingModule.full_manageExercisePath;
  }


  private findAllStoreExercise() {
    this.exerciseResponse$ = this.exerciseService.getExercisesFromPublicStore({
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


  importExercise($event:number){
    console.log($event);
    this.exerciseService.importExercise({ 'exercise-id': $event}).subscribe({
      next: () => {
        this.message = 'Exercise imported';
        this.level = 'success';
        this.findAllStoreExercise();
      },
      error: () => {
        this.message = 'Error importing exercise';
        this.level = 'error';
      }
    });
  }


  gotToPage(page: number) {
    this.page = page;
    this.findAllStoreExercise();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllStoreExercise();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllStoreExercise();
  }

  goToLastPage() {
    this.page = this.totalPages as number - 1;
    this.findAllStoreExercise();
  }

  goToNextPage() {
    this.page++;
    this.findAllStoreExercise();
  }

  isLastPage() {
    return this.page === this.totalPages as number - 1;
  }

}
