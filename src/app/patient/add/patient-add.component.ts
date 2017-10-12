import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Patient, StudioType, Studio } from "../../models/patient";
import { PatientService } from "../../service/patient.service";
import { MediaService } from "../../service/media.service";
import { MyDatePickerModule } from 'mydatepicker/src/my-date-picker/my-date-picker.module';
import { DropdownComponent, Select_Item } from "../../utils/dropdown/dropdown";
import { StudioAddComponent } from '../../studio/studio-add.component';
import { StudioListComponent } from '../../studio/list/studio-list.component';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
})
export class PatientAddComponent implements OnInit {
  viewStudio:boolean = false;
  listPatients: Patient[];
  currentPatient: Patient;
  model: modelView;
  myDatePickerOptions: any;
  urlImg: string;
  file: Array<File> = new Array<File>();
  sexs: Select_Item[];
  submitResult:string;
  folderImage:string = "images";
  studios:Array<Studio> = new Array<Studio>();
  constructor(private _route: ActivatedRoute, private _service: PatientService, private _media: MediaService) { }

  ngOnInit() {
    console.log("PatientAddComponent");
    this.sexs = [
      { id: 1, value: 'H', view: 'Hombre', select:false },
      { id: 2, value: 'M', view: 'Mujer', select:false },
      { id: 3, value: 'I', view: 'Indefinido', select:false }
    ];
    this.model = new modelView("", "", "", "", "", "", "", "");

  }
  onSubmit() {
    console.log("submit");
    this.currentPatient = new Patient(this.model.firstname, this.model.lastname, this.model.document,
      this.model.birthDate, this.model.sex, null, { date: new Date(), data: this.model.reject },
      { date: new Date(), data: this.model.preference }, this.studios);
    this._service.savePatient(this.currentPatient).then(
      result => {
        if(this.file)
         this.uploadFile();
        console.log("savePatient ok: " + result);
        this.submitResult = "ok";
      },
      error => {
        console.log("savePatient error: " + error);
        this.submitResult = "ok";
      }
    );
  }
  onDateChanged(event) {
    this.model.birthDate = event;
  }
  handleStudio(event)
  {
    this.studios.push({date: event.date,description:event.description,image: event.image,type: event.type});
    this.file.push(event.file);
    this.viewStudio = false;
  }
  uploadFile() {
    console.log("uploadFile");
    this.file.forEach(element => {
      this._media.upload(element, this.model.document);
    });
  }
  readFile(file: File, reader, callback) {

    reader.onload = () => {
      callback(reader.result);
      this.urlImg = reader.result;
      console.log(reader.result);

    }
  }
  handleSelectSex(event) {
    console.log(event);
    this.model.sex = event;
  }
}
export class modelView {
  constructor(
    public firstname: string,
    public lastname: string,
    public document: string,
    public birthDate: string,
    public sex: string,
    public intestinalTest: string,
    public preference: string,
    public reject: string
  ) {

  }
}