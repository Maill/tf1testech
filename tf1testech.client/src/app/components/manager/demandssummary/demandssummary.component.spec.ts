import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandssummaryComponent } from './demandssummary.component';

describe('DemandssummaryComponent', () => {
  let component: DemandssummaryComponent;
  let fixture: ComponentFixture<DemandssummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemandssummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandssummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
