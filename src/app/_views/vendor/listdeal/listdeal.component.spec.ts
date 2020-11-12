import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdealComponent } from './listdeal.component';

describe('ListdealComponent', () => {
  let component: ListdealComponent;
  let fixture: ComponentFixture<ListdealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
