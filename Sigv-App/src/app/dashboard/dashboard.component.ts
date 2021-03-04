import { Component, OnInit } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {faChartBar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  filmIcon = faFilm;
  faCoffee = faCoffee;
  faChartBar = faChartBar;

  constructor() { }

  ngOnInit() {
  }

}
