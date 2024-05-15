import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodInputTrainingCardComponent } from './period-input-training-card.component';

describe('PeriodInputTrainingCardComponent', () => {
  let component: PeriodInputTrainingCardComponent;
  let fixture: ComponentFixture<PeriodInputTrainingCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [PeriodInputTrainingCardComponent]
});
    fixture = TestBed.createComponent(PeriodInputTrainingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
