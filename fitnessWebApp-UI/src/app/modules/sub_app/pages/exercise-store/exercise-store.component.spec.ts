import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseStoreComponent } from './exercise-store.component';

describe('ExerciseStoreComponent', () => {
  let component: ExerciseStoreComponent;
  let fixture: ComponentFixture<ExerciseStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ExerciseStoreComponent]
});
    fixture = TestBed.createComponent(ExerciseStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
