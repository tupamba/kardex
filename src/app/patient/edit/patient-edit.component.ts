import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Patient, Studio, Control } from "../../models/patient";
import { PatientService } from "../../service/patient.service";
import { UtilsService } from "../../service/utils.service";
import { MediaService } from "../../service/media.service";
import { DropdownComponent, Select_Item } from "../../utils/dropdown/dropdown";
import { BaseComponentView } from "../../models/base-component.view";
import { DialogService } from "ng2-bootstrap-modal";
import { Observable } from "rxjs/Rx";
import { DialogMessageComponent } from '../../utils/PopUp/dialogmessage';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  exportAs: 'patientedit'
})
export class PatientEditComponent extends BaseComponentView implements OnInit, AfterViewInit {
  disposable: any;
  viewStudio: boolean = false;
  viewControl: boolean = false;
  listPatients: Patient[];
  model: Patient;
  @Input("patient")
  patient: Patient;
  file: Array<File> = new Array<File>();
  urlImg: string;
  sexs: Select_Item[];
  folderImage: string = "images";
  @ViewChild(DropdownComponent) drop: DropdownComponent;
  constructor(private _router: Router,private util: UtilsService, private _route: ActivatedRoute, private _service: PatientService, private _media: MediaService,
    public dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    console.log("PatientEditComponent start");
    this.model = new Patient("","", "", "", "", "", "", "", "", null, null);
    this.sexs = [
      { id: 1, value: 'H', view: 'Hombre', select: false },
      { id: 2, value: 'M', view: 'Mujer', select: false },
      { id: 3, value: 'I', view: 'Indefinido', select: false }
    ];
    if (this.patient) {
      this.model = this.patient;
    } else {
      this.disposable = this.showWait();
      let document = "";
      this._route.params.forEach((params: Params) => {
        document = params['id'];
      });
      this._service.getPatientsforDocument(document).subscribe(
        result => {
          this.disposable.unsubscribe();
          console.log("ok " + result);
          this.model = this.util.parsePatient(result)[0];
          this.drop.list.find(x => x.value == this.model.sex).select = true;
          this.drop.placeholderDrop = this.drop.list.find(x => x.value == this.model.sex).view;
        },
        error => {
          this.disposable.unsubscribe();
          console.log("error " + error);
        }
      );

    }
    var s = this.sexs.find(x => this.model.sex == x.value);
    if (s)
      s.select = true;
  }
  ngAfterViewInit() {

  }
  uploadFile() {
    console.log("uploadFile ");
    this.file.forEach(element => {
      this._media.upload(element, this.model.document);
    });
  }
  handleStudio(event) {
    if(!this.model.studios)
      this.model.studios = [];
    this.model.studios.push({ date: event.date, description: event.description, image: event.image, type: event.type });
    this.file.push(event.file);
    this.viewStudio = false;
  }
  handleControl(event) {
    this.model.controls.push({ date: event.date, appetite: event.appetite, imc: event.imc, size: event.size, weight: event.weight, observation: event.observation });
    this.file.push(event.file);
    this.viewControl = false;
  }
  handleSelectSex(event) {
    console.log(event);
    this.model.sex = event;
  }
  onSubmit() {
    console.log("submit");
    this.disposable = this.showWait();
    this.updatePatient();

  }
  updatePatient() {
    this._service.getPatientsforDocument(this.model.document).
      subscribe(
      result => {
        this.model.id = this.util.parsePatient(result)[0].id;
        this._service.updatePatients(this.model).then(
          result => {
            console.log("Update ok ");
            this.disposable.unsubscribe();
            this.showMessage('{"title":"Paciente modificado correctamente","css":"alert-success"}', 'Desea volver a la lista de pacientes?');
          }
        ).catch
          (
          error => {
            console.log("Error " + error);
            this.disposable.unsubscribe();
            this.showMessage('{"title":"No se pudo actulizar el paciente","css":"alert-danger"}', 'Desea volver a la lista de pacientes?');
          }
          )
      },
      error => {
        console.log("Error " + error);
        this.disposable.unsubscribe();
        this.showMessage('{"title":"No existe ningun paciente con este documento.","css":"alert-danger"}', 'Desea volver a la lista de pacientes?');
      }
      );
  }
  showMessage(title, body) {
    return this.dialogService.addDialog(DialogMessageComponent, {
      title: title,
      message: body,
    }).subscribe((isConfirmed) => {
        //We get dialog result
        if (isConfirmed) {
          this._router.navigateByUrl('patient-list');
        }
      });
  }
}
