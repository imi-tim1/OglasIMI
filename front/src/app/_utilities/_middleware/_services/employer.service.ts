import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employer, Job, NewEmployer, RatingResponse } from '../../_api/_data-types/interfaces';
import { EmployerApiService } from '../../_api/_services/employer-api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  // public employers: Employer[] = [];
  // public employer: Employer | null = null;
  // public employersJobs: Job[] = []

  constructor(private api: EmployerApiService, private authService: AuthService) { }

  getEmployers(notApproved?: boolean, self?: any, successCallback?: Function) {
    this.api.getEmployers((notApproved == undefined) ? false : notApproved).subscribe(
      // Success
      (response) => {
        // console.log('Get Employers (Success), Body: ')
        // console.log(response.body)
        // this.employers = (response.body == null) ? [] : response.body;
        // console.log('Employers: ')
        // console.log(this.employers)

        // Callback
        if (response.body)
          if (self && successCallback) { successCallback(self, response.body) };
      },

      // Error
      (error: HttpErrorResponse) => {
        this.authService.redirectIfSessionExpired(error.status);
      }
    );
  }

  getEmployer(id: number, self?: any, successCallback?: Function, notFoundCallback?: Function) {
    this.api.getEmployer(id).subscribe(
      // Success
      (response) => {
        // this.employer = response.body;
        // console.log('Employer: ')
        // console.log(this.employer)

        // Callback
        if (self && successCallback) { successCallback(self, response.body) };
      },

      // Error
      (error: HttpErrorResponse) => {
        this.authService.redirectIfSessionExpired(error.status);

        if(error.status == HttpStatusCode.NotFound) {
          if (self && notFoundCallback) notFoundCallback(self);
        }
      }
    );
  }

  getEmployersJobs(id: number, self?: any, successCallback?: Function) {
    this.api.getEmployersJobs(id).subscribe(
      // Success
      (response) => {
        // this.employersJobs = (response.body == null) ? [] : response.body;
        // console.log('Employers Jobs: ')
        // console.log(this.employersJobs)
        // Callback
        if (response.body) {
          console.log('get emps jobs, body OK')
          if (self && successCallback) { console.log('get emps jobs, OK'); successCallback(self, response.body) };
        }
      },

      // Error
      (error: HttpErrorResponse) => {
        this.authService.redirectIfSessionExpired(error.status);
      }
    );
  }

  createEmployer(employerData: NewEmployer, self?: any,
    successCallback?: Function, conflictCallback?: Function) {
    this.api.createEmployer(employerData).subscribe(
      // Success
      (response) => {
        console.log('New Employer Added, status: ' + response.status);
        if (self && successCallback) successCallback(self);
      },

      // Error
      (error: HttpErrorResponse) => {
        this.authService.redirectIfSessionExpired(error.status);

        if (error.status == HttpStatusCode.Conflict) {
          if (self && conflictCallback) conflictCallback(self);
        }
      }
    );
  }

  deleteEmployer(id: number, self?: any, successCallback?: Function) {
    this.api.deleteEmployer(id).subscribe(
      // Success
      (response) => {
        console.log('Deleted Employer, status: ' + response.status);
        // Callback
        if (self && successCallback) successCallback(self);
      },

      // Error
      (error: HttpErrorResponse) => {
        this.authService.redirectIfSessionExpired(error.status);
      }
    );
  }

  approveEmployer(id: number, self?: any, successCallback?: Function) {
    this.api.approveEmployer(id).subscribe(
      // Success
      (response) => {
        console.log('Approve Employer, status: ' + response.status);
        // Callback
        if (self && successCallback) successCallback(self);
      },

      // Error
      (error: HttpErrorResponse) => {
        this.authService.redirectIfSessionExpired(error.status);
      }
    );
  }

  getEmployersRating(id: number, self?: any, successCallback?: Function) {
    this.api.getEmployersRating(id).subscribe(
      // Success
      (response) => {
        // Callback
        if (self && successCallback) successCallback(self, response.body);
      },

      // Error
      (error: HttpErrorResponse) => {
        this.authService.redirectIfSessionExpired(error.status);
      }
    );
  }

  rateEmployer(id: number, rating: number, self?: any, successCallback?: Function) {
    this.api.rateEmployer(id, rating).subscribe(
      // Success
      (response) => {
        // Callback
        if (self && successCallback) successCallback(self);
      },

      // Error
      (error: HttpErrorResponse) => {
        this.authService.redirectIfSessionExpired(error.status);
      }
    );
  }
}
