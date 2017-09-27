import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Patient } from "../../models/patient";
import { PatientService } from "../../service/patient.service";
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
  constructor(private _route: ActivatedRoute, private _service: PatientService) { }

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

}
export class modelView {
  constructor(
      public name: string,
      public document:string,
      public birthDate: string,
  ) {
      
  }
}