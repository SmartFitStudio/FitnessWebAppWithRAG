import { Component, OnInit } from '@angular/core';

import { NotificaService } from '../../../../services/services';
import { NotificaResponse } from '../../../../services/models';
import { NotificationCardComponent } from '../notification-card/notification-card.component';
import { NgIf, NgFor } from '@angular/common';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, NotificationCardComponent, FeedbackInfoPointComponent]
})
export class NotificationListComponent implements OnInit {
  messages: string[] = [];
  level: 'success' | 'error' = 'success';
  seeAll: boolean = false;

  private lista_notifiche: NotificaResponse[] = [];
  constructor(private notificationService: NotificaService,
    private handleError: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.notificationService.getTodayNotification().subscribe({
      next: notifiche => {
        this.lista_notifiche = notifiche;
      },
      error: error => {
        this.level = 'error';
        this.messages = this.handleError.handleError(error);
      }
    })
  }

  /*
    * Segna come letta la notifica
    *@param $event id della notifica
  */
  markAsRead($event: number) {
    this.notificationService.signNotificationAsRead({ id: $event }).subscribe({
      error: error => {
        this.level = 'error';
        this.messages = this.handleError.handleError(error);
      }
    }
    );
  }
  changeState() {
    this.seeAll = !this.seeAll;
  }

  //BOILERPLATE CODE
  get notifiche(): NotificaResponse[] {
    return this.lista_notifiche;
  }
  get isThereAnyNotificationToRead(): boolean {
    if (this.lista_notifiche) {
      return this.lista_notifiche.filter(notifica => notifica.read == false).length > 0;
    }
    return false;
  }
}
