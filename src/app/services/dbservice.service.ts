import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class DbserviceService {
  rooms: FirebaseListObservable<any[]>;
  constructor(private db: AngularFireDatabase) {
    console.log("DbserviceService Start");

  }
  getRooms() {
    console.log("getRooms");
    return this.db.list('/rooms').map
      (res => {
        console.log(res.length);
        return res;
      });
  }

}
