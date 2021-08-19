import { Injectable } from '@angular/core';
import { Applicant, Job, NewApplicant } from '../../_api/_data-types/interfaces';
import { ApplicantApiService } from '../../_api/_services/applicant-api.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  public applicants: Applicant[] = [];
  public applicant: Applicant | null = null;
  public applicantsJobs: Job[] = []

  constructor(private api: ApplicantApiService) { }

  // Potrebno TESTIRANJE !!!
  getApplicants(notApproved?: boolean, self?: any, successCallback?: Function) {
    this.api.getApplicants((notApproved == undefined)? false : notApproved).subscribe(
      // Success
      (response) => {
        console.log('Get Applicants (Success), Body: ')
        console.log(response.body)
        this.applicants = (response.body == null)? [] : response.body;
        console.log('Applicants: ')
        console.log(this.applicants)

        // Callback
        if(response.body)
          if(self && successCallback) successCallback(self, response.body);
      }
    );
  }


  // Radi, Ostalo da se ispravi na backu da vraca Error kod admina umesto Success i null
  getApplicant(id: number, self?: any, successCallback?: Function) {
    this.api.getApplicant(id).subscribe(
      // Success
      (response) => {
        this.applicant = response.body;
        console.log('Applicant: ')
        console.log(this.applicant)
        // Callback
        if(self && successCallback) successCallback(self, response.body);
      }
    );
  }

  getApplicantsJobs(id: number, self?: any, successCallback?: Function) {
    this.api.getApplicantsJobs(id).subscribe(
      // Success
      (response) => {
        this.applicantsJobs = (response.body == null)? [] : response.body;
        console.log('Applicants Jobs: ')
        console.log(this.applicantsJobs)
        // Callback
        if(response.body)
          if(self && successCallback) successCallback(self, response.body);
      }
    );
  }

  createApplicant(applicantData: NewApplicant) {
    this.api.createApplicant(applicantData).subscribe(
      // Success
      (response) => {
        console.log('New Applicant Added, status: ' + response.status);
      }
    );
  }

  deleteApplicant(id: number, self?: any, successCallback?: Function) {
    this.api.deleteApplicant(id).subscribe(
      // Success
      (response) => {
        console.log('Deleted Employer, status: ' + response.status);
        if(self && successCallback) successCallback(self);
      }
    );
  }

  approveApplicant(id: number, self?: any, successCallback?: Function) {
    this.api.approveApplicant(id).subscribe(
      // Success
      (response) => {
        console.log('Deleted Employer, status: ' + response.status);
        if(self && successCallback) successCallback(self);
      }
    );
  }

}
