import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {MyDatePickerModule} from 'mydatepicker/src/my-date-picker/my-date-picker.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { DropdownComponent } from "./utils/dropdown/dropdown";

import { PatientFindComponent } from './patient/find/patient-find.component';
import { PatientListComponent } from './patient/list/patient-list.component';
import { PatientEditComponent } from './patient/edit/patient-edit.component';
import { PatientAddComponent } from './patient/add/patient-add.component';
import { EntryAddComponent } from "./entry/add/entry-add.component";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { EntryService } from "./service/entry.service";
import { PatientService } from "./service/patient.service";
import { MediaService } from "./service/media.service";

export const firebaseConfig = {
  apiKey: "AIzaSyA2oM84Cam1vhwkhPaNTT1AsoOolOk71Ow",
  authDomain: "kardex-76ed2.firebaseapp.com",
  databaseURL: "https://kardex-76ed2.firebaseio.com",
  projectId: "kardex-76ed2",
  storageBucket: "kardex-76ed2.appspot.com",
  messagingSenderId: "1018675302984"
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    PatientAddComponent,
    PatientListComponent,
    PatientEditComponent,
    EntryAddComponent,
    PatientFindComponent,
    DropdownComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    MyDatePickerModule
  ],
  providers: [EntryService,PatientService,MediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
