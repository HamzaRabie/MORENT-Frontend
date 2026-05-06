import { Component, Input } from '@angular/core';
import { CarDetails } from '../../../../models/CarDetails';

@Component({
  selector: 'app-car-specs',
  imports: [],
  templateUrl: './car-specs.html',
  styleUrl: './car-specs.scss',
})
export class CarSpecs {
  @Input() car!: CarDetails;
}
