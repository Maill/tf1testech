import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionformComponent } from './decisionform.component';

describe('DecisionformComponent', () => {
  let component: DecisionformComponent;
  let fixture: ComponentFixture<DecisionformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecisionformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecisionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
