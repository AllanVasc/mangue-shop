import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { RegisterPFComponent } from './register-pf/register-pf.component';
import { RegisterPJComponent } from './register-pj/register-pj.component';
import { FinishRegistrationComponent } from './finish-registration/finish-registration.component';
import { DespachosComponent } from './despachos/despachos.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register-pf', component: RegisterPFComponent},
  {path: 'register-pj', component: RegisterPJComponent},
  {path: 'finish-registration', component: FinishRegistrationComponent},
  {path: 'despachos', component: DespachosComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
