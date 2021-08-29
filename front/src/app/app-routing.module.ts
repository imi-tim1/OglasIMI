import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantInfoPageComponent } from './_components/_pages/applicant-info-page/applicant-info-page.component';
import { ApplicantsPageComponent } from './_components/_pages/applicants-page/applicants-page.component';
import { JobsFeedComponent } from './_components/_elements/jobs-feed/jobs-feed.component';
import { CreateJobPageComponent } from './_components/_pages/create-job-page/create-job-page.component';
import { EmployerInfoPageComponent } from './_components/_pages/employer-info-page/employer-info-page.component';
import { EmployersPageComponent } from './_components/_pages/employers-page/employers-page.component';
import { HomePageComponent } from './_components/_pages/home-page/home-page.component';
import { JobInfoPageComponent } from './_components/_pages/job-info-page/job-info-page.component';
import { LoginPageComponent } from './_components/_pages/login-page/login-page.component';
import { LogoutPageComponent } from './_components/_pages/logout-page/logout-page.component';
import { RegisterPageComponent } from './_components/_pages/register-page/register-page.component';
import { TestingPageComponent } from './_components/_pages/testing-page/testing-page.component';
import { UserRole } from './_utilities/_api/_data-types/enums';
import { DashboardApplicantComponent } from './_components/_elements/dashboard-applicant/dashboard-applicant.component';
import { SearchJobsPageComponent } from './_components/_pages/search-jobs-page/search-jobs-page.component';
import { AlertPageComponent } from './_components/_pages/alert-page/alert-page.component';

// data - Niz uloga koje imaju pristup ruti/stranici, prazan niz daje dozvolu svim ulogama
const routes: Routes = [
  { path: 'alert/:cause/:param', component: AlertPageComponent,   data: { allowedRoles: [] }},
  { path: 'alert/:cause', component: AlertPageComponent,          data: { allowedRoles: [] }},
  
  { path: 'new-job', component: CreateJobPageComponent,           data: { allowedRoles: [UserRole.Employer] }},
  { path: 'my-jobs', component: DashboardApplicantComponent,      data: { allowedRoles: [UserRole.Applicant] }},
  
  { path: 'applicant/:id', component: ApplicantInfoPageComponent, data: { allowedRoles: [UserRole.Admin, UserRole.Employer, UserRole.Applicant] }},
  { path: 'applicants', component: ApplicantsPageComponent,       data: { allowedRoles: [UserRole.Admin] }},
  { path: 'employer/:id', component: EmployerInfoPageComponent,   data: { allowedRoles: [] }},
  { path: 'employers', component: EmployersPageComponent,         data: { allowedRoles: [] }},
  { path: 'job/:id', component: JobInfoPageComponent,             data: { allowedRoles: [] }},
  { path: 'jobs-feed', component: SearchJobsPageComponent,        data: { allowedRoles: [UserRole.Admin, UserRole.Employer] }},
  
  { path: 'logout', component: LogoutPageComponent,               data: { allowedRoles: [UserRole.Admin, UserRole.Employer, UserRole.Applicant] }},
  { path: 'login', component: LoginPageComponent,                 data: { allowedRoles: [UserRole.Visitor] }},
  { path: 'register', component: RegisterPageComponent,           data: { allowedRoles: [UserRole.Visitor] }},
  
  { path: 'testing', component: TestingPageComponent,             data: { allowedRoles: [] }},
  { path: '', component: HomePageComponent,                       data: { allowedRoles: [] }},
  { path: '**', component: HomePageComponent,                       data: { allowedRoles: [] }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
