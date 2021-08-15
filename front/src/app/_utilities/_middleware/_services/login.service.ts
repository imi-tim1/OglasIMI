import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseCode } from '../../_api/_data-types/enums';
import { Creds } from '../../_api/_data-types/interfaces';
import { JWT_HEADER_NAME } from '../../_api/_data-types/vars';
import { LoginApiService } from '../../_api/_services/login-api.service';
import { PasswdHash } from '../../_helpers/hash-util';
import { JWTUtil } from '../../_helpers/jwt-util';
import { RedirectRoute } from '../../_constants/routing.properties';
import { ComponentAccessService } from './component-access.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public responseCode: ResponseCode = ResponseCode.Unknown;

  constructor(private api: LoginApiService, private router: Router) { }

  login(email: string, password: string) {
    console.log('Kredencijali\n');
    console.log(password);

    let body: Creds = {
      email: email,
      hashedPassword: PasswdHash.encrypt(password)
    }

    console.log('Kredencijali\n');
    console.log(body);

    this.api.login(body).subscribe(
      // Login Success
      (response: HttpResponse<null>) => {
        JWTUtil.store(response.headers.get(JWT_HEADER_NAME));
        this.responseCode = ResponseCode.Success;
        this.router.navigate([RedirectRoute.DEFAULT]);
      },

      // Login Failed
      (error: HttpErrorResponse) => {
        switch (error.status) {
          
          // Unauthorized
          case HttpStatusCode.Unauthorized:
            // Session Expired
            if (JWTUtil.get() != '') {
              this.responseCode = ResponseCode.SessionExpired;
              this.router.navigate([RedirectRoute.DEFAULT]);
            }
            // Wrong credentials
            else {
              this.responseCode = ResponseCode.WrongCredentials;
              console.log('pogresni kredencijali')
            }
            JWTUtil.delete();
            break;

          // Forbidden
          case HttpStatusCode.Forbidden:
            this.responseCode = ResponseCode.Forbidden;
            if(JWTUtil.exists()) {
              this.router.navigate([RedirectRoute.DEFAULT]);
            }
            console.log('Nalog jos nije potvrdjen');
            break;
          
            // Bad Request
          case HttpStatusCode.BadRequest:
            JWTUtil.delete();
            this.router.navigate([RedirectRoute.DEFAULT]);
            break;
        }
      }
    );
  }
}
