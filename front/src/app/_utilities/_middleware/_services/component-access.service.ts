import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '../../_api/_data-types/enums';
import { JWT_HEADER_NAME } from '../../_api/_data-types/vars';
import { IdentityApiService } from '../../_api/_services/identity-api.service';
import { DEFAULT_REDIRECT_ROUTE } from '../../_constants/routing.properties';
import { JWTUtil } from '../../_helpers/jwt-util';

@Injectable({
  providedIn: 'root'
})

export class ComponentAccessService {

  public redirectRoute: string = DEFAULT_REDIRECT_ROUTE;
  public allowed: boolean = false;

  constructor(
    private api: IdentityApiService,
    private router: Router
  ){}
  
  checkAccess(allowedRoles: UserRole[]) {
    this.api.getCurrent().subscribe(
      // Success (Logged In)
      (response) => {
        JWTUtil.store(response.headers.get(JWT_HEADER_NAME));
        const role: UserRole = JWTUtil.getRole() as UserRole;
        this.allowed = allowedRoles.includes(role);

        console.log('Check Access, "Success" Block'); // DEBUG
        console.log('Status: ' + response.status); // DEBUG
        console.log('User Role: ' + role); // DEBUG
        console.log('Allowed: ' + this.allowed); // DEBUG

        // Not Allowed
        if (!this.allowed) {
          console.log('Redirecting to "' + this.redirectRoute + '"...'); // DEBUG
          this.router.navigate([this.redirectRoute]);
        }
      },
      // Error (Not Logged In)
      (error: HttpErrorResponse) => {
        JWTUtil.delete();

        console.log('Check Access, "Error" Block'); // DEBUG
        console.log('Status: ' + error.status); // DEBUG
        
        console.log('Redirecting to "' + this.redirectRoute + '"...'); // DEBUG
        this.router.navigate([this.redirectRoute]);
      }
    );
  }

  setRedirectRoute(route: string) {
    this.redirectRoute = route;
  }

}
