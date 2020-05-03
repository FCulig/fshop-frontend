import { TestBed } from '@angular/core/testing';

import { PromotionRequestsService } from './promotion-requests.service';

describe('PromotionRequestsService', () => {
  let service: PromotionRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotionRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
