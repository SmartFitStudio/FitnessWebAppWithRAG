import { Component, Inject, OnInit } from '@angular/core';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { PeriodManagerService } from '../../services/period-manager-service/period-manager.service';
import { ScheduleEvent } from '../../services/models/scheduleEvent';
import { PeriodsService } from '../../../../services/services';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { UserProgressCardComponent } from '../../components/user-progress-card/user-progress-card.component';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { RouterLink } from '@angular/router';
import { MessageHandler } from '../../../../services/myServices/error-handler/MessageHandler';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [CalendarComponent, UserProgressCardComponent, RouterLink],
})
export class HomePageComponent extends MessageHandler implements OnInit {
  viewMode: View = 'Agenda';

  private _eventSetting: EventSettingsModel = {};
  private events: ScheduleEvent[] = [];

  constructor(
    private periodManagerService: PeriodManagerService,
    private periodoService: PeriodsService, //Il periodo attivo è ottenuto tramite singleton dell'istanza di periodManagerService creata nel main
    @Inject(ErrorHandlerService) handleError: ErrorHandlerService
  ) {
    super(handleError);
    //impostazioni per il calendario
    this._eventSetting.allowAdding = false;
    this._eventSetting.allowDeleting = false;
    this._eventSetting.allowEditing = false;
  }

  ngOnInit(): void {
    this.periodoService.findAuthenticatedUserActivePeriodo().subscribe({
      next: (response) => {
        if (response && response.id != null && response.id != undefined) {
          let periodInfoSubscription$ = this.periodManagerService.setInfoByPeriodName$(response.id).subscribe({
            complete: () => {
              periodInfoSubscription$.unsubscribe();
              this.events = this.periodManagerService.getScheduleEvents(20);
              console.log(this.events);
            },
            error: (error) => {
              this.handleErrorMessages(error);
            }
          });
        }
      }
    });
  }

  /*BOILERPLATE CODE */

  get eventSettings(): EventSettingsModel {
    if (this.events.length === 0) {
      this.events = this.periodManagerService.getScheduleEvents(20); //ripetizione ma devo perche  this._eventSetting.dataSource non è una collection
      this._eventSetting.dataSource = this.events;
      return {};//Empty eventSetting object
    }
    return this._eventSetting;
  }


  //LINKS
  get newProgressoLink(): string {
    return sub_appRoutingModule.full_manageProgressPath;
  }
}
