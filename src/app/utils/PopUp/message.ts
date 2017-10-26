import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface MessageModel {
  title:string;
  message:string;
}
@Component({  
    selector: 'confirm',
    template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                   </div>
                   <div class="modal-body">
                   <i class="fa fa-spinner" aria-hidden="true"></i>
                   </div>
                   <div class="modal-footer">
                   </div>
                 </div>
              </div>`
})
export class MessageComponent extends DialogComponent<MessageModel, boolean> implements MessageModel {
  title: string;
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }
}