import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AllenamentoResponse, PageResponseAllenamentoResponse, PageResponsePeriodoAllenamentoResponse, PageResponsePeriodoResponse, PeriodoResponse } from '../../../../services/models';
import { PeriodsService, TrainService } from '../../../../services/services';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { Observable, map } from 'rxjs';
import { PeriodCardComponent } from '../../components/period-card/period-card.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-my-period-list',
    templateUrl: './my-period-list.component.html',
    styleUrls: ['./my-period-list.component.scss'],
    standalone: true,
    imports: [NgIf, RouterLink, NgFor, PeriodCardComponent, AsyncPipe]
})
export class MyPeriodListComponent implements OnInit {
  periodsResponse$!: Observable<PageResponsePeriodoResponse>;
  totalPages? = 0;
  page = 0;
  size = 5;
  pages: any = [];
  message = '';
  level: 'success' |'error' = 'success';


  private _is_adding_permitted = true;

  constructor(
    private periodsService: PeriodsService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.findAllMyPeriods();
  }

  /*
  Funzione di trackby utilizzata per evitare che angular ricarichi tutti i componenti della lista nell' ngfor
  */
  trackByPeriodoResponse(index: number, periodo: PeriodoResponse): string{
      return periodo.name ;
  }

  @Input()
  get isAddingPermitted() {
    return this._is_adding_permitted;
  }
  set isAddingPermitted(value: boolean) {
    this._is_adding_permitted = value;
  }



  get newPeriodsLink(): string {
    return sub_appRoutingModule.full_managePeriodPath; 
  }

  private findAllMyPeriods() {
    this.periodsResponse$ = this.periodsService.findAllPeriodoByCreator({
      page: this.page,
      size: this.size
    }).pipe(
      map((response: PageResponsePeriodoResponse) => {
        this.totalPages = response.totalPages;
         this.pages = Array(response.totalPages)
            .fill(0)
            .map((x, i) => i);
        return response;
      })
    );
  }

  deletePeriod(periodResponse: PeriodoResponse) {
    this.periodsService.deletePeriodo({'periodo-nome' : periodResponse.name})
      .subscribe({
        next: () => {
          this.message = 'Periodo eliminato';
          this.level = 'success';
          this.findAllMyPeriods();
        },
        error: () => {
          this.message = 'Qualcosa è andato storto';
          this.level = 'error';
        }
      });

  }

  editPeriod(periodResponse: PeriodoResponse) {
    this.router.navigate([sub_appRoutingModule.full_managePeriodPath , periodResponse.id]);
  }

  openDetails(periodResponse: PeriodoResponse) {
    this.router.navigate([sub_appRoutingModule.full_periodDetailsPath , periodResponse.id]);
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllMyPeriods();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllMyPeriods();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllMyPeriods();
  }

  goToLastPage() {
    this.page = this.totalPages as number - 1;
    this.findAllMyPeriods();
  }

  goToNextPage() {
    this.page++;
    this.findAllMyPeriods();
  }

  get isLastPage() {
    return this.page === this.totalPages as number - 1;
  }
}
