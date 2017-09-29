import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Patient } from "../../models/patient";
import { PatientService } from "../../service/patient.service";

@Component({
  selector: 'patient-find',
  templateUrl: './patient-find.component.html',
})
export class PatientFindComponent {
  listPatients: Patient[];
  @Output("selectPatient")
  selPatient = new EventEmitter();
  @Input("document")
  doc: string;
  @Input("name")
  name: string;
  constructor(private _route: ActivatedRoute, private _service: PatientService) { }

  ngOnInit() {
    if (this.name && this.name != "")
      this._service.getPatientsforName(this.name).subscribe(
        result => {
          console.log(result);
          this.listPatients = JSON.parse(result);
        },
        error => {
          console.log("error " + error);
          this.listPatients = [];
        }
      );
    else if (this.doc && this.doc != "")
      this._service.getPatientsforDocument(this.doc).subscribe(
        result => {
          console.log(result);
          this.listPatients = JSON.parse(result);
        },
        error => {
          console.log("error " + error);
          this.listPatients = [];
        }
      );
    else
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
  selectPatient(item) {
    this.selPatient.emit(item);
  }

}
