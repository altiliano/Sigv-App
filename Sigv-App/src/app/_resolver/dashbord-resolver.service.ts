import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { DashboardService } from '../_services/dashboard.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DashbordResolverService implements Resolve<User>{

  constructor(private dashborService: DashboardService, private router: Router) { }


  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> {
    return this.dashborService.getUserInformation()
  }


}
