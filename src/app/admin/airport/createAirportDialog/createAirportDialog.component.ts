import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Airport } from 'src/app/_models/airport';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createAirportDialog',
  templateUrl: './createAirportDialog.component.html',
  styleUrls: ['./createAirportDialog.component.css']
})
export class CreateAirportDialogComponent implements OnInit {
  airportForm: FormGroup;
  title: string  = "Add new Aeroport";
  isEditable!: boolean;

  constructor(
    public dialogRef: MatDialogRef<CreateAirportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {editable: boolean,airport: Airport}, private fb: FormBuilder) {


      this.airportForm = this.fb.group({
        id:  [null , null],
        icaoCode: ['' , Validators.required],
        iataCode: ['', [Validators.required]],
        city: ['' , Validators.required],
        name: ['' , Validators.required],
        country: ['' , Validators.required],
        latitude: ['' , Validators.required],
        longitude: ['' , Validators.required],

      });

    }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
    this.setupAirportForm();

  }


  setupAirportForm() {

    if(this.data.airport != null) {
      this.title ="Edit Airport";
      this.airportForm.patchValue({
        id: this.data.airport.id,
        icaoCode: this.data.airport.icaoCode,
        iataCode: this.data.airport.iataCode,
        city: this.data.airport.city,
        name: this.data.airport.name,
        country: this.data.airport.country,
        latitude: this.data.airport.latitude,
        longitude: this.data.airport.longitude})
        console.log(this.data.airport.city);
    }

    this.isEditable = this.data.editable;
  }

  saveAeroport(){
    if (this.airportForm.valid) {
      this.dialogRef.close({data: Object.assign({}, this.airportForm.value)});
    } else {
      console.error("is not valid form")
    }
  }

  close(){
    this.dialogRef.close();
  }

}
