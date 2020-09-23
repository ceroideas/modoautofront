import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishingIndComponent } from './publishing-ind.component';

describe('PublishingIndComponent', () => {
  let component: PublishingIndComponent;
  let fixture: ComponentFixture<PublishingIndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishingIndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishingIndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
