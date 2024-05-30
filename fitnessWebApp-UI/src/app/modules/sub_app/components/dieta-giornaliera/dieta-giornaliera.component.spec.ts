import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaGiornalieraComponent } from './dieta-giornaliera.component';

describe('DietaGiornalieraComponent', () => {
  let component: DietaGiornalieraComponent;
  let fixture: ComponentFixture<DietaGiornalieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DietaGiornalieraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DietaGiornalieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
