import { TestBed } from '@angular/core/testing';

import { NavigationLogoutService } from './navigation-logout.service';

describe('NavigationLogoutService', () => {
  let service: NavigationLogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationLogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
