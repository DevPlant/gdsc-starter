import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ManageFilesComponent} from './manage-files/manage-files.component';
import {ReactiveFormsModule} from '@angular/forms';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {authInterceptor, } from "./auth/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ManageFilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({
      // YOUR CREDENTIALS HERE

    })),

    provideAuth(() => getAuth()),
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule {
}
