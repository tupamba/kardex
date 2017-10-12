import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
    selector: 'dropdown-generic',
    templateUrl: 'dropdown.html',
    styleUrls: ['./dropdown.css']
})

export class DropdownComponent implements OnInit {
    @Input("listDrop")
    list:Select_Item[];
    @Output("selectItem")
    selectItem = new EventEmitter();

    placeholderDrop = "Seleccione una opción";
    constructor() { }

    ngOnInit() { 
        console.log("DropdownComponent start");
        if(this.list)
        {
            this.list.forEach(element => {
                if(element.select)
                this.placeholderDrop = element.view;
            });
        }
    }
    select(item:any)
    {
        this.selectItem.emit(item.value);
        this.placeholderDrop = item.view
    }
}
export class Select_Item {
    constructor(
        public id: number,
        public view:string,
        public value: any,
        public select:boolean
    ) { }
}