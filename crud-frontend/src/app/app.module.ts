import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { FormsModule } from '@angular/forms';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [AppComponent, EmployeeListComponent, CreateEmployeeComponent, UpdateEmployeeComponent, PageNotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
