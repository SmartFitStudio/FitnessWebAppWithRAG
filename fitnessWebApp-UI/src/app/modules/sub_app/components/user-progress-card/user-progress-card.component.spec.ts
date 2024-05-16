import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProgressCardComponent } from './user-progress-card.component';

describe('UserProgressCardComponent', () => {
  let component: UserProgressCardComponent;
  let fixture: ComponentFixture<UserProgressCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProgressCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProgressCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
