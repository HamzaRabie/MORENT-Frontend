import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSpecs } from './car-specs';

describe('CarSpecs', () => {
  let component: CarSpecs;
  let fixture: ComponentFixture<CarSpecs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarSpecs],
    }).compileComponents();

    fixture = TestBed.createComponent(CarSpecs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
