import { ErrorHandler, NgModule } from '@angular/core';

import { sub_appRoutingModule } from './sub_app-routing.module';
import { AgendaService, DayService, WeekService, WorkWeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { ErrorHandlerService } from '../../services/myServices/error-handler/error-handler.service';


@NgModule({
  imports: [
    sub_appRoutingModule,
  ],
  providers: [AgendaService, DayService, WeekService, WorkWeekService, MonthService,  {
    provide: ErrorHandler,
    useClass: ErrorHandlerService
  }],
})
export class sub_appModule { }
