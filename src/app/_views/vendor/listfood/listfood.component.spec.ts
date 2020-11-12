import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfoodComponent } from './listfood.component';

describe('ListfoodComponent', () => {
  let component: ListfoodComponent;
  let fixture: ComponentFixture<ListfoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListfoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
