import { Component, Input } from '@angular/core';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-feedback-info-point',
  standalone: true,
  imports: [NgIf, MessagesModule],
  templateUrl: './feedback-info-point.component.html',
  styleUrl: './feedback-info-point.component.scss'
})
export class FeedbackInfoPointComponent {
  private _messages: Message[] | undefined;

  @Input()
  get messages(): Message[] {
    return this._messages? this._messages : [];
  }
  set messages(value: Message[] | undefined) {
    this._messages = value;
  }
}

