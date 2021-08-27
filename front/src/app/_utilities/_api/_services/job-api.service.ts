import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpParamsOptions, HttpParameterCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiProperties } from '../../_constants/api.properties';
import { HeaderUtil, ParamUtil } from '../../_helpers/http-util';
import { JWTUtil } from '../../_helpers/jwt-util';
import { Applicant, Filters, Job, NewJob, PagedJobs } from '../_data-types/interfaces';
import { StandardHeaders } from '../_data-types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class JobApiService {

  private url: string = apiProperties.url + '/api/jobs';

  constructor(private http: HttpClient) { }

  getJobs(filters: Filters): Observable<HttpResponse<PagedJobs>> 
  {
    let par: HttpParams = new HttpParams({ 
      encoder: { encodeKey: k=>k, encodeValue: v=>encodeURIComponent(v),
                decodeKey: k=>k, decodeValue: v=>decodeURIComponent(v) } 
    });
    let key: keyof typeof filters;
    for (key in filters) {
      let x = filters[key];
      if(x != undefined) {
        par = par.set(key, (typeof x == typeof [])? (x as number[]).join(',') : (x as string | number | boolean));
      }
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

  getJobsApplicants(id: number): Observable<HttpResponse<Applicant[]>>  
  {
    let response = this.http.get<Applicant[]>(
      this.url + `/${id}/applicants`, 
      { 
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      }
    );

    return response;
  }

  createJob(jobData: NewJob): Observable<HttpResponse<null>>
  {
    return this.http.post<null>(
      this.url,
      jobData,
      {
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      });
  }

  applyToJob(id: number): Observable<HttpResponse<null>> 
  {
    return this.http.post<null>(
      this.url + `/${id}/applicants`,
      {},
      {
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      }
    );
  }

  deleteJob(id: number): Observable<HttpResponse<null>> 
  {
    return this.http.delete<null>(
      this.url + `/${id}`,
      {
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      }
    )
  }

  // ---- Comments ----

  getJobComments() {

  }

  postNewJobComment() {

  }

  deleteJobComment() {
    
  }

}