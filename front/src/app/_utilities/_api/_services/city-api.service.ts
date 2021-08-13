import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiProperties } from '../../_constants/api.properties';
import { HeaderUtil } from '../../_helpers/http-util';
import { City } from '../_data-types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CityApiService {

  private url: string = apiProperties.url + '/api/cities'

  constructor(private http: HttpClient) { }

  getCities(): Observable<HttpResponse<City[]>> {
    return this.http.get<City[]>(
      this.url,
      {
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      }
    );
  }
}
