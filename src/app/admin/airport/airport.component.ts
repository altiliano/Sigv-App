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
import { SearchResult } from '../../_models/searchResult';
import { MatPaginator } from '@angular/material/paginator';

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
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor(public dialog: MatDialog, private aeropotService: AirportService) {}

  ngOnInit(): void {
    this.dataSource =  new MatTableDataSource();

    this.getAllAirports();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
      let airportForm = result.data;

      if(airportForm != null &&  airportForm.id != null){
        this.saveAirport(airportForm);
      }else {
        this.addAeroport(airportForm);
      }
    }

    });
  }

  addNewAirportDialog() {
    this.openDialog(this.airport, false);
  }

  editAirportDialog(airport: Airport) {
    this.openDialog(airport, false);
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
  let pageSize = 10;
  let pageNumber = 0
  if (this.dataSource != null && this.dataSource.paginator != null) {
    pageSize = this.dataSource.paginator.pageSize;
    pageNumber = this.dataSource.paginator.pageIndex;
  }
  this.aeropotService.searchAirport(pageSize, pageNumber).subscribe((result : SearchResult)   => {
    this.dataSource.data = result.content;
    if(this.dataSource.paginator != null ) {
      this.dataSource.paginator.pageSize = result.pageSize;
      this.dataSource.paginator.pageIndex = result.pageNumber;
    }

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
console.log(airport.id);
  this.aeropotService.editAirport(airport).subscribe( () => {
    this.getAllAirports();

  }, error => {
    console.log(error)
  });
}

detailAirportDialog(airport: Airport) {
  this.openDialog(airport, true);
}

}


