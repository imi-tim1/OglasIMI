import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './_components/_pages/login-page/login-page.component';
import { NavbarComponent } from './_components/_elements/navbar/navbar.component';
import { FooterComponent } from './_components/_elements/footer/footer.component';
import { LoginFormComponent } from './_components/_elements/login-form/login-form.component';
import { RegisterPageComponent } from './_components/_pages/register-page/register-page.component';
import { ApplicantRegisterFormComponent } from './_components/_elements/applicant-register-form/applicant-register-form.component';
import { EmployerRegisterFormComponent } from './_components/_elements/employer-register-form/employer-register-form.component';
import { HomePageComponent } from './_components/_pages/home-page/home-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavbarComponent,
    FooterComponent,
    LoginFormComponent,
    RegisterPageComponent,
    ApplicantRegisterFormComponent,
    EmployerRegisterFormComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
