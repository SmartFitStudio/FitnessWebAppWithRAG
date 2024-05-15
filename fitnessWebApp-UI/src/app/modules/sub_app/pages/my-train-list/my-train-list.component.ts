import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AllenamentoResponse, PageResponseAllenamentoResponse } from '../../../../services/models';
import { TrainService } from '../../../../services//services';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { Observable, map } from 'rxjs';
import { TrainCardComponent } from '../../components/train-card/train-card.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-my-train-list',
    templateUrl: './my-train-list.component.html',
    styleUrls: ['./my-train-list.component.scss'],
    standalone: true,
    imports: [NgIf, RouterLink, NgFor, TrainCardComponent, AsyncPipe]
})
export class MyTrainListComponent implements OnInit {
  trainingsResponse$!: Observable<PageResponseAllenamentoResponse>;
  totalPages? = 0;
  page = 0;
  size = 5;
  pages: any = [];
  message = '';
  level: 'success' |'error' = 'success';


  private _is_adding_permitted = true;

  constructor(
    private trainService: TrainService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.findAllMyTrain();
  }

  /*
  Funzione di trackby utilizzata per evitare che angular ricarichi tutti i componenti della lista nell' ngfor
  */
  trackByAllenamentoResponse(index: number, training: AllenamentoResponse): string {
    return training.name as string;
  }

  @Input()
  set isAddingPermitted(value: boolean) {
    this._is_adding_permitted = value;
  }

  get isAddingPermitted() {
    return this._is_adding_permitted;
  }

  get newTrainLink(): string {
    return sub_appRoutingModule.full_manageTrainingPath;
  }

  private findAllMyTrain() {
    this.trainingsResponse$ = this.trainService.findAllAllenamentoByCreator({
      page: this.page,
      size: this.size
    }).pipe(
      map((response: PageResponseAllenamentoResponse) => {
        this.totalPages = response.totalPages;
         this.pages = Array(response.totalPages)
            .fill(0)
            .map((x, i) => i);
        return response;
      })
    );
  }

  deleteTraining(trainResponse: AllenamentoResponse) {
    this.trainService.deleteAllenamento({'allenamento-nome' : trainResponse.name as string})
      .subscribe({
        next: () => {
          this.message = 'Allenamento eliminato';
          this.level = 'success';
          this.findAllMyTrain();
        },
        error: () => {
          this.message = 'Qualcosa è andato storto';
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

  gotToPage(page: number) {
    this.page = page;
    this.findAllMyTrain();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllMyTrain();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllMyTrain();
  }

  goToLastPage() {
    this.page = this.totalPages as number - 1;
    this.findAllMyTrain();
  }

  goToNextPage() {
    this.page++;
    this.findAllMyTrain();
  }

  get isLastPage() {
    return this.page === this.totalPages as number - 1;
  }
}
