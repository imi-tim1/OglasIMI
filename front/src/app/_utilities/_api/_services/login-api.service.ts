import { Injectable, Self } from '@angular/core';
import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http'
import { apiProperties } from '../../_constants/api.properties';
import { Observable } from 'rxjs';
import { Creds, StandardHeaders } from '../_data-types/interfaces';
import { HeaderUtil } from '../../_helpers/http-util';
import { JWTUtil } from '../../_helpers/jwt-util';

@Injectable({
  providedIn: 'root'
})

export class LoginApiService
{
  private url: string = apiProperties.url + '/api/login';

  constructor(private http: HttpClient) { }

  login(body: Creds): Observable<HttpResponse<null>> 
  {
    let response = this.http.post<null>(
      this.url, 
      body, 
      {
        observe: 'response',
        headers: HeaderUtil.jwtOnlyHeaders()
      }
    );
    
    response.subscribe();
    
    return response;
  }
}

/*
  http status codes
*/

// pera@wuiii.com
// d32aea39aa588565353ce46716459c77039c06f032ce027519eccf209617cf6e

// misas@ad.min
// aeab55bba4162e7a7cde64142532e26955b1d5c8fb251d83ba95a7ba1ffdd238

// zika@bacv.anin
// 92ded8e40979699983b844c5c10bbefaa0fbcadd12795ee75a535e833bc1e9ca
