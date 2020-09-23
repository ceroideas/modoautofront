import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterIndComponent } from './filter-ind.component';

describe('FilterIndComponent', () => {
  let component: FilterIndComponent;
  let fixture: ComponentFixture<FilterIndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterIndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterIndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
