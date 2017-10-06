import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Patient } from "../../models/patient";
import { PatientService } from "../../service/patient.service";
import { MediaService } from "../../service/media.service";
import { MyDatePickerModule } from 'mydatepicker/src/my-date-picker/my-date-picker.module';
import { DropdownComponent, Select_Item } from "../../utils/dropdown/dropdown";

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
})
export class PatientAddComponent implements OnInit {
  listPatients: Patient[];
  currentPatient: Patient;
  model: modelView;
  myDatePickerOptions: any;
  urlImg: string;
  file: File;
  sexs: Select_Item[];
  constructor(private _route: ActivatedRoute, private _service: PatientService, private _media: MediaService) { }

  ngOnInit() {
    this.sexs = [
      { id: 1, value: 'H', view: 'Hombre' },
      { id: 2, value: 'M', view: 'Mujer' },
      { id: 3, value: 'I', view: 'Indefinido' }
    ];
    this.model = new modelView("", "", "", "", "", "", "", "");

  }
  onSubmit() {
    console.log("submit");
    this.currentPatient = new Patient(this.model.firstname, this.model.lastname, this.model.document,
      this.model.birthDate, this.model.sex, null, { date: new Date(), data: this.model.reject },
      { date: new Date(), data: this.model.preference }, { date: new Date(), data: this.model.intestinalTest });
    this._service.savePatient(this.currentPatient).then(
      result => {
        console.log("savePatient ok: " + result);
      },
      error => {
        console.log("savePatient error: " + error);
      }
    );
  }
  onDateChanged(event) {
    this.model.birthDate = event;
  }
  fileChange(event) {
    console.log("fileChange");
    let reader = new FileReader();
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      this.readFile(this.file, reader, (result) => {
      });
      reader.readAsDataURL(this.file);
    }

  }
  uploadFile() {
    console.log("uploadFile " + this.file.name);
    this._media.folder = "images";
    this._media.upload(this.file);
    this.urlImg = "";
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