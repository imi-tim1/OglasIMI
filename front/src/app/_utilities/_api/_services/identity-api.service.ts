import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiProperties } from '../../_constants/api.properties';
import { UserRole } from '../_data-types/enums';

@Injectable({
  providedIn: 'root'
})
export class IdentityApiService {

  private url: string = apiProperties.url + '/api/auth';

  constructor(private http: HttpClient) { }

  getCurrent(): Observable<HttpResponse<any>> {
    // let params: HttpParams = new HttpParams({
    //   fromObject: {
    //     jwt: jwt
    //   }
    // });

    let j = 'eyJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiZXhwIjoxNjI4NzE3NzA0LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAifQ.B5cVELJKOcoUd1kExFG46nUYbWpRhDj6zQ94GsNI59w';

    let headers: HttpHeaders = new HttpHeaders({
      'json-web-token': j
    });

    return this.http.get<HttpResponse<any>>(this.url, { headers: headers, observe: 'response' });
  }
}
