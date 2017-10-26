import { Component,OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface MessageModel {
  title: string;
  message: string;
}
@Component({
  selector: 'dialogMessage',
  template: `<div class="modal-dialog">
    <div class="modal-content">
       <div class="modal-header alert" [ngClass]='cssTitle'>
         <button type="button" class="close" (click)="close()" >&times;</button>
         <h4 class="modal-title">{{_title || 'Confirmación'}}</h4>
       </div>
       <div class="modal-body">
         <p>{{message || 'Esta seguro?'}}</p>
       </div>
       <div class="modal-footer">
         <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
         <button type="button" class="btn btn-default" (click)="close()" >Cancelar</button>
       </div>
     </div>
  </div>`
})
export class DialogMessageComponent extends DialogComponent<MessageModel, boolean> implements MessageModel, OnInit  {
  title: string;
  message: string;
  _title:string;
  cssTitle:string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  ngOnInit() {
    console.log("DialogService");
    var t = JSON.parse(this.title);
    this._title = t.title;
    this.cssTitle = t.css;
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }
}