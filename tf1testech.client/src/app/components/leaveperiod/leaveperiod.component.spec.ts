import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveperiodComponent } from './leaveperiod.component';

describe('LeaveperiodComponent', () => {
  let component: LeaveperiodComponent;
  let fixture: ComponentFixture<LeaveperiodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveperiodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
