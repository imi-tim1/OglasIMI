import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiProperties } from '../../_constants/api.properties';
import { HeaderUtil } from '../../_helpers/http-util';
import { Applicant, Job, NewApplicant } from '../_data-types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApplicantApiService {

  private url: string = apiProperties.url + '/api/applicants'

  constructor(private http: HttpClient) { }

  // Potrebno TESTIRANJE !!!
  getApplicants(notApprovedRequested: boolean): Observable<HttpResponse<Applicant[]>> {
    let par: HttpParams = new HttpParams();
    par = par.set('notApprovedRequested', notApprovedRequested);
    
    return this.http.get<Applicant[]>(
      this.url,
      {
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders(),
        params: par
      }
    );
  }

  // Potrebno TESTIRANJE !!!
  getApplicant(id: number): Observable<HttpResponse<Applicant>> {
    return this.http.get<Applicant>(
      this.url + `/${id}`,
      {
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      }
    );
  }

  // Potrebno TESTIRANJE !!!
  getApplicantsJobs(id: number): Observable<HttpResponse<Job[]>> {
    return this.http.get<Job[]>(
      this.url + `/${id}/jobs`,
      {
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      }
    );
  }

  // Potrebno TESTIRANJE !!!
  createApplicant(applicantData: NewApplicant): Observable<HttpResponse<null>> {
    return this.http.post<null>(
      this.url, // api url
      applicantData, // body
      { // options
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      });
  }
  
}
