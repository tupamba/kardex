import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Patient, StudioType, Studio, Control } from "../../models/patient";
import { PatientService } from "../../service/patient.service";
import { MediaService } from "../../service/media.service";
import { MyDatePickerModule } from 'mydatepicker/src/my-date-picker/my-date-picker.module';
import { DropdownComponent, Select_Item } from "../../utils/dropdown/dropdown";
import { StudioAddComponent } from '../../studio/studio-add.component';
import { StudioListComponent } from '../../studio/list/studio-list.component';
import { PatientControlComponent } from '../../patient/control/patient-control.component';
import { ControlListComponent } from '../../patient/control/list/control-list.component';
import { DialogMessageComponent } from '../../utils/PopUp/dialogmessage';
import { MessageComponent } from '../../utils/PopUp/message';
import { DialogService } from "ng2-bootstrap-modal";
import { BaseComponentView } from "../../models/base-component.view";


@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
})
export class PatientAddComponent extends BaseComponentView  implements OnInit {
  disposable: any;
  viewStudio: boolean = false;
  viewControl:boolean = false;
  listPatients: Patient[];
  currentPatient: Patient;
  model: modelView;
  myDatePickerOptions: any;
  urlImg: string;
  file: Array<File> = new Array<File>();
  sexs: Select_Item[];
  submitResult: string;
  folderImage: string = "images";
  studios: Array<Studio> = new Array<Studio>();
  controls: Array<Control> = new Array<Control>();
  constructor(private _route: Router, private _service: PatientService, private _media: MediaService,
    public dialogService: DialogService) {     
      super(dialogService);
    }

  ngOnInit() {
    console.log("PatientAddComponent");
    this.sexs = [
      { id: 1, value: 'H', view: 'Hombre', select: false },
      { id: 2, value: 'M', view: 'Mujer', select: false },
      { id: 3, value: 'I', view: 'Indefinido', select: false }
    ];
    this.model = new modelView("", "", "", "", "", "", "", "", "");

  }
  onSubmit() {
    console.log("submit");
    this.disposable = this.showWait();
    this.currentPatient = new Patient("",this.model.firstname, this.model.lastname, this.model.document,
      this.model.birthDate, this.model.sex, this.model.personalHistory, { date: new Date(), data: this.model.reject },
      { date: new Date(), data: this.model.preference }, this.studios, this.controls);
    this._service.getPatientsforDocument(this.currentPatient.document).subscribe(
      resul => {
        let r = JSON.stringify(resul);
        console.log("Exist " + r);
        if(r != "{}")
          this.showMessage('{"title":"Ya existe un paciente con este documento","css":"alert-danger"}', 'Desea agregar un nuevo paciente?');
        else this.addPatient();
      },
      error => {
        console.log("Not exist");
        this.addPatient();
      }
    );

  }
  addPatient() {
    this._service.savePatient(this.currentPatient).then(
      result => {
        this.disposable.unsubscribe();
        if (this.file)
          this.uploadFile();
        console.log("savePatient ok: " + result);
        this.showMessage('{"title":"Paciente agregado correctamente","css":"alert-success"}', 'Desea agregar un nuevo paciente?');
        //this.submitResult = "ok";
      },
      error => {
        this.disposable.unsubscribe();
        console.log("savePatient error: " + error);
        this.showMessage('{"title":"No se pudo agregar el paciente","css":"alert-danger"}', 'Desea agregar un nuevo paciente?');
        //this.submitResult = "ok";
      }
    );
  }
  onDateChanged(event) {
    this.model.birthDate = event;
  }
  handleStudio(event) {
    this.studios.push({ date: event.date, description: event.description, image: event.image, type: event.type });
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
  handleControl(event: Control) {
    this.controls.push({ date: event.date, appetite: event.appetite, imc: event.imc, size: event.size, weight: event.weight, observation: event.observation });
    this.viewControl = false;
  }
  showMessage(title, body) {
    return this.dialogService.addDialog(DialogMessageComponent, {
      title: title,
      message: body,
    }).subscribe((isConfirmed) => {
        //We get dialog result
        if (isConfirmed) {
          this.model = new modelView("", "", "", "", "", "", "", "", "");
        }
        else {
          this._route.navigateByUrl('patient-list');
        }
      });
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
    public reject: string,
    public personalHistory: any
  ) {

  }
}