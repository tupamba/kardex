import { Component, OnInit } from '@angular/core';
import { Patient } from "../../models/patient";
import { PatientService } from "../../service/patient.service";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html'
})
export class PatientListComponent implements OnInit {
  listPatients: any[];
  constructor(public _service: PatientService) { }

  ngOnInit() {
    this._service.getPatients().subscribe
      (
      result => {
        console.log(result);
        this.listPatients = result;
      }
      );
    console.log("ngOnInit");
  }

}
