import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPeriodCardComponent } from './training-period-card.component';

describe('TrainingPeriodCardComponent', () => {
  let component: TrainingPeriodCardComponent;
  let fixture: ComponentFixture<TrainingPeriodCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [TrainingPeriodCardComponent]
});
    fixture = TestBed.createComponent(TrainingPeriodCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
