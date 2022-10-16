import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdespachoComponent } from './listdespacho.component';

describe('ListdespachoComponent', () => {
  let component: ListdespachoComponent;
  let fixture: ComponentFixture<ListdespachoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdespachoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
