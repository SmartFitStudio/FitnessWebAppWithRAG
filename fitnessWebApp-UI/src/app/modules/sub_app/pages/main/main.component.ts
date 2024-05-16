import { Component, OnInit } from '@angular/core';
import { PeriodsService } from '../../../../services/services';
import { PeriodManagerService } from '../../services/period-manager-service/period-manager.service';
import { ScheduleEvent } from '../../services/models/scheduleEvent';
import { RouterOutlet } from '@angular/router';
import { NotificationListComponent } from '../../components/notification-list/notification-list.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    standalone: true,
    imports: [
        MenuComponent,
        NotificationListComponent,
        RouterOutlet,
        ChatbotComponent
    ],
})

export class MainComponent {

}
