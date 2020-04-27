import { TestBed, async, inject } from '@angular/core/testing';

import { UserWithIdGuardGuard } from './user-with-id-guard.guard';

describe('UserWithIdGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserWithIdGuardGuard]
    });
  });

  it('should ...', inject([UserWithIdGuardGuard], (guard: UserWithIdGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
