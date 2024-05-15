import { NgModule } from '@angular/core';

import { sub_appRoutingModule } from './sub_app-routing.module';
import { AgendaService, DayService, WeekService, WorkWeekService, MonthService } from '@syncfusion/ej2-angular-schedule';


@NgModule({
  imports: [
    sub_appRoutingModule,
  ],
  providers: [AgendaService, DayService, WeekService, WorkWeekService, MonthService],
})
export class sub_appModule { }
