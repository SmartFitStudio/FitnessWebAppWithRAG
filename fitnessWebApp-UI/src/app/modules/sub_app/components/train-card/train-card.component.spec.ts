import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainCardComponent } from './train-card.component';

describe('TrainCardComponent', () => {
  let component: TrainCardComponent;
  let fixture: ComponentFixture<TrainCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [TrainCardComponent]
});
    fixture = TestBed.createComponent(TrainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
