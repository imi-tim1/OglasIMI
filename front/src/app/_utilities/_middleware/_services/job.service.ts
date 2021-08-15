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
  public job: Job | null = null;

  // Get Jobs Applicants
  public jobsApplicants: Applicant[] = [];

  constructor(private api: JobApiService) { }


  // --- Methods ---

  getFilteredJobs(filters: Filters) 
  {
    this.api.getJobs(filters).subscribe(
      // Success
      (response) => {
        if (response.body != null && response.body.jobs != null) {
          this.jobs = response.body.jobs;
          this.totalJobNumber = response.body.totalJobNumber;
        }

        console.log('Jobs: ')
        console.log(this.jobs)
        console.log(this.totalJobNumber)
      }
    );
  }

  getJobs() 
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

    this.getFilteredJobs(filters);
  }

  getJob(id: number) 
  {
    this.api.getJob(id).subscribe(
      // Success
      (response) => {
        this.job = response.body;
        console.log('Job: ');
        console.log(this.job);
      }
    );
  }

  getJobsApplicants(id: number) 
  {
    this.api.getJobsApplicants(id).subscribe(
      // Success
      (response) => {
        // 200 OK - Job postoji i lista sa aplikantima (koja moze biti prazna)
        this.jobsApplicants = (response.body == null) ? [] : response.body;
        console.log('Jobs Applicants:');
        console.log(this.jobsApplicants);
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

  createJob(jobData: NewJob) 
  {
    this.api.createJob(jobData).subscribe(
      // Success
      (response) => {
        console.log(response.status);
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

  deleteJob(id: number) 
  {
    this.api.deleteJob(id).subscribe(
      // Success
      (response) => {
        console.log('----- Delete Successful!');
      },
      (error: HttpErrorResponse) => {
        console.log('ERORORORO')
        console.log(error)
      }
    );
  }
}
