import { Component, OnInit, Input } from '@angular/core';
import { Control } from "../../../models/patient";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-control-list',
  templateUrl: './control-list.component.html'
})
export class ControlListComponent implements OnInit {
  @Input("ListControls")
  listControls: Array<Control> = new Array<Control>();

  constructor() { }

  ngOnInit() {
    console.log("ngOnInit");
  }

}
