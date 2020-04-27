import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersProductsPageComponent } from './users-products-page.component';

describe('UsersProductsPageComponent', () => {
  let component: UsersProductsPageComponent;
  let fixture: ComponentFixture<UsersProductsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersProductsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
