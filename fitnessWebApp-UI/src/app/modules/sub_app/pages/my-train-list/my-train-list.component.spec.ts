import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTrainListComponent } from './my-train-list.component';

describe('MyTrainListComponent', () => {
  let component: MyTrainListComponent;
  let fixture: ComponentFixture<MyTrainListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MyTrainListComponent]
});
    fixture = TestBed.createComponent(MyTrainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
