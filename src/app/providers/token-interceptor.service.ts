import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private authService: AuthService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {

  // Get token & add to request headers
  request = this.addRefreshTokenToAuthorizationHeader(request);

  // Continue original request
  return next.handle(request);

  // Omitting error handling etc. for brevity
}


 getToken() {
   if (!this.authService.isTokenExpired() && this.authService.getLocalStoreToken() != null) {
     this.authService.refreshToken();
   }
   return this.authService.getLocalStoreToken();
 }

 addRefreshTokenToAuthorizationHeader(request :HttpRequest<any>) {
  let token = this.getToken();
  if(token != null) {
    return request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${token}`)
    });
  }
  return request;
}



}
