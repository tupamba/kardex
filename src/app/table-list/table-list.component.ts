import { Component, OnInit } from '@angular/core';
import { Patient } from "../models/patient";
 
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
   listPatients:Patient[];
  constructor() { }

  ngOnInit() {
   
  }

}
