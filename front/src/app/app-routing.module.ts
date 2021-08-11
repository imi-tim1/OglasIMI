import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './_components/_pages/login-page/login-page.component';
import { RegisterPageComponent } from './_components/_pages/register-page/register-page.component';

const routes: Routes = [
  { path: 'login', component: RegisterPageComponent },
  { path: 'register', component: LoginPageComponent },
  { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
