import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishingMcycleComponent } from './publishing-mcycle.component';

describe('PublishingMcycleComponent', () => {
  let component: PublishingMcycleComponent;
  let fixture: ComponentFixture<PublishingMcycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishingMcycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishingMcycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
