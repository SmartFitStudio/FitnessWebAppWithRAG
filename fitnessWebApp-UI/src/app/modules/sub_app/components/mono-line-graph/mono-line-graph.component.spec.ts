import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonoLineGraphComponent } from './mono-line-graph.component';

describe('MonoLineGraphComponent', () => {
  let component: MonoLineGraphComponent;
  let fixture: ComponentFixture<MonoLineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonoLineGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonoLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
