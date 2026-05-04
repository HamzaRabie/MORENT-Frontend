import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Booking {
  constructor(private http : HttpClient){}

  getTopCategories() {
    return this.http.get<any[]>(`${environment.apiURL}/bookings/top`);
  }

   getRecentBookings() {
    return this.http.get<any[]>(`${environment.apiURL}/bookings/recent`);
  }

   getActiveBooking() {
    return this.http.get<any>(`${environment.apiURL}/bookings/active`);
  }
}
