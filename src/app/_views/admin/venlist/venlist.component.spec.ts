import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenlistComponent } from './venlist.component';

describe('VenlistComponent', () => {
  let component: VenlistComponent;
  let fixture: ComponentFixture<VenlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
