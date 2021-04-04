import { Component, OnInit } from '@angular/core';
import { faFilm, faPlane } from '@fortawesome/free-solid-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {faChartBar} from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../_services/dashboard.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  filmIcon = faFilm;
  faCoffee = faCoffee;
  faChartBar = faChartBar;
  faPlane = faPlane;
  user: any;


  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getUserDetail().subscribe((user: User) => {
      this.user = user;
    }, error => {
      console.log(" error geting user informations")
    });
  }

}
