import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PageResponsePeriodoResponse, PeriodoResponse } from '../../../../services/models';
import { PeriodsService } from '../../../../services/services';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { PeriodCardComponent } from '../../components/period-card/period-card.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { MessageHandler } from '../../../../services/myServices/error-handler/MessageHandler';

@Component({
  selector: 'app-my-period-list',
  templateUrl: './my-period-list.component.html',
  styleUrls: ['./my-period-list.component.scss'],
  standalone: true,
  imports: [NgIf, RouterLink, NgFor, PeriodCardComponent, AsyncPipe, FeedbackInfoPointComponent]
})
export class MyPeriodListComponent extends MessageHandler implements OnInit {
  periodsResponse$!: Observable<PageResponsePeriodoResponse>;

  private totalPages? = 0;
  private _page = 0;
  private _size = 5;
  private _pages: any = [];
  private _is_adding_permitted = true;

  constructor(
    private periodsService: PeriodsService,
    private router: Router,
    @Inject(ErrorHandlerService) handleError: ErrorHandlerService
  ) {
    super(handleError);
  }

  ngOnInit(): void {
    this.findAllMyPeriods();
  }

  @Input()
  set isAddingPermitted(value: boolean) {
    this._is_adding_permitted = value;
  }

  private findAllMyPeriods() {
    this.periodsResponse$ = this.periodsService.findAllAuthenticatedUserPeriodoPaginated({
      page: this._page,
      size: this._size
    }).pipe(
      map((response: PageResponsePeriodoResponse) => {
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

  deletePeriod(periodResponse: PeriodoResponse) {
    this.periodsService.deletePeriodo({ 'periodo-id': periodResponse.id })
      .subscribe({
        next: () => {
          this._messages = ['Periodo eliminato'];
          this._level = 'success';
          this.findAllMyPeriods();
        },
        error: (error) => {
          this.handleErrorMessages(error);
        }
      });

  }

  editPeriod(periodResponse: PeriodoResponse) {
    this.router.navigate([sub_appRoutingModule.full_managePeriodPath, periodResponse.id]);
  }

  openDetails(periodResponse: PeriodoResponse) {
    this.router.navigate([sub_appRoutingModule.full_periodDetailsPath, periodResponse.id]);
  }

  /*BOILERPLATE CODE */
  gotToPage(page: number) {
    this._page = page;
    this.findAllMyPeriods();
  }

  goToFirstPage() {
    this._page = 0;
    this.findAllMyPeriods();
  }

  goToPreviousPage() {
    this._page--;
    this.findAllMyPeriods();
  }

  goToLastPage() {
    this._page = this.totalPages as number - 1;
    this.findAllMyPeriods();
  }

  goToNextPage() {
    this._page++;
    this.findAllMyPeriods();
  }

  get isLastPage() {
    return this._page === this.totalPages as number - 1;
  }
  get newPeriodsLink(): string {
    return sub_appRoutingModule.full_managePeriodPath;
  }
  get isAddingPermitted() {
    return this._is_adding_permitted;
  }
  get page() {
    return this._page;
  }
  get size() {
    return this._size;
  }
  get pages() {
    return this._pages;
  }
  /*
Funzione di trackby utilizzata per evitare che angular ricarichi tutti i componenti della lista nell' ngfor
*/
  trackByPeriodoResponse(index: number, periodo: PeriodoResponse): string {
    return periodo.name;
  }
}
