import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePeriodComponent } from './manage-period.component';

describe('ManagePeriodComponent', () => {
  let component: ManagePeriodComponent;
  let fixture: ComponentFixture<ManagePeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ManagePeriodComponent]
});
    fixture = TestBed.createComponent(ManagePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
