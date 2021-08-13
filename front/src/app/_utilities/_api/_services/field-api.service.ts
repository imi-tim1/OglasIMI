import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiProperties } from '../../_constants/api.properties';
import { HeaderUtil } from '../../_helpers/http-util';
import { Field, Tag } from '../_data-types/interfaces';

@Injectable({
  providedIn: 'root'
})

export class FieldApiService {

  private url: string = apiProperties.url + '/api/fields'

  constructor(private http: HttpClient) { }

  getFields(): Observable<HttpResponse<Field[]>> {
    return this.http.get<Field[]>(
      this.url,
      {
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      }
    );
  }

  getTags(id: number): Observable<HttpResponse<Tag[]>> {
    return this.http.get<Tag[]>(
      this.url + `/${id}/tags`,
      {
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      }
    );
  }

}