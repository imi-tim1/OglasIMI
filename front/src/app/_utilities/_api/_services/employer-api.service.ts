import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiProperties } from '../../_constants/api.properties';
import { HeaderUtil } from '../../_helpers/http-util';
import { Employer, Job } from '../_data-types/interfaces';

@Injectable({
  providedIn: 'root'
})

export class EmployerApiService {

  private url: string = apiProperties.url + '/api/employers'

  constructor(private http: HttpClient) { }

  getEmployers(): Observable<HttpResponse<Employer[]>> {
    return this.http.get<Employer[]>(
      this.url,
      {
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      }
    );
  }

  // Potrebno TESTIRANJE !!!
  getEmployer(id: number): Observable<HttpResponse<Employer>> {
    return this.http.get<Employer>(
      this.url + `/${id}`,
      {
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      }
    );
  }

  // Potrebno TESTIRANJE !!!
  getEmployersJobs(id: number): Observable<HttpResponse<Job[]>> {
    return this.http.get<Job[]>(
      this.url + `/${id}/jobs`,
      {
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      }
    );
  }

  // Potrebno TESTIRANJE !!!
  createEmployer(employerData: Employer): Observable<HttpResponse<null>> {
    return this.http.post<null>(
      this.url,
      employerData,
      {
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      });
  }

}
