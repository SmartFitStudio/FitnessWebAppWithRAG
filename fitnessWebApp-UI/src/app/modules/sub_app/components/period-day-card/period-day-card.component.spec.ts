import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodDayCardComponent } from './period-day-card.component';

describe('PeriodDayCardComponent', () => {
  let component: PeriodDayCardComponent;
  let fixture: ComponentFixture<PeriodDayCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [PeriodDayCardComponent]
});
    fixture = TestBed.createComponent(PeriodDayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
