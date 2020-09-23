import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMcycleComponent } from './filter-mcycle.component';

describe('FilterMcycleComponent', () => {
  let component: FilterMcycleComponent;
  let fixture: ComponentFixture<FilterMcycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterMcycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMcycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
