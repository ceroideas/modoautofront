import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishingRepComponent } from './publishing-rep.component';

describe('PublishingRepComponent', () => {
  let component: PublishingRepComponent;
  let fixture: ComponentFixture<PublishingRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishingRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishingRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
