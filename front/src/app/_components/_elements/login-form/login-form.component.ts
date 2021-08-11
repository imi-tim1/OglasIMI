import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginHttpService } from 'src/app/_utilities/_api/_services/login-http.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {

  constructor(private http: LoginHttpService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let requestBody: LoginHttpService.Request = {
      jwt: '',
      email: '',
      hashedPassword: ''
    }
    this.http.login(requestBody).subscribe(
      (response) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error.status);
      }
    );
  }

}
