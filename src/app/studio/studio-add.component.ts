import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Patient, StudioType, Studio } from "../models/patient";
import { PatientService } from "../service/patient.service";
import { MediaService } from "../service/media.service";
import { MyDatePickerModule } from 'mydatepicker/src/my-date-picker/my-date-picker.module';
import { DropdownComponent, Select_Item } from "../utils/dropdown/dropdown";

@Component({
  selector: 'app-studio-add',
  templateUrl: './studio-add.component.html',
})
export class StudioAddComponent implements OnInit {
  myDatePickerOptions: any;
  urlImg: string;
  file: File;
  studios: Select_Item[];
  submitResult:string;
  folderImage:string = "images";
  @Output("studio")
  studio = new EventEmitter();
  studioOut:ModelStudio;
  constructor(private _route: ActivatedRoute, private _service: PatientService, private _media: MediaService) { }

  ngOnInit() {
    this.studios = [{ id: 0, value: StudioType.Instestinal, view: "Intestinal", select:false }];
    this.studioOut = new ModelStudio(null,"","","",null);
  }
  onSubmit() {
    console.log("submit");
    let nameFile = "";
    if(this.file)
    this.studioOut.image = this.file.name;
    this.studio.emit(this.studioOut);
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
  readFile(file: File, reader, callback) {
    reader.onload = () => {
      callback(reader.result);
      this.urlImg = reader.result;
      this.studioOut.file = file;
    }
  }
  onDateChanged(event) {
    this.studioOut.date = event;
  }
  handleSelectStudio(event) {
    console.log(event);
    this.studioOut.type = event;
  }
}
export class ModelStudio {
  constructor(
      public type: StudioType,
      public date: string,
      public description: string,
      public image:string,
      public file :File
  ) { }
}
