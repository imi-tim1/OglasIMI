import { Component, Input, OnInit } from '@angular/core';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';

@Component({
  selector: 'app-job-info-card',
  templateUrl: './job-info-card.component.html',
})
export class JobInfoCardComponent implements OnInit {

  @Input() id: number = 0;

  constructor(public jobService: JobService,
              public employerService: EmployerService) { }

  ngOnInit(): void {
    console.log("id: " + this.id);

    this.jobService.getJob(this.id);

    console.log("drugi put id: " + this.id);
    //console.log("NESTO PRE EMPLOYER ID-A"); 
    //console.log("EMPLOYER ID: " + this.jobService.job.employer.id);
    //this.employerService.getEmployer(this.jobService.job.employer.id);
  }

  stampaj() {
    console.log(" STAMPAJ  id: " + this.id);
  }

  isApplicant() {
    return JWTUtil.getRole() as UserRole == UserRole.Applicant;
  }

  applyMe() {
    console.log(this.employerService.employer?.email);
    this.jobService.applyToJob(this.id);
  }

}
