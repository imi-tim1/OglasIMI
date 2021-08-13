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

  getJobs() {
    this.jobs = [
      { 
        id: 1,
        employer: { id: 1, name: 'Comtrade' },
        title: 'C++ Developer',
        description: 'Desc ....',
        field: { id: 1, name: 'IT' },
        tags: [ { id: 1, name: 'java' }, { id: 2, name: 'c++'}, { id: 3, name: 'c' }  ],
        salary: '$ 1800 /mo',
        city: 'Kragujevac',
        workFromHome: false
       },
       { 
        id: 2,
        employer: { id: 2, name: 'Microsoft' },
        title: 'Unity Developer',
        description: 'Desc ....',
        field: { id: 1, name: 'IT' },
        tags: [ { id: 1, name: 'unity' }, { id: 2, name: 'c#'}, { id: 3, name: 'gamedev' }  ],
        salary: '$ 2100 /mo',
        city: 'Beograd',
        workFromHome: true
       }
    ]

    let filters: Filters = {
      title: '',
      cityId: 0,
      employerId: 0,
      fieldId: 0,
      workFromHome: false,
      pageNumber: 1,
      jobsPerPage: 10,
      ascendingOrder: false
    };

    this.jobApi.getJobs(filters).subscribe(
      // Success
      (response) => {
        console.log('Success, Body: ')
        console.log(response.body)
        this.jobs = (response.body == null)? [] : response.body;
      },
      // Error
      (error) => {

      }
    );
  }
}
