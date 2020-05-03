import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionRequestManagerComponent } from './promotion-request-manager.component';

describe('PromotionRequestManagerComponent', () => {
  let component: PromotionRequestManagerComponent;
  let fixture: ComponentFixture<PromotionRequestManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionRequestManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionRequestManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
