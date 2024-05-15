import { Component, Input} from '@angular/core';
import { EventSettingsModel, View, ScheduleModule } from '@syncfusion/ej2-angular-schedule';


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    standalone: true,
    imports: [ScheduleModule]
})
export class CalendarComponent{
  @Input({required: true}) eventSettings: EventSettingsModel = {};
  @Input() viewMode: View = 'Month';
}
