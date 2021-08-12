import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Creds } from '../../_api/_data-types/interfaces';
import { JWT_HEADER_NAME } from '../../_api/_data-types/vars';
import { LoginApiService } from '../../_api/_services/login-api.service';
import { Sha256 } from '../../_helpers/hash-util';
import { JWTUtil } from '../../_helpers/jwt-util';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginFailed: boolean = false;
  public accountApproved: boolean = true;

  constructor(private api: LoginApiService) { }

  login(email: string, password: string) 
  {
    let body: Creds = {
      email: email,
      hashedPassword: Sha256.encrypt(password)
    }

    console.log('Kredencijali\n');
    console.log(body);

    this.api.login(body).subscribe
    (
      // Login Success
      (response: HttpResponse<null>) => {
        this.loginFailed = false;
        console.log('body:');
        console.log(response.body);
      },

      // Login Failed
      (error: HttpErrorResponse) => {
        console.log(error.error);
        // Unauthorized
        if (HttpStatusCode.Unauthorized == error.status) {
          this.loginFailed = true;
          JWTUtil.delete();
        }
        // Forbidden
        if (HttpStatusCode.Forbidden == error.status) {

        }
      },
      ()=>{console.log("Complete")}
    );
  }
}
