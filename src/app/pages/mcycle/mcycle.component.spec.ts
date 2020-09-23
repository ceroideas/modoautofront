import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McycleComponent } from './mcycle.component';

describe('McycleComponent', () => {
  let component: McycleComponent;
  let fixture: ComponentFixture<McycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
