import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackInfoPointComponent } from './feedback-info-point.component';

describe('FeedbackInfoPointComponent', () => {
  let component: FeedbackInfoPointComponent;
  let fixture: ComponentFixture<FeedbackInfoPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackInfoPointComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackInfoPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
