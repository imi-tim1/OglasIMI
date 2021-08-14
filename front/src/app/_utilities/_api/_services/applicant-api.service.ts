import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiProperties } from '../../_constants/api.properties';
import { HeaderUtil } from '../../_helpers/http-util';
import { Applicant, Job } from '../_data-types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApplicantApiService {

  private url: string = apiProperties.url + '/api/applicants'

  constructor(private http: HttpClient) { }

  // Potrebno TESTIRANJE !!!
  getApplicants(): Observable<HttpResponse<Applicant[]>> {
    return this.http.get<Applicant[]>(
      this.url,
      {
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
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
  createApplicant(applicantData: Applicant): Observable<HttpResponse<null>> {
    return this.http.post<null>(
      this.url, // api url
      applicantData, // body
      { // options
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      });
  }
  
}