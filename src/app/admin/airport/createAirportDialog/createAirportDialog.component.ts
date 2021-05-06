import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Airport } from 'src/app/_models/airport';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createAeroportDialog',
  templateUrl: './createAirportDialog.component.html',
  styleUrls: ['./createAirportDialog.component.css']
})
export class CreateAirportDialogComponent implements OnInit {
  aeroportForm: FormGroup;
  aeroport?: Airport ;

  constructor(
    public dialogRef: MatDialogRef<CreateAirportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Airport, private fb: FormBuilder) {

      this.aeroportForm = this.fb.group({
        icaoCode: ['' , Validators.required],
        iataCode: ['', [Validators.required]],
        city: ['' , Validators.required],
        country: ['' , Validators.required],
        latitude: ['' , Validators.required],
        longitude: ['' , Validators.required],

      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
  }

  saveAeroport(){
    if (this.aeroportForm.valid) {
      this.aeroport = Object.assign({}, this.aeroportForm.value);
      console.log("adding new aerport: " + this.aeroport?.city)
      this.dialogRef.close({data:this.aeroport});
    } else {
      console.error("is not valid form")
    }
  }

}
