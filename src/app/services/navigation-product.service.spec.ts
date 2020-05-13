import { TestBed } from '@angular/core/testing';

import { NavigationProductService } from './navigation-product.service';

describe('NavigationProductService', () => {
  let service: NavigationProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
