import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateleaveperiodComponent } from './createleaveperiod.component';

describe('CreateleaveperiodComponent', () => {
  let component: CreateleaveperiodComponent;
  let fixture: ComponentFixture<CreateleaveperiodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateleaveperiodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateleaveperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
