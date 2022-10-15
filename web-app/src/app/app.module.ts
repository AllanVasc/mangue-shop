import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Fornecedor } from './fornecedor';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { RegisterPFComponent } from './register-pf/register-pf.component';
import { RegisterPJComponent } from './register-pj/register-pj.component';
import { FinishRegistrationComponent } from './finish-registration/finish-registration.component';
import { FornecedorService } from './services/fornecedor.service';
import { DespachosComponent } from './despachos/despachos.component';
import { AccountComponent } from './account/account.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

//import { routing } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    RegisterPFComponent,
    RegisterPJComponent,
    FinishRegistrationComponent,
    DespachosComponent,
    AccountComponent,
    UpdateAccountComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [FornecedorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
