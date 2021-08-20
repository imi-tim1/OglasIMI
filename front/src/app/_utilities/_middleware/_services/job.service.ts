import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Applicant, Employer, Field, Filters, Job, NewJob, Tag } from '../../_api/_data-types/interfaces';
import { JobApiService } from '../../_api/_services/job-api.service';
import { JWTUtil } from '../../_helpers/jwt-util';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  // Get (Filtered) Jobs
  public jobs: Job[] = [];
  public totalJobNumber: number = 0;

  // Get Job
  public job!: Job;

  // Get Jobs Applicants
  public jobsApplicants: Applicant[] = [];

  constructor(private api: JobApiService) { }


  // --- Methods ---

  getFilteredJobs(filters: Filters, self?: any, successCallback?: Function) 
  {
    this.api.getJobs(filters).subscribe(
      // Success
      (response) => {
        if (response.body != null && response.body.jobs != null) {
          this.jobs = response.body.jobs;
          this.totalJobNumber = response.body.totalJobNumber;

          console.log('getFilteredJobs, NIJE NULL')

          // Callback
          if(self && successCallback) { 
            console.log('>>>>>> uso');
            successCallback(self, response.body.jobs, response.body.totalJobNumber);
          }

          console.log('Jobs: ')
          console.log(response.body.jobs)
          console.log('broj: ' + response.body.totalJobNumber)
        }
        else {
          console.log('Body is empty')
        }
      }
    );
  }

  getJobs(self?: any, successCallback?: Function) 
  {
    let filters: Filters = {
      title: '',
      cityId: 0,
      employerId: 0,
      fieldId: 0,
      workFromHome: false,
      pageNumber: 1,
      jobsPerPage: 5,
      ascendingOrder: false
    };

    this.getFilteredJobs(filters, self, successCallback);
  }

  getJob(id: number) 
  {
    this.api.getJob(id).subscribe(
      // Success
      (response) => {
        this.job = response.body!;
        console.log('Job: ');
        console.log(this.job);
      }
    );
  }

  getJobsApplicants(id: number, self?: any, successCallback?: Function) 
  {
    this.api.getJobsApplicants(id).subscribe(
      // Success
      (response) => {
        // 200 OK - Job postoji i lista sa aplikantima (koja moze biti prazna)
        this.jobsApplicants = (response.body == null) ? [] : response.body;
        console.log('Jobs Applicants:');
        console.log(this.jobsApplicants);
        if(response.body)
          if(self && successCallback) successCallback(self, response.body);
      },
      // Error
      (error: HttpErrorResponse) => {
        console.log('Error: ' + error.status);
        switch (error.status) {
          // 401 Unautorized - Neulogovan / Neispravan token
          case HttpStatusCode.Unauthorized:
            JWTUtil.delete();
            break;
          // 403 Forbidden - Nema dozvolu
          case HttpStatusCode.Forbidden:

            break;
          // 404 Not Found - Ne postoji Job sa datim ID-jem
          case HttpStatusCode.NotFound:

            break;
        }
      }
    );
  }

  createJob(jobData: NewJob, self?: any, successCallback?: Function) 
  {
    this.api.createJob(jobData).subscribe(
      // Success
      (response) => {
        console.log(response.status);
        if(self && successCallback) successCallback(self);
      }
    );
  }

  applyToJob(id: number) 
  {
    this.api.applyToJob(id).subscribe(
      // Success
      (response) => {
        console.log('----- Apply Successful!');
        switch (response.status) {
          // 204 No Content
          case HttpStatusCode.NoContent:
            // Sta !!??
            break;
          default:
            break;
        }

      },
      (error: HttpErrorResponse) => {
        console.log('ERORORORO')
        console.log(error)
      }
    );
  }

  deleteJob(id: number, self?: any, successCallback?: Function) 
  {
    this.api.deleteJob(id).subscribe(
      // Success
      (response) => {
        console.log('----- Delete Successful!');
        if(self && successCallback) successCallback(self);
      },
      (error: HttpErrorResponse) => {
        console.log('ERORORORO')
        console.log(error)
      }
    );
  }
}
