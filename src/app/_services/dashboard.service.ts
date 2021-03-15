import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.apiUrl + 'user/';

  constructor(private http: HttpClient) { }


  getUserInfo(): Observable<User>{
    return this.http.get<User>(this.baseUrl + 'detail');
  }

  getUserInformation(): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'detail');
  }
}
