import { SearchResult } from './../_models/searchResult';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Airport } from '../_models/airport';
import { Route } from '@angular/router';
import { SearchRequest } from '../_models/SeachRequest';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  baseUrl = environment.apiUrl + 'airport/';
  constructor(private http: HttpClient) { }


  searchAirport(pageSize: number, pageNumber: number) {
    return this.http.get<SearchResult>(this.baseUrl + 'search/?'+'size='+pageSize+'&number='+pageNumber);
  }

  addAirport(airport: Airport) {
    return  this.http.post<Airport>(this.baseUrl + 'create',airport);
  }

  deleteAirport(id: string) {
   return this.http.post<void>(this.baseUrl + 'delete/'+ id, null);
  }

  editAirport(airport: Airport) {
    return this.http.put<Airport>(this.baseUrl + 'edit', airport);
  }

}
