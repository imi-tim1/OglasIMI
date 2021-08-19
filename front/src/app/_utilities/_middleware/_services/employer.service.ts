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

  getEmployers(notApproved?: boolean) {
    this.api.getEmployers((notApproved == undefined)? false : notApproved).subscribe(
      // Success
      (response) => {
        console.log('Get Employers (Success), Body: ')
        console.log(response.body)
        this.employers = (response.body == null)? [] : response.body;
        console.log('Employers: ')
        console.log(this.employers)
      }
    );
  }

  getEmployer(id: number) {
    this.api.getEmployer(id).subscribe(
      // Success
      (response) => {
        this.employer = response.body;
        console.log('Employer: ')
        console.log(this.employer)
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
        if(self && successCallback) successCallback(self);
      }
    );
  }

  createEmployer(employerData: NewEmployer) {
    this.api.createEmployer(employerData).subscribe(
      // Success
      (response) => {
        console.log('New Employer Added, status: ' + response.status);
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
}
