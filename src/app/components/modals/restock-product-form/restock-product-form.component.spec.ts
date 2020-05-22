import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestockProductFormComponent } from './restock-product-form.component';

describe('RestockProductFormComponent', () => {
  let component: RestockProductFormComponent;
  let fixture: ComponentFixture<RestockProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestockProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestockProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
