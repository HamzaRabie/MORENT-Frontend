export interface Car {
  id: string;
  brand: string;
  model: string;
  category: string;
  pricePerDay: number;
  originalPrice?: number;
  imageUrl: string;
  seats: number;
  fuelType: string;
  fuelCapacity: number;
  transmission: string;
  isAvailable: boolean;
  isFavorite: boolean;
}

export interface CarResponse {
  cars: Car[];
  totalCount: number;
}