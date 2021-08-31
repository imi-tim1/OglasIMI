import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseCode } from '../../_api/_data-types/enums';
import { Creds } from '../../_api/_data-types/interfaces';
import { JWT_HEADER_NAME } from '../../_api/_data-types/vars';
import { LoginApiService } from '../../_api/_services/login-api.service';
import { PasswdHash } from '../../_helpers/hash-util';
import { JWTUtil } from '../../_helpers/jwt-util';
import { RedirectRoutes } from '../../_constants/routing.properties';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private api: LoginApiService, 
    private router: Router,
    private authService: AuthService
  ) { }

  login(email: string, password: string, self?: any, 
        callbackSuccess?: Function, callbackWrongCredentials?: Function, callbackNotApproved?: Function) {
    console.log('Kredencijali\n');
    console.log(password);

    let body: Creds = {
      email: email,
      hashedPassword: PasswdHash.encrypt(password)
    }

    console.log('Kredencijali\n');
    console.log(body);

    this.api.login(body).subscribe(
      // Success
      (response: HttpResponse<null>) => {
        JWTUtil.store(response.headers.get(JWT_HEADER_NAME));
        if(self && callbackSuccess) callbackSuccess(self);
      },

      // Error
      (error: HttpErrorResponse) => {
        this.authService.redirectIfSessionExpired(error.status);

        switch (error.status) {
          // Unauthorized
          case HttpStatusCode.Unauthorized:
            // Wrong Credentials
            if(JWTUtil.get() == '') {
              if(self && callbackWrongCredentials) callbackWrongCredentials(self);
            }
            JWTUtil.delete();
            break;

          // Forbidden
          case HttpStatusCode.Forbidden:
            if(JWTUtil.exists()) {
              this.router.navigate(RedirectRoutes.ON_FORBIDDEN);
            }
            else {
              // Not Approved
              if(self && callbackNotApproved) callbackNotApproved(self);
            }
            break;
          
          // Bad Request
          case HttpStatusCode.BadRequest:
            JWTUtil.delete();
            //this.router.navigate(['']);
            break;
        }
      }
    );
  }
}
