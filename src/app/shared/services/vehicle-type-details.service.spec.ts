import { TestBed } from '@angular/core/testing';

import { VehicleTypeDetailsService } from './vehicle-type-details.service';

describe('VehicleTypeDetailsService', () => {
  let service: VehicleTypeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleTypeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
