import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialsComponent } from './industrials.component';

describe('IndustrialsComponent', () => {
  let component: IndustrialsComponent;
  let fixture: ComponentFixture<IndustrialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustrialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustrialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
