import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employer, Field, Job, Tag } from '../../_api/_data-types/interfaces';
import { JobApiService } from '../../_api/_services/job-api.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  public jobs: Job[] | null = null;

  constructor(private jobApi: JobApiService) { }

  getJobs() {
    this.jobs = [
      
    ]

    // this.jobApi.getJobs().subscribe(
    //   (response: HttpResponse<Job[]>) => {
    //     this.jobs = response.body;
    //   },
    //   (error) => {

    //   }
    // );
  }
}
