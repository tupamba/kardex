import { Component, OnInit } from '@angular/core';
import { Patient } from "../../models/patient";
import { PatientService } from "../../service/patient.service";
import { Observable } from 'rxjs/Observable';
import { DialogService } from "ng2-bootstrap-modal";
import { DialogMessageComponent } from '../../utils/PopUp/dialogmessage';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html'
})
export class PatientListComponent implements OnInit {
  listPatients: any[];

  constructor(public dialogService: DialogService, public _service: PatientService) { }

  ngOnInit() {
    this.refreshPatients();
  }
  removePtient(item) {
    console.log("remove " + item.$key);
    this.showMessage('{"title":"Confirmación","css":"alert-danger"}',
      'Seguro desea eliminar este paciente?', item);
  }
  showMessage(title, body, item) {
    return this.dialogService.addDialog(DialogMessageComponent, {
      title: title,
      message: body,
    }).subscribe((isConfirmed) => {
      //We get dialog result
      if (isConfirmed) {
        this._service.removePatients(item).then
          (
          result => {
            console.log(result);
            this.refreshPatients();
          }
          );
      }
    });
  }
  refreshPatients() {
    this._service.getPatients().subscribe
      (
      result => {
        console.log(result);
        this.listPatients = result;
      }
      );
  }

}
