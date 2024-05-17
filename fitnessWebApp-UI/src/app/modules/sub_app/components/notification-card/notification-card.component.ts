import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NotificaResponse } from '../../../../services/models';
import { NgIf } from '@angular/common';
@Component({
    selector: 'app-notification-card',
    templateUrl: './notification-card.component.html',
    styleUrls: ['./notification-card.component.scss'],
    standalone: true,
    imports: [NgIf]
})
export class NotificationCardComponent {

  @Input({required: true}) notifica!: NotificaResponse;

  @Output() private markAsRead: EventEmitter<number> = new EventEmitter<number>();
  close_notification(){
    console.log("close_notification");
    this.notifica.read = true;
    this.markAsRead.emit(this.notifica.id);
  }
}
