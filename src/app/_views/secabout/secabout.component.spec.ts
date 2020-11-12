import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecaboutComponent } from './secabout.component';

describe('SecaboutComponent', () => {
  let component: SecaboutComponent;
  let fixture: ComponentFixture<SecaboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecaboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
