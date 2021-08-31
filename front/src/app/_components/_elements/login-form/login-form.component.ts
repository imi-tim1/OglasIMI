import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseCode, UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { LoginService } from 'src/app/_utilities/_middleware/_services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {

  @Input() public email: string = '';
  @Input() public password: string = '';

  // Login status
  public wrongCreds: boolean = false;
  public notApproved: boolean = false;

  pattEmail: RegExp = /^[a-zA-Z0-9]+([\.\-\+][a-zA-Z0-9]+)*\@([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}$/;

  constructor(
    public loginService: LoginService,
    public router: Router
    ) { }

  ngOnInit(): void {
    console.log('Login Page Loaded');
  }

  onSubmit() {
    this.wrongCreds = false;
    this.notApproved = false;

    if (this.pattEmail.test(this.email)) {
      this.loginService.login(this.email, this.password, this, this.cbSuccess, this.cbWrongCreds, this.cbNotApproved);
    }
    else {
      this.wrongCreds = true;
    }
  }

  // API Callbacks

  cbSuccess(self: any) {
   self.wrongCreds = false;
   self.notApproved = false;
   self.router.navigate(['']);
  }

  cbWrongCreds(self: any) {
    self.wrongCreds = true;
  }

  cbNotApproved(self: any) {
    self.notApproved = true;
  }

}
