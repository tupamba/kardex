import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import { Observable } from "rxjs/Rx";

import { Room, Entry, AppSettings } from "../models/patient";

const rooms: Room[] = [
    { floor: 1, number: 1 },
    { floor: 1, number: 2 },
    { floor: 1, number: 3 },
    { floor: 1, number: 4 }];
const entrys: Entry[] = [];
@Injectable()
export class EntryService {

    constructor() {
        console.log("EntryService Start");

    }
    getRooms() {
        console.log("getRooms start");
        if (AppSettings.MOCK)
            return Observable.of(rooms).map(moqRooms => JSON.stringify(moqRooms));
        //else
            // return this.db.list('/rooms').map
            //     (res => {
            //         console.log(res.length);
            //         return res;
            //     });
    }
    saveEntry(entry: Entry) {
        console.log("saveEntry start");
        if (AppSettings.MOCK) {
            if (!entry._id || entry._id == "")
                return Observable.of(() => {
                    return entrys.push(entry);

                }).map(moqRooms => JSON.stringify(moqRooms));
            else {
                return Observable.of(() => {
                    var et = entrys.find(x => x._id == entry._id);
                    et = entry;
                    return;
                }).map(moqRooms => JSON.stringify(moqRooms));
            }
        }
        else {
            // if (!entry._id || entry._id == "")
            //     // return this.db.list("/entry").push(entry).then(res => {
            //     //     return res;
            //     // });
            // else
                // return this.db.object("/entry" + entry._id).update(entry).then(res => {
                //     return res;
                // });
        }
    }
    getEntry() {
        console.log("getRooms start");
        // if (AppSettings.MOCK)
        //     return Observable.of(entrys).map(moqEntry => JSON.stringify(moqEntry));
        // else
        //     return this.db.list('/entry').map
        //         (res => {
        //             console.log(res.length);
        //             return res;
        //         });
    }
    getCurrentEntrys()
    {

        return entrys;
    }
}
