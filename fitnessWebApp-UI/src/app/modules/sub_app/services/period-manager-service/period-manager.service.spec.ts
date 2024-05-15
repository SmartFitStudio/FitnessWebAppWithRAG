import { TestBed } from '@angular/core/testing';

import { PeriodManagerService } from './period-manager.service';

describe('PeriodManagerService', () => {
  let service: PeriodManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
