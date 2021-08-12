import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/_utilities/_helpers/_services/job.service';
// import { GetJobsHttpService } from 'src/app/_utilities/_api/_services/getjobs-http.service'

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
})
export class JobsListComponent implements OnInit {

  constructor(public jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getJobs();
  }

  // addJob(jobs: Jobs) {
    // this.jobService.addJob();
  // }

}
