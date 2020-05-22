import { TestBed } from '@angular/core/testing';

import { RefreshUsersProductsService } from './refresh-users-products.service';

describe('RefreshUsersProductsService', () => {
  let service: RefreshUsersProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshUsersProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
