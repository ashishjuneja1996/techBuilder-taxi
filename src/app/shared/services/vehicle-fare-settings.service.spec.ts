import { TestBed } from '@angular/core/testing';

import { VehicleFareSettingsService } from './vehicle-fare-settings.service';

describe('VehicleFareSettingsService', () => {
  let service: VehicleFareSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleFareSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
