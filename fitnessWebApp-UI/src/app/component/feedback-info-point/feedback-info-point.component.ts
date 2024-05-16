import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-info-point',
  standalone: true,
  imports: [],
  templateUrl: './feedback-info-point.component.html',
  styleUrl: './feedback-info-point.component.scss'
})
export class FeedbackInfoPointComponent {
  private _level: 'success' |'error' = 'success';

  @Input()
  get level(): string {
    return this._level;
  }
  set level(value: 'success' |'error') {
    this._level = value;
  }
}

