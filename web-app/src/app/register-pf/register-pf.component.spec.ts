import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPFComponent } from './register-pf.component';

describe('RegisterPFComponent', () => {
  let component: RegisterPFComponent;
  let fixture: ComponentFixture<RegisterPFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
