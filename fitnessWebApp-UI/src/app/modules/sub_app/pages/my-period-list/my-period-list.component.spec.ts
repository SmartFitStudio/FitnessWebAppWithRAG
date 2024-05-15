import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPeriodListComponent } from './my-period-list.component';

describe('MyPeriodListComponent', () => {
  let component: MyPeriodListComponent;
  let fixture: ComponentFixture<MyPeriodListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MyPeriodListComponent]
});
    fixture = TestBed.createComponent(MyPeriodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
