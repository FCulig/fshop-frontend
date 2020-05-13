import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishShoppingPageComponent } from './finish-shopping-page.component';

describe('FinishShoppingPageComponent', () => {
  let component: FinishShoppingPageComponent;
  let fixture: ComponentFixture<FinishShoppingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishShoppingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishShoppingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
