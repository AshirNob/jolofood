import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpdashboardComponent } from './dpdashboard.component';

describe('DpdashboardComponent', () => {
  let component: DpdashboardComponent;
  let fixture: ComponentFixture<DpdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
