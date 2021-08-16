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
  getApplicants() {
    this.api.getApplicants().subscribe(
      // Success
      (response) => {
        console.log('Get Applicants (Success), Body: ')
        console.log(response.body)
        this.applicants = this.applicants.concat((response.body == null)? [] : response.body);
        console.log('Applicants: ')
        console.log(this.applicants)
      }
    );
  }


  // Potrebno TESTIRANJE !!!
  getApplicant(id: number) {
    this.api.getApplicant(id).subscribe(
      // Success
      (response) => {
        this.applicant = response.body;
        console.log('Applicant: ')
        console.log(this.applicant)
      }
    );
  }

  // Potrebno TESTIRANJE !!!
  getApplicantsJobs(id: number) {
    this.api.getApplicantsJobs(id).subscribe(
      // Success
      (response) => {
        this.applicantsJobs = (response.body == null)? [] : response.body;
        console.log('Applicants Jobs: ')
        console.log(this.applicant)
      }
    );
  }

  // Potrebno TESTIRANJE !!!
  createApplicant(applicantData: NewApplicant) {
    this.api.createApplicant(applicantData).subscribe(
      // Success
      (response) => {
        console.log('New Applicant Added, status: ' + response.status);
      }
    );
  }

}
