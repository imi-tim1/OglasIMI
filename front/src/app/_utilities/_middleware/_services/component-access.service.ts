import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '../../_api/_data-types/enums';
import { IdentityApiService } from '../../_api/_services/identity-api.service';

@Injectable({
  providedIn: 'root'
})

export class ComponentAccessService {

  public redirectRoute: string = '';
  public allowed: boolean = false;
  public jwt: string | null = '';

  constructor(
    private identityApi: IdentityApiService,
    private router: Router
  ){}

  checkAccess(allowedRoles: UserRole[]) {
    this.identityApi.getCurrent().subscribe(
      (response) => {
        this.jwt = response.headers.get('Json-Web-Token');
        console.log(this.jwt);
      },
      (error: HttpErrorResponse) => {
        console.log('error: ' + error.status);
        this.router.navigate([this.redirectRoute])
      }
    );
  }

  setRedirectRoute(route: string) {

  }

}
