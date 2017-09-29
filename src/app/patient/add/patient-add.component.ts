import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Patient } from "../../models/patient";
import { PatientService } from "../../service/patient.service";
import { MediaService } from "../../service/media.service";
import { MyDatePickerModule } from 'mydatepicker/src/my-date-picker/my-date-picker.module';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
})
export class PatientAddComponent implements OnInit {
  listPatients: Patient[];
  currentPatient: Patient;
  model:modelView;
  myDatePickerOptions: any;
  constructor(private _route: ActivatedRoute, private _service: PatientService,private _media: MediaService) { }

  ngOnInit() {
    this.model = new modelView("","","");
    this.listPatients = this._service.getCurrentPatients();
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this.currentPatient = this.listPatients.find(x => x._id == id);
    });
  }
  onSubmit()
  {
    console.log("submit");
  }
  onDateChanged(event)
  {
    this.model.birthDate = event;
  }
  fileChange(event) {
    let fileList: FileList = event.target.files;
   
    if(fileList.length > 0) {
        let file: File = fileList[0];
        this._media.folder = "images";
        this._media.upload(file);
    }
}

}
export class modelView {
  constructor(
      public name: string,
      public document:string,
      public birthDate: string,
  ) {
      
  }
}