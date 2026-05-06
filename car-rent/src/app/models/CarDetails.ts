import { Car } from "./car.model";
import { Review } from "./Review";

export interface CarDetails extends Car {
  description: string;
  images: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
}