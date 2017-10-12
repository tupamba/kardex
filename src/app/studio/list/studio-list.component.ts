import { Component, OnInit, Input } from '@angular/core';
import { Patient,Studio, StudioType } from "../../models/patient";
import { Observable } from 'rxjs/Observable';
import { MediaService } from "../../service/media.service";

@Component({
  selector: 'app-studio-list',
  templateUrl: './studio-list.component.html'
})
export class StudioListComponent implements OnInit {
  @Input("ListStudio")
  listStudio: Array<Studio> = new Array<Studio>();
  @Input("Document")
  document: string;
  urlImg:string;
  constructor(private _media:MediaService) { }

  ngOnInit() {
    console.log("StudioListComponent ngOnInit");
  }
  getType(type:StudioType)
  {
    return StudioType[type];
  }
  getImage(name)
  {
    console.log("StudioListComponent getImage");
    let path = `/${this.document}/${name}`;
    console.log(path);
    this._media.getImage(path).then(
      url => 
      {
        console.log("url: " + url);
          this.urlImg = url;
      }
    );
  }

}

