import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from '../../environments/environment';
import { pipe } from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { UserRegister } from '../_models/userRegister';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'user/';
  jwtHelper = new JwtHelperService();
  decodeToken: any;
  currentUser!: User;

constructor(private http: HttpClient) { }


login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
      pipe(
        map((response: any) => {
          const user = response;
          if(user) {
            localStorage.setItem('token',user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.decodeToken = this.jwtHelper.decodeToken;
            this.currentUser = user.user;
          }
        })
      );

}


loggedIn()  {
  const token = localStorage.getItem('token');
  if(!token)  {
    return false;
  }
  return !this.jwtHelper.isTokenExpired(token);
}

register(user: UserRegister)  {
  return  this.http.post(this.baseUrl + 'register',user);
 }

}
