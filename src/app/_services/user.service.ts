import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    baseUrl = environment.apiUrl + 'user/';

constructor(private http: HttpClient) { }

loadUserInfo () {
  return  this.http.get(this.baseUrl + 'detail');
}

}

