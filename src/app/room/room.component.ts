import { Component, OnInit } from '@angular/core';
import { DbserviceService } from '../services/dbservice.service';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private db: DbserviceService) { }

  ngOnInit() {
    console.log('FavoritosListComponent cargado!');
    this.db.getRooms().subscribe(
      result => {
          console.log("ok " + result[0].number);
      },
      error => {
        console.log("error " + error);
      }
  );
  }

}
