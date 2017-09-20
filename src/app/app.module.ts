import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing, appRoutingProviders } from './app.routing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { DbserviceService } from './services/dbservice.service';

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
    RoomComponent
  ],
  imports: [
    BrowserModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [appRoutingProviders,DbserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
