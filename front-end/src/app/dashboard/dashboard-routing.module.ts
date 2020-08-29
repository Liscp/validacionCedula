import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {PostulationsComponent} from './postulations/postulations.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'postulations', component: PostulationsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
