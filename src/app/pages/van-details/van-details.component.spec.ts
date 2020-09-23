import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VanDetailsComponent } from './van-details.component';

describe('VanDetailsComponent', () => {
  let component: VanDetailsComponent;
  let fixture: ComponentFixture<VanDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VanDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
