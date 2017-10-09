import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Patient } from "../../models/patient";
import { PatientService } from "../../service/patient.service";
import { MediaService } from "../../service/media.service";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
})
export class PatientEditComponent implements OnInit {
  listPatients: Patient[];
  model: Patient;
  @Input("patient")
  patient: Patient;
  file: File;
  urlImg: string;
  constructor(private _route: ActivatedRoute, private _service: PatientService, private _media: MediaService) { }

  ngOnInit() {
    if (this.patient) {
      this.model = this.patient;
    } else {
      this.listPatients = this._service.getCurrentPatients();
      this._route.params.forEach((params: Params) => {
        let id = params['id'];
        this.model = this.listPatients.find(x => x.document == id);
      });
    }
  }
  uploadFile() {
    console.log("uploadFile " + this.file.name);
    this._media.folder = "images";
    this._media.upload(this.file,"");
    this.urlImg = "";
  }

}
