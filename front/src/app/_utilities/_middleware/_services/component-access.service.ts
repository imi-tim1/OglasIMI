import { HttpErrorResponse, HttpRequest, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '../../_api/_data-types/enums';
import { JWT_HEADER_NAME } from '../../_api/_data-types/vars';
import { IdentityApiService } from '../../_api/_services/identity-api.service';
import { RedirectRoute } from '../../_constants/routing.properties';
import { JWTUtil } from '../../_helpers/jwt-util';

@Injectable({
  providedIn: 'root'
})

export class ComponentAccessService {

  public redirectRoute: string = RedirectRoute.DEFAULT;
  public allowed: boolean = false;
  public role: UserRole = UserRole.Visitor;

  public roleType = {
    Visitor: UserRole.Visitor,
    Applicant: UserRole.Applicant,
    Employer: UserRole.Employer,
    Admin: UserRole.Admin
  }

  constructor(
    private api: IdentityApiService,
    private router: Router
  ){}

  checkRole(role: UserRole, allowedRoles: UserRole[]) {
    return (allowedRoles.length == 0)? true : allowedRoles.includes(role);
  }

  checkAccess(allowedRoles: UserRole[], self?: any, callbackForbidden?: Function, callbackUnauthorized?: Function) {
    this.api.getCurrent().subscribe(
      // Success (Logged In)
      (response) => {
        JWTUtil.store(response.headers.get(JWT_HEADER_NAME));
        this.role = JWTUtil.getUserRole();
        this.allowed = this.checkRole(this.role, allowedRoles);

        // Not Allowed
        if (!this.allowed) {
          // Callback (Forbidden) / Navigate
          if(self && callbackForbidden) callbackForbidden(self);
          else this.router.navigate([this.redirectRoute]);
        }
      },
      // Error (Not Logged In)
      (error: HttpErrorResponse) => {

        if (HttpStatusCode.Unauthorized == error.status) JWTUtil.delete();

        // Callback (Unauthorized/Forbidden) / Navigate
        if(self)
          if(callbackUnauthorized) callbackUnauthorized(self); 
          else if(callbackForbidden) callbackForbidden(self);
        else this.router.navigate([this.redirectRoute]);
      }
    );
  }

  setRedirectRoute(route: string) {
    this.redirectRoute = route;
  }

}
