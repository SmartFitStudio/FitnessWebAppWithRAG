import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrainingComponent } from './manage-training.component';

describe('ManageTrainingComponent', () => {
  let component: ManageTrainingComponent;
  let fixture: ComponentFixture<ManageTrainingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ManageTrainingComponent]
});
    fixture = TestBed.createComponent(ManageTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
