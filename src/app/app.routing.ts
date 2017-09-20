import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { RoomComponent } from "./room/room.component";


const appRoutes: Routes = [
    { path: '', component: RoomComponent },
    { path: 'room', component: RoomComponent },
    { path: '**', component: RoomComponent }

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);