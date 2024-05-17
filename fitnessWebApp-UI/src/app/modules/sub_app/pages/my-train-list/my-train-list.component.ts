import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AllenamentoResponse, PageResponseAllenamentoResponse } from '../../../../services/models';
import { TrainService } from '../../../../services//services';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { TrainCardComponent } from '../../components/train-card/train-card.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';

@Component({
    selector: 'app-my-train-list',
    templateUrl: './my-train-list.component.html',
    styleUrls: ['./my-train-list.component.scss'],
    standalone: true,
    imports: [NgIf, RouterLink, NgFor, TrainCardComponent, AsyncPipe,FeedbackInfoPointComponent]
})
export class MyTrainListComponent implements OnInit {
  trainingsResponse$!: Observable<PageResponseAllenamentoResponse>;
  messages: Array<string>= [];
  level: 'success' |'error' = 'success'; 

  private totalPages? = 0;
  private _page = 0;
  private _size = 5;
  private _pages: any = [];
  private _is_adding_permitted = true;

  constructor(
    private trainService: TrainService,
    private router: Router,
    private handleError: ErrorHandlerService
  ) {
  }

  ngOnInit(): void {
    this.findAllMyTrain();
  }

  @Input()
  set isAddingPermitted(value: boolean) {
    this._is_adding_permitted = value;
  }

  private findAllMyTrain() {
    this.trainingsResponse$ = this.trainService.findAllAllenamentoByCreator({
      page: this._page,
      size: this._size
    }).pipe(
      map((response: PageResponseAllenamentoResponse) => {
        this.totalPages = response.totalPages;
         this._pages = Array(response.totalPages)
            .fill(0)
            .map((x, i) => i);
        return response;
      }),
      catchError((error) => {
        this.level = 'error';
        this.messages = this.handleError.handleError(error)
        return EMPTY;
      })
    );
  }

  deleteTraining(trainResponse: AllenamentoResponse) {
    this.trainService.deleteAllenamento({'allenamento-nome' : trainResponse.name as string})
      .subscribe({
        next: () => {
          this.messages = ['Allenamento eliminato'];
          this.level = 'success';
          this.findAllMyTrain();
        },
        error: (error) => {
          this.messages = this.handleError.handleError(error);
          this.level = 'error';
        }
      });

  }

  editTraining(allenamentoResponse: AllenamentoResponse) {
    this.router.navigate([sub_appRoutingModule.full_manageTrainingPath , allenamentoResponse.id]);
  }

  openDetails(allenamento: AllenamentoResponse) {
    this.router.navigate([sub_appRoutingModule.full_trainingDetailsPath , allenamento.id]);
  }

  /*BOILERPLATE CODE*/
  gotToPage(page: number) {
    this._page = page;
    this.findAllMyTrain();
  }
  goToFirstPage() {
    this._page = 0;
    this.findAllMyTrain();
  }
  goToPreviousPage() {
    this._page --;
    this.findAllMyTrain();
  }
  goToLastPage() {
    this._page = this.totalPages as number - 1;
    this.findAllMyTrain();
  }
  goToNextPage() {
    this._page++;
    this.findAllMyTrain();
  }
  get isLastPage() {
    return this._page === this.totalPages as number - 1;
  }
  get isAddingPermitted() {
    return this._is_adding_permitted;
  }
  get newTrainLink(): string {
    return sub_appRoutingModule.full_manageTrainingPath;
  }
  get page(): number {
    return this._page;
  }
  get size(): number {
    return this._size;
  }
  get pages() {
    return this._pages;
  }
  /*
  Funzione di trackby utilizzata per evitare che angular ricarichi tutti i componenti della lista nell' ngfor
  */
  trackByAllenamentoResponse(index: number, training: AllenamentoResponse): string {
    return training.name as string;
  }
}
