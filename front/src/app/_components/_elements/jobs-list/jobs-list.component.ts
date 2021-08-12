import { Component, OnInit } from '@angular/core';
import { GetJobsHttpService } from 'src/app/_utilities/_api/_services/getjobs-http.service'

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
})
export class JobsListComponent implements OnInit {

  //prima listu Job-ova
  jobs: Jobs[] = [];


  constructor(private http: GetJobsHttpService) { }

  ngOnInit(): void {
    this.getJobsHttpService.getJobs().subscribe((jobs) =>
    (this.jobs = jobs));
  }

  addJob(jobs: Jobs) {
    this.getJobsHttpService.addJob(job).subscribe((job) =>
    (this.jobs.push(job)));
  }

}
