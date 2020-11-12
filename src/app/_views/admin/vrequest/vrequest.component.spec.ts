import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrequestComponent } from './vrequest.component';

describe('VrequestComponent', () => {
  let component: VrequestComponent;
  let fixture: ComponentFixture<VrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
