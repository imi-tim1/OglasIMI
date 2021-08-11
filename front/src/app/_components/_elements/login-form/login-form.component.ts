import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { LoginApiService } from 'src/app/_utilities/_api/_services/login-api.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {

  public loginFailed: boolean = false;
  public accountApproved: boolean = true;

  @Input() public email: string = '';
  @Input() public password: string = '';

  constructor(private loginApi: LoginApiService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let requestBody: LoginApiService.Request = {
      jwt: '',                      // Potrebno je izvuci jwt sa local storage-a !!!! Ovo je za test
      email: this.email,
      hashedPassword: this.password // Potrebna je hesirana srfra !!!! Ovo je za test
    }

    console.log('Kredencijali\n' + requestBody);

    this.loginApi.login(requestBody).subscribe(
      // Login Success
      (response) => {
        this.loginFailed = false;
        console.log(response);
      },
      // Login Failed
      (error: HttpErrorResponse) => {
        console.log(error.error);
        if (HttpStatusCode.Unauthorized == error.status) {
          this.loginFailed = true;
        }
        if (HttpStatusCode.Forbidden == error.status) {

        }
      }
    );
  }

}
