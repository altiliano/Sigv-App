import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from '../../environments/environment';
import { pipe } from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { UserRegister } from '../_models/userRegister';
import { HttpHeaders } from '@angular/common/http';
import { Authenticate } from '../_models/authenticate';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'user/';
  jwtHelper = new JwtHelperService();
  decodeToken: any;
  currentUser!: User;
  authenticate!: Authenticate;

constructor(private http: HttpClient) { }


login(model: any) {
  return this.http.post(this.baseUrl + 'login', model).
      pipe(
        map((response: any) => {
          const authenticate = response;
          if(authenticate) {
            localStorage.setItem('token',authenticate.token);
            //localStorage.setItem('user', JSON.stringify(user.user));
            this.decodeToken = this.jwtHelper.decodeToken;
            //this.currentUser = user.user;
          }
        })
      );

}


loggedIn()  {
  const token = localStorage.getItem('token');
  console.log("token: " + token)
  if(!token)  {
    return false;
  }
  return !this.jwtHelper.isTokenExpired(token);
}

register(user: UserRegister)  {
  return  this.http.post(this.baseUrl + 'register',user);
 }

}
