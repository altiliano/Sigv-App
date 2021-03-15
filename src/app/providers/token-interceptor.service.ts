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
  let token = this.getToken();
  request = request.clone({
    headers: request.headers
      .set('Authorization', `Bearer ${token}`)
  });



  // Continue original request
  return next.handle(request);

  // Omitting error handling etc. for brevity
}


 getToken() {
   if (!this.authService.isTokenExpired()) {
     this.authService.refreshToken().subscribe( next => {
      console.log("refresh token succes!")
     },error =>{
       console.log(error)
     });
   }
   return this.authService.getLocalStoreToken();
 }



}
