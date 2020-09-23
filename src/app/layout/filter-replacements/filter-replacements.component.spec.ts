import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterReplacementsComponent } from './filter-replacements.component';

describe('FilterReplacementsComponent', () => {
  let component: FilterReplacementsComponent;
  let fixture: ComponentFixture<FilterReplacementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterReplacementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterReplacementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
