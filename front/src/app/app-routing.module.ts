import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateJobPageComponent } from './_components/_pages/create-job-page/create-job-page.component';
import { EmployersPageComponent } from './_components/_pages/employers-page/employers-page.component';
import { HomePageComponent } from './_components/_pages/home-page/home-page.component';
import { JobInfoPageComponent } from './_components/_pages/job-info-page/job-info-page.component';
import { LoginPageComponent } from './_components/_pages/login-page/login-page.component';
import { LogoutPageComponent } from './_components/_pages/logout-page/logout-page.component';
import { RegisterPageComponent } from './_components/_pages/register-page/register-page.component';
import { TestingPageComponent } from './_components/_pages/testing-page/testing-page.component';

const routes: Routes = [
  { path: 'employers', component: EmployersPageComponent },
  { path: 'job/:id', component: JobInfoPageComponent },
  { path: 'testing', component: TestingPageComponent },
  { path: 'logout', component: LogoutPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'new-job', component: CreateJobPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
