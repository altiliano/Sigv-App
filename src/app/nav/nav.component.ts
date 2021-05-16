import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from '../_services/user.service';
import { DashboardService } from '../_services/dashboard.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  userName: any;

  constructor(private authService: AuthService, private dashboardService: DashboardService, private router: Router) { }

  ngOnInit() {
      this.getUserName();
  }


  loggedIn() {
   return this.authService.loggedIn();
  }

  getUserName() {
    this.dashboardService.getUserDetail().subscribe( (user: User) => {
      this.userName = user.firstName + " " + user.lastName;
    }, error => {
      console.log(error);
    });
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);

  }

}
