import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ManageFilesComponent} from "./manage-files/manage-files.component";
import {authGuard} from "./auth/auth.guard";

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
},
  {
    path: 'register',
    component: RegisterComponent
  },{
    path: 'manage-files',
    component: ManageFilesComponent,
    canActivate: [authGuard]
  },{
    path: '',
    redirectTo: '/manage-files',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
