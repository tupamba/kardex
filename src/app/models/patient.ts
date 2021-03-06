export class Room {
    constructor(
        public number: number,
        public floor: number
    ) { }
}
export class Bed {
    constructor(
        public number: number,
        public room: Room
    ) { }
}
export class Entry {
    constructor(
        public dateEntry: Date,
        public dateOut: Date,
        public diagnostic: Diagnostic,
        public diagnosticNutritionist: DiagnosticNutritionist,
        public medicalPrescription: MedicalPrescription,
        public nutritionistPrescription: NutritionistPrescription,
        public bed: Bed,
        public controls:[Control],
        public observations:[Observation],
        public user:Patient,
        public _id:string
    ) { }
}
export class Control {
    constructor(
        public date: string,
        public weight: Number,
        public size,
        public imc: Number,
        public appetite: boolean,
        public observation:string
    ) { }
}
export class Observation {
    constructor(
        public date: Date,
        public profesional: string,
        public description: string
    ) { }
}
export class Diagnostic {
    constructor(
        public date: Date,
        public doctor: string,
        public description: string
    ) { }
}
export class DiagnosticNutritionist {
    constructor(
        public date: Date,
        public nutritionist: string,
        public description: string
    ) { }
}
export class MedicalPrescription {
    constructor(
        public dateStart: Date,
        public dateEnd: Date,
        public doctor: string,
        public menu: string
    ) { }
}
export class NutritionistPrescription {
    constructor(
        public dateStart: Date,
        public dateEnd: Date,
        public nutritionist: string,
        public menu: string
    ) { }
}
export class Patient {
    constructor(
        public id:string,
        public firstName: string,
        public lastName: string,
        public document:string,
        public birthDate: string,
        public sex: string,
        public personalHistory: any,
        public rejections:any,
        public preferens:any,
        public studios: Studio[],
        public controls:Control[]
    ) {
        
    }
    
}
export class Studio {
    constructor(
        public type: StudioType,
        public date: string,
        public description: string,
        public image:string
    ) { }
}
export enum StudioType {
    Instestinal
}
export class AppSettings {
    public static MOCK = false;
 }