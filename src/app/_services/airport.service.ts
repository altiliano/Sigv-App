import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Airport } from '../_models/airport';
import { Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  baseUrl = environment.apiUrl + 'airport/';

  constructor(private http: HttpClient) { }


  getAllAirport() {
    return this.http.get<Airport[]>(this.baseUrl + 'all');
  }

  addAirport(airport: Airport) {
    return  this.http.post<Airport>(this.baseUrl + 'create',airport);
  }
}
