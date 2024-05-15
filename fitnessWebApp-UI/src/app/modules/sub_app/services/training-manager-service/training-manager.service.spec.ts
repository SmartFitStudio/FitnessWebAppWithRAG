import { TestBed } from '@angular/core/testing';

import { TrainingManagerService } from './training-manager.service';

describe('TrainingManagerService', () => {
  let service: TrainingManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
