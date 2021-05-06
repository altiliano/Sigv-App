import { CreateAirportDialogComponent } from './createAirportDialog/createAirportDialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Airport } from '../../_models/airport';
import { from } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { AirportService } from '../../_services/airport.service';
import { A11yModule } from '@angular/cdk/a11y';
import { element } from 'protractor';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {
  animal!: string;
  name!: string;
  aeroport!: Airport;


  displayedColumns: string[] = ['iacaoCode','country', 'city', 'name', 'id'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;


  constructor(public dialog: MatDialog, private aeropotService: AirportService) {}

  ngOnInit(): void {
    this.getAllAirports();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(CreateAirportDialogComponent, {
      width: '650px',
      height: '450px',
      data: {aeroport: this.aeroport}
    });

    dialogRef.afterClosed().subscribe(result  => {
      console.log('The dialog was closed');
      this.aeroport = result.data ;
      console.log('Aerport after close the dialod is '+ this.aeroport.city);
      this.addAeroport(this.aeroport);
    });
  }

  addAeroport(form: Airport): void {
    this.aeropotService.addAirport(form).subscribe( (result: Airport) => {
      this.addNewAirportToTable(result)
      console.log("add new aerportor");
    }, error => {
      console.error("can't save aerport");
    });
}

getAllAirports() : void {
  this.aeropotService.getAllAirport().subscribe((result :Airport[])   => {
    this.dataSource.push(...result);
  },error => {
      console.log("error getting airports");
  });
  this.table.renderRows();
}

addNewAirportToTable( airport: Airport) {
  this.dataSource.push({
    country:airport.country,
    city: airport.city,
    name: airport.name,
    id:airport.id,
    icaoCode: airport.icaoCode,
    iataCode: airport.iataCode,
    latitude: airport.latitude,
    longitude: airport.longitude
  });
  this.table.renderRows();
}

}

const ELEMENT_DATA: Airport[] = [];

