import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../../_api/_data-types/interfaces';
import { CityApiService } from '../../_api/_services/city-api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  public cities: City[] = [];

  constructor(
    private api: CityApiService,
    private authService: AuthService
  ) { }

  getCities(self?: any, successCallback?: Function) {
    this.api.getCities().subscribe(
      // Success
      (response) => {
        // Callback
        if (response.body)
          if (self && successCallback) { successCallback(self, response.body) };

        // console.log('Get Cities (Success), Body: ')
        // console.log(response.body)
        // this.cities = (response.body == null)? [] : response.body;
        // console.log('Cities: ')
        // console.log(this.cities)
      },

      // Error
      (error: HttpErrorResponse) => {
        this.authService.redirectIfSessionExpired(error.status);
      }
    );
  }
}
