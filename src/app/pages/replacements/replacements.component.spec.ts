import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplacementsComponent } from './replacements.component';

describe('ReplacementsComponent', () => {
  let component: ReplacementsComponent;
  let fixture: ComponentFixture<ReplacementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplacementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
