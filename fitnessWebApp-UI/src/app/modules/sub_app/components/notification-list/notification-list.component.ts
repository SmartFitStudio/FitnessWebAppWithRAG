import { Component, OnInit } from '@angular/core';

import { NotificaService } from '../../../../services/services';
import { NotificaResponse } from '../../../../services/models';
import { NotificationCardComponent } from '../notification-card/notification-card.component';
import { NgIf, NgFor } from '@angular/common';
@Component({
    selector: 'app-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, NotificationCardComponent]
})
export class NotificationListComponent implements OnInit {

  private lista_notifiche: NotificaResponse[] = [];
  constructor(private notificationService: NotificaService) { }

  seeAll: boolean = false;

  ngOnInit(): void {
    this.notificationService.getTodayNotification().subscribe({
      next: notifiche => {
        this.lista_notifiche = notifiche;
      },
      error: error => {
        console.log(error);
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
        console.log(error);
      }
    }
    );
  }

  get notifiche(): NotificaResponse[] {
    return this.lista_notifiche;
  }

  get isThereAnyNotificationToRead(): boolean {
    if (this.lista_notifiche ) {
      return this.lista_notifiche.filter(notifica => notifica.read == false).length > 0 ;
    }
    return false;
  }

  changeState() {
    this.seeAll = !this.seeAll;
  }

}
