import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Car, CarResponse } from '../models/car.model';
import { CarFilters } from '../models/filters.model';
import { CarDetails } from '../models/CarDetails';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http:HttpClient){}

  getAllCars(filters : CarFilters , page: number ){
   let params = new HttpParams().set('pageNo', page.toString());

    if (filters.category)
      params = params.set('category', filters.category);

    if (filters.seatsNo)
      params = params.set('seatsNo', filters.seatsNo.toString());

    if (filters.price)
      params = params.set('price', filters.price.toString());
    
    return this.http.get<CarResponse>(`${environment.apiURL}/cars`,{params});
  }

  getCarById(id: string) {
  return this.http.get<CarDetails>(`${environment.apiURL}/cars/${id}`);
}
}
