import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Location } from '../models/Location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Location[]>(`${environment.apiURL}/locations`);
  }
}
