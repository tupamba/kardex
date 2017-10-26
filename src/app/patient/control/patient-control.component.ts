import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Control } from "../../models/patient";
import { PatientService } from "../../service/patient.service";
import { MediaService } from "../../service/media.service";
import { MyDatePickerModule } from 'mydatepicker/src/my-date-picker/my-date-picker.module';
import { DropdownComponent, Select_Item } from "../../utils/dropdown/dropdown";
import { StudioAddComponent } from '../../studio/studio-add.component';
import { StudioListComponent } from '../../studio/list/studio-list.component';

@Component({
  selector: 'app-patient-control',
  templateUrl: './patient-control.component.html'
})
export class PatientControlComponent implements OnInit {
  control:Control = new Control("",0,0,0,false,"");
  myDatePickerOptions: any;
  @Output('controlOut')
  sendControl = new EventEmitter();
  constructor(private _route: ActivatedRoute, private _service: PatientService, private _media: MediaService) { }

  ngOnInit() {
    console.log("PatientAddComponent");

  }
  onSubmit() {
    console.log("submit");
    this.sendControl.emit(this.control);
  }
  onDateChanged(event) {
    this.control.date = event;
  }

}
