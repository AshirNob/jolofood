import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DplistComponent } from './dplist.component';

describe('DplistComponent', () => {
  let component: DplistComponent;
  let fixture: ComponentFixture<DplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
