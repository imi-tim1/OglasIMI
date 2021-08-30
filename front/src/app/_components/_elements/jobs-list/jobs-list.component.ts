import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { Job } from 'src/app/_utilities/_api/_data-types/interfaces';
import { EmployerApiService } from 'src/app/_utilities/_api/_services/employer-api.service';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';
// import { GetJobsHttpService } from 'src/app/_utilities/_api/_services/getjobs-http.service'

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
})
export class JobsListComponent implements OnInit {
  
  @Input() public jobs: Job[] = [];
  public jobsNum: number = 0;

  @Input() public uid: number = 0;
  @Input() public empJobs: boolean = false;
  @Input() public appJobs: boolean = false;

  @Input() showAnything: boolean = true;

  constructor(
    public jobService: JobService,
    public appService: ApplicantService,
    public empService: EmployerService
  ) { }

  ngOnInit(): void {
    console.log(`emp: ${this.empJobs}, app: ${this.appJobs}`);

    if (this.empJobs)
      this.empService.getEmployersJobs((this.uid == 0)? JWTUtil.getID() : this.uid, this, this.cbSuccess);
    else if (this.appJobs)
      this.appService.getApplicantsJobs((this.uid == 0)? JWTUtil.getID() : this.uid, this, this.cbSuccess);
    else
      this.jobService.getJobs(this, this.cbSuccess);
  }

  // API Callbacks

  cbSuccess(self: any, jobs?: Job[], jobsNum?: number) {
    if(jobs) self.jobs = jobs;
    if(jobsNum) self.jobsNum = jobsNum;
  }
  
}
