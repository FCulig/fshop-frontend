import { TestBed } from '@angular/core/testing';

import { CartSummaryGuard } from './cart-summary.guard';

describe('CartSummaryGuard', () => {
  let guard: CartSummaryGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CartSummaryGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
