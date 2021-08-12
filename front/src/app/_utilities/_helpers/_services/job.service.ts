import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employer, Field, Job, Tag } from '../../_api/_data-types/classes';
import { JobApiService } from '../../_api/_services/job-api.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  public jobs: Job[] | null = null;

  constructor(private jobApi: JobApiService) { }

  getJobs() {
    this.jobs = [
      new Job(1, new Employer(1, 'Comtrade'), 'C++ Programer', 'Opis posla, bas dobar', 
              new Field(), [new Tag(), new Tag()], '$ 1600 /mo.', 'Kragujevc', false),
      new Job(3, new Employer(1, 'Microsoft'), 'Java Programer', 'Opis posla, dobar', 
              new Field(), [new Tag(), new Tag()], '$ 1800 /mo.', 'Beograd', true)
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
