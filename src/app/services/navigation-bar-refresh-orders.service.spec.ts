import { TestBed } from '@angular/core/testing';

import { NavigationBarRefreshOrdersService } from './navigation-bar-refresh-orders.service';

describe('NavigationBarRefreshOrdersService', () => {
  let service: NavigationBarRefreshOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationBarRefreshOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
