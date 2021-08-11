import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRole } from '../_api/_data-types/enums';
import { IdentityApiService } from '../_api/_services/identity-api.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentAccessService {

  public allowed: boolean = false;

  constructor(private identityApi: IdentityApiService) { }

  checkAccess(allowedRoles: UserRole[]) {
    this.identityApi.getCurrent().subscribe(
      (response) => {
        console.log(response.headers.get('json-web-token'));
      },
      (error: HttpErrorResponse) => {
        console.log('ERRRRORRR');
        console.log(error);
      }
    );
  }

}
