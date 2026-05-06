import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarGallery } from './car-gallery';

describe('CarGallery', () => {
  let component: CarGallery;
  let fixture: ComponentFixture<CarGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarGallery],
    }).compileComponents();

    fixture = TestBed.createComponent(CarGallery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
