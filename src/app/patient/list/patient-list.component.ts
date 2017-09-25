import { Component, OnInit } from '@angular/core';
import { Patient } from "../../models/patient";
import { PatientService } from "../../service/patient.service";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html'
})
export class PatientListComponent implements OnInit {
   listPatients:Patient[];
  constructor(private _service:PatientService) { }

  ngOnInit() {
    this._service.getPatients().subscribe(
      result => {
        console.log(result);
        this.listPatients = JSON.parse(result);
      },
      error => {
        console.log("error " + error);
        this.listPatients = [];
      }
    );
  }

}
