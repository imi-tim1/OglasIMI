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
import { HomePageComponent } from './_components/_pages/home-page/home-page.component';
import { JobsListComponent } from './_components/_elements/jobs-list/jobs-list.component';
import { JobsFiltersComponent } from './_components/_elements/jobs-filters/jobs-filters.component';
import { JobsListCardComponent } from './_components/_elements/jobs-list-card/jobs-list-card.component';
import { JobsFeedComponent } from './_components/_elements/jobs-feed/jobs-feed.component';
import { RegisterFormComponent } from './_components/_elements/register-form/register-form.component';
import { TestingPageComponent } from './_components/_pages/testing-page/testing-page.component';
import { LogoutPageComponent } from './_components/_pages/logout-page/logout-page.component';
import { EmployersPageComponent } from './_components/_pages/employers-page/employers-page.component';
import { Navbar2Component } from './_components/_elements/navbar2/navbar2.component';
import { EmployerListCardComponent } from './_components/_elements/employer-list-card/employer-list-card.component';
import { DashboardEmployerComponent } from './_components/_elements/dashboard-employer/dashboard-employer.component';
import { DashboardApplicantComponent } from './_components/_elements/dashboard-applicant/dashboard-applicant.component';
import { DashboardAdminComponent } from './_components/_elements/dashboard-admin/dashboard-admin.component';
import { JobInfoPageComponent } from './_components/_pages/job-info-page/job-info-page.component';
import { JobInfoCardComponent } from './_components/_elements/job-info-card/job-info-card.component';
import { RegistrationCardComponent } from './_components/_elements/registration-card/registration-card.component';
import { RegistrationsListComponent } from './_components/_elements/registrations-list/registrations-list.component';
import { EmployerInfoCardComponent } from './_components/_elements/employer-info-card/employer-info-card.component';
import { ApplicantInfoCardComponent } from './_components/_elements/applicant-info-card/applicant-info-card.component';
import { CreateJobPageComponent } from './_components/_pages/create-job-page/create-job-page.component';
import { EmployerInfoPageComponent } from './_components/_pages/employer-info-page/employer-info-page.component';
import { ApplicantInfoPageComponent } from './_components/_pages/applicant-info-page/applicant-info-page.component';
import { ApplicantsPageComponent } from './_components/_pages/applicants-page/applicants-page.component';
import { ApplicantListCardComponent } from './_components/_elements/applicant-list-card/applicant-list-card.component';
import { SearchJobsPageComponent } from './_components/_pages/search-jobs-page/search-jobs-page.component';
import { JobCommentCardComponent } from './_components/_elements/job-comment-card/job-comment-card.component';
import { JobCommentsListComponent } from './_components/_elements/job-comments-list/job-comments-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavbarComponent,
    FooterComponent,
    LoginFormComponent,
    RegisterPageComponent,
    HomePageComponent,
    JobsListComponent,
    JobsFiltersComponent,
    JobsListCardComponent,
    JobsFeedComponent,
    RegisterFormComponent,
    TestingPageComponent,
    LogoutPageComponent,
    EmployersPageComponent,
    Navbar2Component,
    EmployerListCardComponent,
    DashboardEmployerComponent,
    DashboardApplicantComponent,
    DashboardAdminComponent,
    JobInfoPageComponent,
    JobInfoCardComponent,
    DashboardAdminComponent,
    RegistrationCardComponent,
    RegistrationsListComponent,
    EmployerInfoCardComponent,
    ApplicantInfoCardComponent,
    CreateJobPageComponent,
    EmployerInfoPageComponent,
    ApplicantInfoPageComponent,
    ApplicantsPageComponent,
    ApplicantListCardComponent,
    SearchJobsPageComponent,
    JobCommentCardComponent,
    JobCommentsListComponent
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
