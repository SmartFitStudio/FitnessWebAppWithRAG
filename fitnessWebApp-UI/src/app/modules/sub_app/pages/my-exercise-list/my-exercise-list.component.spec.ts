import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExerciseListComponent } from './my-exercise-list.component';

describe('MyExerciseListComponent', () => {
  let component: MyExerciseListComponent;
  let fixture: ComponentFixture<MyExerciseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MyExerciseListComponent]
});
    fixture = TestBed.createComponent(MyExerciseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
