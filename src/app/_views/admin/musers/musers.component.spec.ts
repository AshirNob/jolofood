import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusersComponent } from './musers.component';

describe('MusersComponent', () => {
  let component: MusersComponent;
  let fixture: ComponentFixture<MusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
