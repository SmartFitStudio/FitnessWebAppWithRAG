import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PianoAlimentareViewComponent } from './piano-alimentare-view.component';

describe('PianoAlimentareViewComponent', () => {
  let component: PianoAlimentareViewComponent;
  let fixture: ComponentFixture<PianoAlimentareViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PianoAlimentareViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PianoAlimentareViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
