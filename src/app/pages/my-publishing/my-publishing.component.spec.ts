import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPublishingComponent } from './my-publishing.component';

describe('MyPublishingComponent', () => {
  let component: MyPublishingComponent;
  let fixture: ComponentFixture<MyPublishingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPublishingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPublishingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
