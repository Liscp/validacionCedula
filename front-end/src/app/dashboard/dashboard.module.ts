import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users/users.component';
import {SidebarComponent} from './sidebar/sidebar.component';

import {DashboardRoutingModule} from './dashboard-routing.module';
import { PostulationsComponent } from './postulations/postulations.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    UsersComponent,
    SidebarComponent,
    PostulationsComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule
    ]
})
export class DashboardModule {
}
