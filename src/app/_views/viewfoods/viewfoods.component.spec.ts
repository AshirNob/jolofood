import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfoodsComponent } from './viewfoods.component';

describe('ViewfoodsComponent', () => {
  let component: ViewfoodsComponent;
  let fixture: ComponentFixture<ViewfoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewfoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewfoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
