import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employer, Job, NewEmployer } from '../../_api/_data-types/interfaces';
import { EmployerApiService } from '../../_api/_services/employer-api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  public employers: Employer[] = [];
  public employer: Employer | null = null;
  public employersJobs: Job[] = []

  constructor(private api: EmployerApiService) { }

  getEmployers(notApproved?: boolean, self?: any, successCallback?: Function) {
    this.api.getEmployers((notApproved == undefined)? false : notApproved).subscribe(
      // Success
      (response) => {
        console.log('Get Employers (Success), Body: ')
        console.log(response.body)
        this.employers = (response.body == null)? [] : response.body;
        console.log('Employers: ')
        console.log(this.employers)

        // Callback
        if(response.body)
          if(self && successCallback) { successCallback(self, response.body) };
      }
    );
  }

  getEmployer(id: number, self?: any, successCallback?: Function) {
    this.api.getEmployer(id).subscribe(
      // Success
      (response) => {
        this.employer = response.body;
        console.log('Employer: ')
        console.log(this.employer)

        // Callback
        if(self && successCallback) { successCallback(self, response.body) };
      }
    );
  }

  getEmployersJobs(id: number, self?: any, successCallback?: Function) {
    this.api.getEmployersJobs(id).subscribe(
      // Success
      (response) => {
        this.employersJobs = (response.body == null)? [] : response.body;
        console.log('Employers Jobs: ')
        console.log(this.employersJobs)
        // Callback
        if(response.body) {
          console.log('get emps jobs, body OK')
          if(self && successCallback) { console.log('get emps jobs, OK'); successCallback(self, response.body)};
        }
      }
    );
  }

  createEmployer(employerData: NewEmployer, self?: any, 
                 successCallback?: Function, conflictCallback?: Function) {
    this.api.createEmployer(employerData).subscribe(
      // Success
      (response) => {
        console.log('New Employer Added, status: ' + response.status);
        if(self && successCallback) successCallback(self);
      },
      (error: HttpErrorResponse) => {
        if(error.status == HttpStatusCode.Conflict) {
          if(self && conflictCallback) conflictCallback(self);
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
        if(self && successCallback) successCallback(self);
      }
    );
  }

  approveEmployer(id: number, self?: any, successCallback?: Function) {
    this.api.approveEmployer(id).subscribe(
      // Success
      (response) => {
        console.log('Approve Employer, status: ' + response.status);
        // Callback
        if(self && successCallback) successCallback(self);
      }
    );
  }

  getEmployersRating(id: number, self?: any, successCallback?: Function) {
    this.api.getEmployersRating(id).subscribe(
      // Success
      (response) => {
        // Callback
        if(self && successCallback) successCallback(self, response.body);
      }
    );
  }
}
