import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McyclesComponent } from './mcycles.component';

describe('McyclesComponent', () => {
  let component: McyclesComponent;
  let fixture: ComponentFixture<McyclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McyclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
