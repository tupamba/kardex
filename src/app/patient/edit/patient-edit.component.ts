import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Patient } from "../../models/patient";
import { PatientService } from "../../service/patient.service";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
})
export class PatientEditComponent implements OnInit {
  listPatients: Patient[];
  currentPatient: Patient;
  constructor(private _route: ActivatedRoute, private _service: PatientService) { }

  ngOnInit() {
    this.listPatients = this._service.getCurrentPatients();
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this.currentPatient = this.listPatients.find(x => x._id == id);
    });
  }

}
