import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Applicant } from 'src/app/_utilities/_api/_data-types/interfaces';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { ComponentAccessService } from 'src/app/_utilities/_middleware/_services/component-access.service';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';


@Component({
  selector: 'app-job-info-page',
  templateUrl: './job-info-page.component.html',
})
export class JobInfoPageComponent implements OnInit {

  public jobID: number = 0;
  public applicants: Applicant[] | null = null;

  constructor(
    public activatedRoute: ActivatedRoute,
    public accessService: ComponentAccessService,
    public jobService: JobService
  ) { }

  ngOnInit(): void {
    // Check access
    this.accessService.checkAccess(this.activatedRoute.snapshot.data.allowedRoles);

    let p = this.activatedRoute.snapshot.paramMap.get("id");
    if (p != null) this.jobID = p as unknown as number;

    this.jobService.getJobsApplicants(this.jobID, this, this.cbSuccess);
  }

  // API Callbacks

  cbSuccess(self: any, applicants?: Applicant[]) {
    self.applicants = applicants;
  }

}
