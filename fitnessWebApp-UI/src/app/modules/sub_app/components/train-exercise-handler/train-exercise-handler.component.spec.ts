import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainExerciseHandlerComponent } from './train-exercise-handler.component';

describe('TrainExerciseHandlerComponent', () => {
  let component: TrainExerciseHandlerComponent;
  let fixture: ComponentFixture<TrainExerciseHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [TrainExerciseHandlerComponent]
});
    fixture = TestBed.createComponent(TrainExerciseHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
