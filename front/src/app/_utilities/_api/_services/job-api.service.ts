import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiProperties } from '../../_constants/api.properties';
import { HeaderUtil, ParamUtil } from '../../_helpers/http-util';
import { JWTUtil } from '../../_helpers/jwt-util';
import { Filters, Job, PagedJobs } from '../_data-types/interfaces';
import { StandardHeaders } from '../_data-types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class JobApiService {

  private url: string = apiProperties.url + '/api/jobs';

  constructor(private http: HttpClient) { }

  getJobs(filters: Filters): Observable<HttpResponse<PagedJobs>> 
  {
    let par: HttpParams = new HttpParams();
    let key: keyof typeof filters;
    for (key in filters) {
      if(filters[key] != undefined)
        par = par.set(key, (typeof filters[key] == 'object')? ParamUtil.toString(filters[key]) : filters[key])
    }

    console.log(par.toString());

    let response = this.http.get<PagedJobs>(
      this.url, 
      { 
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders(),
        params: par
      }
    );

    return response;
  }

  getJob(id: number): Observable<HttpResponse<Job>> 
  {
    let response = this.http.get<Job>(
      this.url + `/${id}`, 
      { 
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      }
    );

    return response;
  }
}
