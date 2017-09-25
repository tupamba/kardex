import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
    selector: 'dropdown-generic',
    templateUrl: 'dropdown.html'
})

export class DropdownComponent implements OnInit {
    @Input("listDrop")
    list:Select_Item[];
    @Output("selectItem")
    selectItem = new EventEmitter();
    constructor() { }

    ngOnInit() { 
        console.log("DropdownComponent start");
        console.log(this.list.length);
    }
    select(item:any)
    {
        this.selectItem.emit(item);
    }
}
export class Select_Item {
    constructor(
        public id: number,
        public view:string,
        public value: any
    ) { }
}