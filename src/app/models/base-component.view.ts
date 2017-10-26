
import { DialogMessageComponent } from '../utils/PopUp/dialogmessage';
import { MessageComponent } from '../utils/PopUp/message';
import { DialogService } from "ng2-bootstrap-modal";
export class BaseComponentView {
    constructor(public dialogService: DialogService
    ) { }
    showWait() {
        return this.dialogService.addDialog(MessageComponent, {
          title:'Aguarde', 
          message:'Procesando ...'
        })
          .subscribe((isConfirmed) => {
            //We get dialog result
            if (isConfirmed) {
             console.log("ok");
            }
            else {
              console.log("cancel");
            }
          });
      }
      
}