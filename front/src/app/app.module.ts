import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { JobsListComponent } from './_components/_elements/jobs-list/jobs-list.component';
import { JobsFiltersComponent } from './_components/_elements/jobs-filters/jobs-filters.component';
import { JobsListCardComponent } from './_components/_elements/jobs-list-card/jobs-list-card.component';
import { JobsFeedComponent } from './_components/_elements/jobs-feed/jobs-feed.component';
import { JobFiltersButtonComponent } from './_components/_elements/job-filters-button/job-filters-button.component';

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
    HomePageComponent,
    JobsListComponent,
    JobsFiltersComponent,
    JobsListCardComponent,
    JobsFeedComponent,
    JobFiltersButtonComponent
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
