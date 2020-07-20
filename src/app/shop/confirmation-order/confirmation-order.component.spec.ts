import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationOrderComponent } from './confirmation-order.component';

describe('ConfirmationOrderComponent', () => {
  let component: ConfirmationOrderComponent;
  let fixture: ComponentFixture<ConfirmationOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
