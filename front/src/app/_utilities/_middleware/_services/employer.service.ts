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

  getEmployers() {
    this.api.getEmployers().subscribe(
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

  getEmployersJobs(id: number) {
    this.api.getEmployersJobs(id).subscribe(
      // Success
      (response) => {
        this.employersJobs = (response.body == null)? [] : response.body;
        console.log('Employers Jobs: ')
        console.log(this.employersJobs)
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
}
