import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {CreatePaymentDto} from '../models/createPayment';


@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  createPayment(dto: CreatePaymentDto) {
    return this.http.post<PaymentResponse>(`${environment.apiURL}/payments`, dto);
  }
}
