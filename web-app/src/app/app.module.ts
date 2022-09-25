import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarsComponent } from './cars/cars.component';
import { CarService } from './cars/cars.service';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//import { routing } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarsComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
