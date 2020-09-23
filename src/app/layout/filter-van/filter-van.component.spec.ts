import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterVanComponent } from './filter-van.component';

describe('FilterVanComponent', () => {
  let component: FilterVanComponent;
  let fixture: ComponentFixture<FilterVanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterVanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterVanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
