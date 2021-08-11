import { Injectable, Self } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { apiProperties } from '../../_constants/api.properties';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginHttpService
{
  private url: string = apiProperties.url + '/api/login';

  constructor(private http: HttpClient) { }

  login(body: LoginHttpService.Request): Observable<LoginHttpService.Response> {
    return this.http.post<LoginHttpService.Response>(this.url, body);
  }
}

// Interfejsi

export namespace LoginHttpService 
{
    export interface Request {
      jwt: string;
      email: string;
      hashedPassword: string;
    }
    export interface Response {
      jwt: string;
    }
}