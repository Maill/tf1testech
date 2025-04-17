import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleaveperiodComponent } from './detailleaveperiod.component';

describe('DetailleaveperiodComponent', () => {
  let component: DetailleaveperiodComponent;
  let fixture: ComponentFixture<DetailleaveperiodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailleaveperiodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailleaveperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
