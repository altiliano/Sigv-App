import { CreateAirportDialogComponent } from './createAirportDialog/createAirportDialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Airport } from '../../_models/airport';
import { from } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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
  dataSource!: MatTableDataSource<Airport>;

  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;


  constructor(public dialog: MatDialog, private aeropotService: AirportService) {}

  ngOnInit(): void {
    this.dataSource =  new MatTableDataSource();
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
      this.getAllAirports();
      console.log("add new aerportor");
    }, error => {
      console.error("can't save aerport");
    });
    this.table.renderRows();
}

getAllAirports() : void {
  this.aeropotService.getAllAirport().subscribe((result : Airport[])   => {
    this.dataSource.data = result;
  },error => {
      console.log("error getting airports");
  });
}

}


