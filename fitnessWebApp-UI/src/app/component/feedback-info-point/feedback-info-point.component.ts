import { AfterContentInit, Component, ContentChild, ElementRef, Input } from '@angular/core';
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
export class FeedbackInfoPointComponent implements AfterContentInit  {
  hasContent: boolean = false;

  ngAfterContentInit(): void {
    this.hasContent = !!this.content?.nativeElement.innerHTML.trim();
  }
  @ContentChild('content') content: ElementRef | undefined;
  private _level: 'success' | 'error' = 'success';
  private _messages: Message[] | undefined;

  @Input()
  get messages(): Message[] {
    return this._messages? this._messages : [];
  }
  set messages(value: Message[] | undefined) {
    this._messages = value;
  }

  @Input()
  get level(): string {
    return this._level;
  }
  set level(value: 'success' | 'error') {
    this._level = value;
  }
}

