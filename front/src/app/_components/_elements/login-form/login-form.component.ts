import { Component, Input, OnInit } from '@angular/core';
import { ResponseCode, UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { ComponentAccessService } from 'src/app/_utilities/_middleware/_services/component-access.service';
import { LoginService } from 'src/app/_utilities/_middleware/_services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {

  public allowedRoles: UserRole[] = [
    UserRole.Visitor
  ]

  @Input() public email: string = '';
  @Input() public password: string = '';

  constructor(public accessService: ComponentAccessService, public loginService: LoginService) { }

  ngOnInit(): void {
    this.accessService.checkAccess(this.allowedRoles);
    console.log('Login Page Loaded');
  }

  onSubmit() {
    this.loginService.login(this.email, this.password);
  }

  checkLoginFailed(): boolean {
    return this.loginService.responseCode == ResponseCode.WrongCredentials;
  }

}
