import { TestBed } from '@angular/core/testing';

import { CategoryGroupService } from './category-group.service';

describe('CategoryGroupService', () => {
  let service: CategoryGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
