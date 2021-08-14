import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employer, Field, Filters, Job, Tag } from '../../_api/_data-types/interfaces';
import { JobApiService } from '../../_api/_services/job-api.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  public jobs: Job[] = [];

  constructor(private jobApi: JobApiService) { }

  getFilteredJobs(filters: Filters) 
  {
    this.jobApi.getJobs(filters).subscribe(
      // Success
      (response) => {
        console.log('Success, Body: ')
        console.log(response.body)
        this.jobs = (response.body == null)? [] : response.body;
        console.log('Jobs: ')
        console.log(this.jobs)
      },
      // Error
      (error) => {

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
}
