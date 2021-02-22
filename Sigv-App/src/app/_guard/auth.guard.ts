import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): boolean  {
   /* const roles = next.firstChild.data['roles'] as Array<string>;
    if  (roles)  {
      const match = this.authService.roleMatch(roles);
      if  (match)  {
        return true;
      } else {
        this.router.navigate(['/members']);
        this.alertify.error('You are not authorised to acess this aerea');
      }
    }*/
    if (this.authService.loggedIn()) {
      console.log("canActivate return true")
      return true;
    }
    this.router.navigate(['/home']);
    console.log("canActivate return false")
    return false;
  }
}
