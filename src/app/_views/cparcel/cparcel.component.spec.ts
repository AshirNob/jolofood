import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CparcelComponent } from './cparcel.component';

describe('CparcelComponent', () => {
  let component: CparcelComponent;
  let fixture: ComponentFixture<CparcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CparcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CparcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
