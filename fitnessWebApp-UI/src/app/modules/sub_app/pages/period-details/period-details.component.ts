import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeriodoAllenamentoResponse } from '../../../../services//models';
import { PeriodManagerService } from '../../services/period-manager-service/period-manager.service';
import { ObbiettivoPeriodo } from '../../../../services//myModels/obbiettivoPeriodo';
import { EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { ObiettivoPeriodoPipePipe } from '../../services/pipes/obiettivo-periodo-pipe.pipe';
import { CalendarComponent } from '../../components/calendar/calendar.component';

@Component({
    selector: 'app-period-details',
    templateUrl: './period-details.component.html',
    styleUrls: ['./period-details.component.scss'],
    providers: [PeriodManagerService] // Fornisce il servizio a livello di componente
    ,
    standalone: true,
    imports: [CalendarComponent, ObiettivoPeriodoPipePipe]
})
export class PeriodDetailsComponent implements OnInit {

  private _eventSetting: EventSettingsModel = {};
  private infoTaken: boolean = false;
  constructor(private periodManagerService: PeriodManagerService,
  private activatedRoute: ActivatedRoute) {
    this._eventSetting.allowAdding = false;
    this._eventSetting.allowDeleting = false;
    this._eventSetting.allowEditing = false;
   }

  ngOnInit(): void {
    const period_id = this.activatedRoute.snapshot.params['period_id'];
    if (period_id) {
      let periodInfoSubscription$ = this.periodManagerService.setInfoByPeriodName$(period_id).subscribe({
        complete: () => {
          periodInfoSubscription$.unsubscribe();
          this._eventSetting.dataSource = this.periodManagerService.getScheduleEvents(20);
          this.infoTaken = true;
          periodInfoSubscription$.unsubscribe();
        }
      });
    }
  }


  get period_name(): string {
    return this.periodManagerService.periodoName;
  }

  get period_obiettivo(): ObbiettivoPeriodo {
    return this.periodManagerService.periodoObiettivo;
  }

  get period_durata_in_giorni(): number {
    return this.periodManagerService.periodoDurataInGiorni;
  }

  get period_data_inizio(): string {
    return this.periodManagerService.periodoDataInizio;
  }

  get period_data_fine(): string {
    return this.periodManagerService.periodoDataFine;
  }

  get allenamentoPeriodoResponseList(): PeriodoAllenamentoResponse[] {
    return this.periodManagerService.allenamentoPeriodoResponseList;
  }


  get eventSettings(): EventSettingsModel  {
    if (!this.infoTaken) {
      return {};
    }
    return this._eventSetting

  }

}
