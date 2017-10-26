import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
// import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Patient, AppSettings } from "../models/patient";
import { Subject } from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';
import { UtilsService } from "../service/utils.service";
//const patients: Patient[] = [
//     { birthDate: "1978, 3, 19", firstName: "Pablo", lastName: "Silva", document: "31130749", sex: "M", intestinalTest: null, personalHistory: null, preferens: null, rejections: null },
//     { birthDate: "1970, 4, 2", firstName: "Maria Jose", lastName: "Olivera", document: "31130741", sex: "F", intestinalTest: null, personalHistory: null, preferens: null, rejections: null },
//     { birthDate: "1998, 3, 3", firstName: "Diego", lastName: "Silva", document: "31130742", sex: "M", intestinalTest: null, personalHistory: null, preferens: null, rejections: null },
//     { birthDate: "2002, 2, 2", firstName: "Milena", lastName: "Silva", document: "31130748", sex: "F", intestinalTest: null, personalHistory: null, preferens: null, rejections: null },
//     { birthDate: "1955, 3, 3", firstName: "Lorean", lastName: "Silva", document: "31130759", sex: "F", intestinalTest: null, personalHistory: null, preferens: null, rejections: null },
// ];
@Injectable()
export class PatientService {
    currentpatients: Patient[];
    searchSubject = new Subject<any>();
    patients: AngularFireList<any>;
    items: Observable<any[]>;
    constructor(private db: AngularFireDatabase, private http:HttpClient, private utils:UtilsService) {
        console.log("PatientService Start");
        // this.patients = this.db.list('patients');
        // this.items = this.patients.valueChanges();
        // this.http.get('https://kardex-76ed2.firebaseio.com/patients.json?orderBy=%22document%22&equalTo=%2231130749%22').subscribe(data => {
        //     // Read the result field from the JSON response.
        //     console.log(data);
        //   });
        // var ref = this.db.database.refFromURL("https://kardex-76ed2.firebaseio.com/patients.json?orderBy='document'&equalTo='31130749'");
        // console.log(ref.toJSON());
        // ref.orderByChild("document").on("child_added", function(snapshot) {
        //   console.log("end");
        // });
     }
    getPatients() {
        console.log("getPatients start");
        this.patients = this.db.list('patients');
        this.items = this.patients.auditTrail();
        return this.items.map
        (res => {
            this.currentpatients =this.utils.parserListPatient(res);
            return this.currentpatients;
        });
    }
    getPatientsforName(name: string) {
        console.log("getPatients start " + name);
        this.patients = this.db.list('patients', ref => ref.orderByChild('firstName').equalTo(name));
        this.items = this.patients.valueChanges();
        return this.items.map
        (res => {
            console.log(res.length);
            this.currentpatients = res;
            return res;
        });
    }
    getPatientsforDocument(document: string) {
        console.log("getPatientsforDocument start " + document);
        return this.http.get('https://kardex-76ed2.firebaseio.com/patients.json?orderBy=%22document%22&equalTo=%22'+ document +'%22');
        //this.patients = this.db.database.refFromURL.list('patients', ref => ref.orderByChild('document').equalTo(document));
        // this.items = this.patients.valueChanges();
        // return this.items.map
        // (
        //     res => {
        //     console.log("result");
        //     this.currentpatients = res;
        //     return res;
        //     }
        // );
    }
    getCurrentPatients() {
        return this.currentpatients;

    }
    savePatient(entry: Patient) {
        console.log("savePatient start");
        return this.db.list("patients").push(entry).then(res => {
            return res;
        });
    }
    updatePatients(item:any) {
        console.log("updatePatients start");
        return this.db.object("/patients/" + item.id).update(item);
    }
    removePatients(item:any) {
        console.log("remove start " + item.id);
        return this.db.object("/patients/" + item.id).remove();
    }
}
