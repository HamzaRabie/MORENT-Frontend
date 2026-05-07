export interface CreatePaymentDto {
  carId: string;
  pickupLocation: string;
  pickupLat: number;
  pickupLng: number;
  pickupDate: string;
  dropoffLocation: string;
  dropoffLat: number;
  dropoffLng: number;
  dropoffDate: string;
  paymentMethod: string;
  name: string;
  phone: string;
  address: string;
  city: string;
}

export interface PaymentResponse {
  bookingId: string;
  totalPrice: number;
  status: string;
}