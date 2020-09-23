import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishingVanComponent } from './publishing-van.component';

describe('PublishingVanComponent', () => {
  let component: PublishingVanComponent;
  let fixture: ComponentFixture<PublishingVanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishingVanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishingVanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
