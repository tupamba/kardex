import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import { Observable } from "rxjs/Rx";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Patient, AppSettings } from "../models/patient";

const patients: Patient[] = [
    {birthDate:new Date(1978,3,19),firstName:"Pablo",lastName:"Silva",document:"31130749",sex:"M",_id:"0",intestinalTest:null,personalHistory:null,preferens:null,rejections:null},
    {birthDate:new Date(1970,4,2),firstName:"Maria Jose",lastName:"Olivera",document:"31130741",sex:"F",_id:"1",intestinalTest:null,personalHistory:null,preferens:null,rejections:null},
    {birthDate:new Date(1998,3,3),firstName:"Diego",lastName:"Silva",document:"31130742",sex:"M",_id:"2",intestinalTest:null,personalHistory:null,preferens:null,rejections:null},
    {birthDate:new Date(2002,2,2),firstName:"Milena",lastName:"Silva",document:"31130748",sex:"F",_id:"3",intestinalTest:null,personalHistory:null,preferens:null,rejections:null},
    {birthDate:new Date(1955,3,3),firstName:"Lorean",lastName:"Silva",document:"31130759",sex:"F",_id:"4",intestinalTest:null,personalHistory:null,preferens:null,rejections:null},
  ];
@Injectable()
export class PatientService {

    constructor(private db: AngularFireDatabase) {
        console.log("EntryService Start");

    }
    getPatients() {
        console.log("getPatients start");
        if (AppSettings.MOCK)
            return Observable.of(patients).map(moqRooms => JSON.stringify(moqRooms));
        else
            return this.db.list('/patient').map
                (res => {
                    console.log(res.length);
                    return res;
                });
    }
    getPatientsforName(name:string) {
        console.log("getPatients start");
        if (AppSettings.MOCK)
            return Observable.of(patients).map(moqRooms => JSON.stringify(moqRooms.filter(x => x.firstName.toLowerCase().includes(name.toLowerCase()))));
        else
            return this.db.list('/patient').map
                (res => {
                    console.log(res.length);
                    return res;
                });
    }
    getPatientsforDocument(document:string) {
        console.log("getPatients start");
        if (AppSettings.MOCK)
            return Observable.of(patients).map(moqRooms => JSON.stringify(moqRooms.filter(x => x.document.toLowerCase().includes(document.toLowerCase()))));
        else
            return this.db.list('/patient').map
                (res => {
                    console.log(res.length);
                    return res;
                });
    }
    getCurrentPatients()
    {
        return patients;

    }
}
