import { CreateAirportDialogComponent } from './createAirportDialog/createAirportDialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Airport } from '../../_models/airport';
import { from } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AirportService } from '../../_services/airport.service';
import { A11yModule } from '@angular/cdk/a11y';
import { element } from 'protractor';
import { isNonNullExpression } from 'typescript';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {
  animal!: string;
  name!: string;
  airport!: Airport;


  displayedColumns: string[] = ['id','iacaoCode','country', 'city', 'name', 'actions'];
  dataSource!: MatTableDataSource<Airport>;

  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;


  constructor(public dialog: MatDialog, private aeropotService: AirportService) {}

  ngOnInit(): void {
    this.dataSource =  new MatTableDataSource();
    this.getAllAirports();
  }


  openDialog(form: Airport, isEditable: boolean): void {
    const dialogRef = this.dialog.open(CreateAirportDialogComponent, {
      width: '650px',
      height: '450px',
      data: {airport: form, editable: isEditable}
    });

    dialogRef.afterClosed().subscribe(result  => {
      console.log('The dialog was closed');
    if(result != null) {
      this.airport = result.data ;
      console.log(this.airport);
      if(this.airport != null &&  this.airport.id != null){
        this.saveAirport(this.airport);
      }else {
        this.addAeroport(this.airport);
      }

       }
    });
  }

  addNewAirportDialog() {
    this.openDialog(this.airport, true);
  }

  editAirportDialog(airport: Airport) {
    this.openDialog(airport, true);
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

deleteAirport(id: string) {
  this.aeropotService.deleteAirport(id).subscribe( () => {
    this.getAllAirports();

  }, error => {
    console.log(error)
  });

}

saveAirport(airport: Airport) {
  this.aeropotService.editAirport(airport).subscribe( () => {
    this.getAllAirports();

  }, error => {
    console.log(error)
  });
}

detailAirportDialog(airport: Airport) {
  this.openDialog(airport, false);
}

}


