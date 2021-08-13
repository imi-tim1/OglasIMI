import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiProperties } from '../../_constants/api.properties';
import { HeaderUtil } from '../../_helpers/http-util';
import { UserRole } from '../_data-types/enums';

@Injectable({
  providedIn: 'root'
})
export class IdentityApiService {

  private url: string = apiProperties.url + '/api/auth';

  constructor(private http: HttpClient) { }

  getCurrent(): Observable<HttpResponse<null>> {
    // let params: HttpParams = new HttpParams({
    //   fromObject: {
    //     jwt: jwt
    //   }
    // });

    return this.http.get<null>(
      this.url, 
      { 
        headers: HeaderUtil.jwtOnlyHeaders(), 
        observe: 'response' 
      }
    );
  }
}
