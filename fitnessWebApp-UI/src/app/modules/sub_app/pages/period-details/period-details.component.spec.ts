import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodDetailsComponent } from './period-details.component';

describe('PeriodDetailsComponent', () => {
  let component: PeriodDetailsComponent;
  let fixture: ComponentFixture<PeriodDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [PeriodDetailsComponent]
});
    fixture = TestBed.createComponent(PeriodDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
