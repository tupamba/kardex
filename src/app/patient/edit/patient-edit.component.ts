import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Patient, Studio } from "../../models/patient";
import { PatientService } from "../../service/patient.service";
import { MediaService } from "../../service/media.service";
import { DropdownComponent, Select_Item } from "../../utils/dropdown/dropdown";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  exportAs: 'patientedit'
})
export class PatientEditComponent implements OnInit {
  viewStudio: boolean = false;
  listPatients: Patient[];
  model: Patient;
  @Input("patient")
  patient: Patient;
  file: Array<File> = new Array<File>();
  urlImg: string;
  sexs: Select_Item[];
  folderImage:string = "images";
  constructor(private _route: ActivatedRoute, private _service: PatientService, private _media: MediaService) { }

  ngOnInit() {
    console.log("PatientEditComponent start");
    this.sexs = [
      { id: 1, value: 'H', view: 'Hombre', select:false },
      { id: 2, value: 'M', view: 'Mujer', select:false },
      { id: 3, value: 'I', view: 'Indefinido', select:false }
    ];
   
    if (this.patient) {
      this.model = this.patient;
    } else {
      this.listPatients = this._service.getCurrentPatients();
      this._route.params.forEach((params: Params) => {
        let id = params['id'];
        this.model = this.listPatients.find(x => x.document == id);
      });
    }
    var s = this.sexs.find(x => this.model.sex == x.value);
    if(s)
      s.select = true;
  }
  uploadFile() {
    console.log("uploadFile ");
    this.file.forEach(element => {
      this._media.upload(element, this.model.document);
    });
  }
  handleStudio(event)
  {
    this.model.studios.push({date: event.date,description:event.description,image: event.image,type: event.type});
    this.file.push(event.file);
    this.viewStudio = false;
  }

}
