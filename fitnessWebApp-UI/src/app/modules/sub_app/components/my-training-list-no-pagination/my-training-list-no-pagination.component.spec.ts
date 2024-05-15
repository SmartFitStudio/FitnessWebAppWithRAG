import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTrainingListNoPaginationComponent } from './my-training-list-no-pagination.component';

describe('MyTrainingListNoPaginationComponent', () => {
  let component: MyTrainingListNoPaginationComponent;
  let fixture: ComponentFixture<MyTrainingListNoPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MyTrainingListNoPaginationComponent]
});
    fixture = TestBed.createComponent(MyTrainingListNoPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
