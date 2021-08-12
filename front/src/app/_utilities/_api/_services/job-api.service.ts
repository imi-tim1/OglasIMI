import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiProperties } from '../../_constants/api.properties';
import { Job } from '../_data-types/classes';
import { StandardHeaders } from '../_data-types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class JobApiService {

  private url: string = apiProperties.url + '/api/jobs';

  constructor(private http: HttpClient) { }

  getJobs(): Observable<HttpResponse<Job[]>> {
    let h: StandardHeaders = {
      'Json-Web-Token': ''
    }
    
    return this.http.get<Job[]>(this.url, { headers: new HttpHeaders(), observe: 'response' });
  }
}
