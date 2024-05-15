import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainExerciseCardComponent } from './train-exercise-card.component';

describe('TrainExerciseCardComponent', () => {
  let component: TrainExerciseCardComponent;
  let fixture: ComponentFixture<TrainExerciseCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [TrainExerciseCardComponent]
});
    fixture = TestBed.createComponent(TrainExerciseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
