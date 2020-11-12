import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VdashboardComponent } from './vdashboard.component';

describe('VdashboardComponent', () => {
  let component: VdashboardComponent;
  let fixture: ComponentFixture<VdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
