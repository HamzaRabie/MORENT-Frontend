import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCars } from './top-cars';

describe('TopCars', () => {
  let component: TopCars;
  let fixture: ComponentFixture<TopCars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCars],
    }).compileComponents();

    fixture = TestBed.createComponent(TopCars);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
