import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Patient } from "../../models/patient";
import { PatientService } from "../../service/patient.service";
import { Observable } from "rxjs/Rx";
import { MessageComponent } from '../../utils/PopUp/message';
import { DialogService } from "ng2-bootstrap-modal";
import { UtilsService } from "../../service/utils.service";
@Component({
  selector: 'patient-find',
  templateUrl: './patient-find.component.html',
  exportAs: 'patientfind'
})
export class PatientFindComponent {
  disposable: any;
  listPatients: any;
  @Output("selectPatient")
  selPatient = new EventEmitter();
  @Input("document")
  doc: string;
  @Input("name")
  name: string;
  constructor(private _route: ActivatedRoute, private _service: PatientService,
    private dialogService:DialogService,private util:UtilsService) { }

  ngOnInit() {
    this.search();
  }
  selectPatient(item) {
    this.selPatient.emit(item);
  }
  search() {
    this.listPatients = [];
    if (this.name && this.name != "")
      this._service.getPatientsforName(this.name).subscribe(
        result => {
          console.log(result);
          this.listPatients = result;
        },
        error => {
          console.log("error " + error);
          this.listPatients = [];
        }
      );
    else if (this.doc && this.doc != "")
    {
      this.showMessage();
       this._service.getPatientsforDocument(this.doc).subscribe(
        result => {
          this.disposable.unsubscribe();
          console.log("ok " + result);
          this.listPatients = this.util.parsePatient(result);
        
        },
        error => {
          this.disposable.unsubscribe();
          console.log("error " + error);
          this.listPatients = [];
        }
      );
    }
    else
      this._service.getPatients().subscribe(
        result => {
          console.log(result);
          var l = result;
          console.log(l.length);
        },
        error => {
          console.log("error " + error);
          this.listPatients = [];
        }
      );

  }
  showMessage() {
    this.disposable =  this.dialogService.addDialog(MessageComponent, {
        title:'Aguarde', 
        message:'Procesando ...'})
        .subscribe((isConfirmed)=>{
            //We get dialog result
            if(isConfirmed) {
                alert('accepted');
            }
            else {
                alert('declined');
            }
        });

    // setTimeout(()=>{
    //     this.disposable.unsubscribe();
    // },5000);
}

}
