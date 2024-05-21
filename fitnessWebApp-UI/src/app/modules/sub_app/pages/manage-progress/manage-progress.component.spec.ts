import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProgressComponent } from './manage-progress.component';

describe('ManageProgressComponent', () => {
  let component: ManageProgressComponent;
  let fixture: ComponentFixture<ManageProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
