import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Entry } from "../../models/patient";
import { EntryService } from "../../service/entry.service";
import { MyDatePickerModule } from 'mydatepicker/src/my-date-picker/my-date-picker.module';
import { PatientFindComponent } from '../../patient/find/patient-find.component';
import { DropdownComponent, Select_Item } from "../../utils/dropdown/dropdown";


@Component({
  selector: 'app-entry-add',
  templateUrl: './entry-add.component.html',
})
export class EntryAddComponent implements OnInit {
  optionsModel: number[];
  beds: Select_Item[];
  viewFind: boolean = false;
  newEntry: Entry = new Entry(new Date(), null, null, null, null, null, null, null, null, null, "");
  myDatePickerOptions: any;
  constructor(private _route: ActivatedRoute, private _service: EntryService) { }

  ngOnInit() {
    this.beds = [
      { id: 1,value : {number:1, Room:{number:1,floor:1}},view: 'Cama 1' },
      { id: 2, value : {number:2, Room:{number:1,floor:1}}, view : 'Cama 2'},
      { id: 3, value : {number:2, Room:{number:1,floor:1}}, view : 'Cama 3'}
    ];
  }
  onChange() {
    console.log(this.optionsModel);
  }
  onDateChanged(event) {

  }
  handleSelectPatient(event) {
    console.log(event.lastName);
    this.newEntry.user = event;
    this.viewFind = false;
  }
  handleSelectBed(event)
  {
    console.log(event.number);
  }
}
