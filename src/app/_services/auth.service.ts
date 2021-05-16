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
  return this.isTokenExpired();
}

register(user: UserRegister)  {
  return  this.http.post(this.baseUrl + 'register',user);
 }

 refreshToken() {
    return this.http.get(this.baseUrl + 'refreshToken')
     .pipe(
       map( (response: any) => {
         const authenticate = response;
         if (authenticate) {
           localStorage.setItem('token',authenticate.token);
         }
       })
     )


 }

 isTokenExpired() {
  const token = this.getLocalStoreToken();
  if(!token)  {
    return false;
  }
  return !this.jwtHelper.isTokenExpired(token);
 }

 getLocalStoreToken() {
  return localStorage.getItem('token');
 }

 saveToken(token: string) {
  localStorage.setItem('token',token);
 }

}
