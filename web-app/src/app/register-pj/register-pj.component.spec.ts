import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPJComponent } from './register-pj.component';

describe('RegisterPJComponent', () => {
  let component: RegisterPJComponent;
  let fixture: ComponentFixture<RegisterPJComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPJComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPJComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
