import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiProperties } from '../../_constants/api.properties';
import { HeaderUtil } from '../../_helpers/header-util';
import { JWTUtil } from '../../_helpers/jwt-util';
import { Job } from '../_data-types/interfaces';
import { StandardHeaders } from '../_data-types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class JobApiService {

  private url: string = apiProperties.url + '/api/jobs';

  constructor(private http: HttpClient) { }

  getJobs(): Observable<HttpResponse<Job[]>> 
  {
    let response = this.http.get<Job[]>(
      this.url, 
      { 
        headers: HeaderUtil.jwtOnlyHeaders(), 
        observe: 'response'
      }
    );

    return response;
  }
}
