import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetleaveperiodComponent } from './getleaveperiod.component';

describe('GetleaveperiodComponent', () => {
  let component: GetleaveperiodComponent;
  let fixture: ComponentFixture<GetleaveperiodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetleaveperiodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetleaveperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
