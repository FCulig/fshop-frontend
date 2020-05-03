import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGroupFormComponent } from './category-group-form.component';

describe('CategoryGroupFormComponent', () => {
  let component: CategoryGroupFormComponent;
  let fixture: ComponentFixture<CategoryGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
