import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExerciseComponent } from './manage-exercise.component';

describe('ManageExerciseComponent', () => {
  let component: ManageExerciseComponent;
  let fixture: ComponentFixture<ManageExerciseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ManageExerciseComponent]
});
    fixture = TestBed.createComponent(ManageExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
