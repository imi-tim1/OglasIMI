import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employer, Field, Filters, Job, Tag } from '../../_api/_data-types/interfaces';
import { JobApiService } from '../../_api/_services/job-api.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  public jobs: Job[] = [];
  public totalJobNumber: number = 0;
  public job: Job | null = null;

  constructor(private jobApi: JobApiService) { }

  getFilteredJobs(filters: Filters) 
  {
    this.jobApi.getJobs(filters).subscribe(
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

  getJobs() {
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

  getJob(id: number) {
    this.jobApi.getJob(id).subscribe(
      // Success
      (response) => {
        this.job = response.body;
        console.log('Job: ');
        console.log(this.job);
      }
    );
  }
}
