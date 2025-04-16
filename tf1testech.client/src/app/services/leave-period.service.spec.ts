import { TestBed } from '@angular/core/testing';

import { LeavePeriodService } from './leave-period.service';

describe('LeavePeriodService', () => {
  let service: LeavePeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeavePeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
