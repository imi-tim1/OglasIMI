import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Field } from '../../_api/_data-types/interfaces';
import { Tag } from '../../_api/_data-types/interfaces';
import { FieldApiService } from '../../_api/_services/field-api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  constructor(
    private api: FieldApiService,
    private authService: AuthService
  ) { }

  getFields(self?: any, successCallback?: Function) 
  {
    this.api.getFields().subscribe(
      // Success
      (response) => {
        // Callback
        if (response.body)
          if (self && successCallback) { successCallback(self, response.body) };

        // console.log('Get Fields (Success), Body: ')
        // console.log(response.body)
        // this.fields = (response.body == null)? [] : response.body;
        // console.log('Fields: ')
        // console.log(this.fields)
      },

      // Error
      (error: HttpErrorResponse) => {
        this.authService.redirectIfSessionExpired(error.status);
      }
    );
  }

  getTags(fieldId: number, self?: any, successCallback?: Function) {
    this.api.getTags(fieldId).subscribe(
      // Success
      (response) => {
        // Callback
        if (response.body)
          if (self && successCallback) { successCallback(self, response.body) };

        // console.log('Get Tags (Success), Body: ')
        // console.log(response.body)
        // this.tags = (response.body == null)? [] : response.body;
        // console.log('Tags: ')
        // console.log(this.tags)
      },

      // Error
      (error: HttpErrorResponse) => {
        this.authService.redirectIfSessionExpired(error.status);
      }
    );
  }
}
