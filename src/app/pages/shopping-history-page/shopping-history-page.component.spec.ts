import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingHistoryPageComponent } from './shopping-history-page.component';

describe('ShoppingHistoryPageComponent', () => {
  let component: ShoppingHistoryPageComponent;
  let fixture: ComponentFixture<ShoppingHistoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingHistoryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
