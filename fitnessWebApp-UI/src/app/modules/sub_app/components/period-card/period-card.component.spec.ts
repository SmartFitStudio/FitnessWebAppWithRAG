import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodCardComponent } from './period-card.component';

describe('PeriodCardComponent', () => {
  let component: PeriodCardComponent;
  let fixture: ComponentFixture<PeriodCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [PeriodCardComponent]
});
    fixture = TestBed.createComponent(PeriodCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
