import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AllenamentoResponse, PageResponseAllenamentoResponse } from '../../../../services/models';
import { TrainService } from '../../../../services//services';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { TrainCardComponent } from '../../components/train-card/train-card.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { MessageHandler } from '../../../../services/myServices/error-handler/MessageHandler';
import { PaginatedComponent } from '../../../../services/common/PaginatedComponent';

@Component({
  selector: 'app-my-train-list',
  templateUrl: './my-train-list.component.html',
  styleUrls: ['./my-train-list.component.scss'],
  standalone: true,
  imports: [NgIf, RouterLink, NgFor, TrainCardComponent, AsyncPipe, FeedbackInfoPointComponent]
})
export class MyTrainListComponent extends PaginatedComponent implements OnInit {
  trainingsResponse$!: Observable<PageResponseAllenamentoResponse>;

  private _is_adding_permitted = true;

  constructor(
    private trainService: TrainService,
    private router: Router,
    @Inject(ErrorHandlerService) handleError: ErrorHandlerService
  ) {
    super(handleError);
  }

  ngOnInit(): void {
    this.getData();
  }

  @Input()
  set isAddingPermitted(value: boolean) {
    this._is_adding_permitted = value;
  }

  protected override getData() {
    this.trainingsResponse$ = this.trainService.findAllAllenamentoByAuthenticatedUser({
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
        this.handleErrorMessages(error);
        return EMPTY;
      })
    );
  }

  deleteTraining(trainResponse: AllenamentoResponse) {
    this.trainService.deleteAllenamento({ 'allenamento-id': trainResponse.id as number })
      .subscribe({
        next: () => {
          this.addMessage('success', 'Allenamento eliminato');
          this.getData();
        },
        error: (error) => {
         this.handleErrorMessages(error);
        }
      });

  }

  editTraining(allenamentoResponse: AllenamentoResponse) {
    this.router.navigate([sub_appRoutingModule.full_manageTrainingPath, allenamentoResponse.id]);
  }

  openDetails(allenamento: AllenamentoResponse) {
    this.router.navigate([sub_appRoutingModule.full_trainingDetailsPath, allenamento.id]);
  }

  /*BOILERPLATE CODE*/
  get isAddingPermitted() {
    return this._is_adding_permitted;
  }
  get newTrainLink(): string {
    return sub_appRoutingModule.full_manageTrainingPath;
  }
  /*
  Funzione di trackby utilizzata per evitare che angular ricarichi tutti i componenti della lista nell' ngfor
  */
  trackByAllenamentoResponse(index: number, training: AllenamentoResponse): string {
    return training.name as string;
  }
}
