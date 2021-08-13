import { Component, Input, OnInit } from '@angular/core';
import { ResponseCode } from 'src/app/_utilities/_api/_data-types/enums';
import { LoginService } from 'src/app/_utilities/_middleware/_services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {

  @Input() public email: string = '';
  @Input() public password: string = '';

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginService.login(this.email, this.password);
  }

  checkLoginFailed(): boolean {
    return this.loginService.responseCode == ResponseCode.WrongCredentials;
  }

}
