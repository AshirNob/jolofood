import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddpComponent } from './adddp.component';

describe('AdddpComponent', () => {
  let component: AdddpComponent;
  let fixture: ComponentFixture<AdddpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
