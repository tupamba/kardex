import { Patient } from "../models/patient";
import { Injectable } from '@angular/core';


@Injectable()
export class UtilsService {
    constructor(){ }
    parsePatient(result:any)
    {
        let key:any;
        let response:Array<Patient> = new Array<Patient>();
        for (key in result) {
          if (!result.hasOwnProperty(key)) continue;
          console.log(key);
          var r = result[key];
          r.id = key;
          response.push(r);
        }

        return response;
    }
    parserListPatient(res)
    {
        let response:Array<Patient> = new Array<Patient>();
        let patient:Patient;
        res.forEach(action => {
            console.log(action.type);
            console.log(action.key);
            patient = action.payload.val();
            patient.id = action.key;
            response.push(patient);
        });
        return response;
    }
    
}