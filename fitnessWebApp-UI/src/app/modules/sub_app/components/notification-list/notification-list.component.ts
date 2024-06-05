import { Component, Inject, Input, OnInit } from '@angular/core';

import { NotificaService } from '../../../../services/services';
import { NotificaResponse } from '../../../../services/models';
import { NotificationCardComponent } from '../notification-card/notification-card.component';
import { NgIf, NgFor } from '@angular/common';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';
import { MessageHandler } from '../../../../services/myServices/error-handler/MessageHandler';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, NotificationCardComponent, FeedbackInfoPointComponent, BadgeModule]
})
export class NotificationListComponent extends MessageHandler implements OnInit {
  seeAll: boolean = false;
  notificationNumber: number = 0;

  @Input() showErrors: boolean = false;
  
  private lista_notifiche?: NotificaResponse[];
  private ALREADY_GET_NOTIFICATIONS: boolean = false;

  constructor(private notificationService: NotificaService,
    @Inject(ErrorHandlerService) handleError: ErrorHandlerService) {
    super(handleError);
     }

  ngOnInit(): void {
    if(!this.ALREADY_GET_NOTIFICATIONS){
      console.log("getTodayNotification");
      this.notificationService.getTodayNotification().subscribe({
        next: notifiche => {
          this.lista_notifiche = notifiche;
          this.ALREADY_GET_NOTIFICATIONS = true;
          this.notificationNumber = this.lista_notifiche? this.lista_notifiche.filter(not => !not.read).length: 0;
        },
        error: error => {
          this.handleErrorMessages(error);
        }
      })
    }

  }

  /*
    * Segna come letta la notifica
    *@param $event id della notifica
  */
  markAsRead($event: number) {
    this.notificationService.signNotificationAsRead({ id: $event }).subscribe({
      error: error => {
        this.handleErrorMessages(error);
      }
    }
    );
  }
  changeState() {
    this.seeAll = !this.seeAll;
  }

  //BOILERPLATE CODE
  get notifiche(): NotificaResponse[] {
    return this.lista_notifiche? this.lista_notifiche: [];
  }
  get isThereAnyNotificationToRead(): boolean {
    if (this.lista_notifiche) {
      return this.lista_notifiche.filter(notifica => notifica.read == false).length > 0;
    }
    return false;
  }
}
