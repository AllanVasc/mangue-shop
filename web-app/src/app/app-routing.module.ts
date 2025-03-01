import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { NegateAuthGuard } from "./guards/negate-auth.guard";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { RegisterPFComponent } from './register-pf/register-pf.component';
import { RegisterPJComponent } from './register-pj/register-pj.component';
import { FinishRegistrationComponent } from './finish-registration/finish-registration.component';
import { DespachosComponent } from './despachos/despachos.component';
import { AccountComponent } from './account/account.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ListdespachoComponent } from './listdespacho/listdespacho.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [NegateAuthGuard],   // If isLoggedIn == false
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NegateAuthGuard],   // If isLoggedIn == false
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NegateAuthGuard],   // If isLoggedIn == false
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],         //If isLoggedIn == true
  },
  {
	  path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],         //If isLoggedIn == true
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-account',
    component: UpdateAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "confirm-delete",
    component: ConfirmDeleteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "update-password",
    component: UpdatePasswordComponent,
    canActivate: [NegateAuthGuard],   //If isLoggedIn == false
  },
  {
    path: "despachos",
    component: DespachosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "notifications",
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "listdespacho",
    component: ListdespachoComponent,
    canActivate: [AuthGuard]
  },
  
  // Completar os outros
  {path: 'register', component: RegisterComponent},
  {path: 'register-pf', component: RegisterPFComponent},
  {path: 'register-pj', component: RegisterPJComponent},
  {path: 'finish-registration', component: FinishRegistrationComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
