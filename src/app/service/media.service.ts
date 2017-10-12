import { Injectable, Input } from '@angular/core';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import { Observable } from "rxjs/Rx";
import {  AngularFireDatabase } from 'angularfire2/database';
import { Room, Entry, AppSettings } from "../models/patient";
import * as firebase from 'firebase';


@Injectable()
export class MediaService {
    @Input() folder: string;
    constructor(public db: AngularFireDatabase, public router: Router) {
        console.log("EntryService Start");
        let storageRef = firebase.storage().ref();
    }
    upload(selectedFile:File, document:string) {
        // Create a root reference
        let storageRef = firebase.storage().ref();

        let success = false;
        // This currently only grabs item 0, TODO refactor it to grab them all
        // for (let selectedFile of selectedFiles) {
            console.log(selectedFile);
            // Make local copies of services because "this" will be clobbered
            let router = this.router;
            let af = this.db;
            let folder = this.folder;
                let path = `/${document}/${selectedFile.name}`;
                var iRef = storageRef.child(path);
            iRef.put(selectedFile).then((snapshot) => {
                console.log('Uploaded a blob or file! Now storing the reference at',`/${document}/images/`);
                // af.list(`/${folder}/images/`).push({ path: path, filename: selectedFile.name, patientDocument:document })
            });
        // }
        
    }
    getImage(path:string) {
        // Create a root reference
        let storageRef = firebase.storage().ref();
        var iRef = storageRef.child(path);
        return iRef.getDownloadURL();
    }
}