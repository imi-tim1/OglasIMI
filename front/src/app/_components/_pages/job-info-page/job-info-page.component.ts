import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Applicant } from 'src/app/_utilities/_api/_data-types/interfaces';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { AuthService } from 'src/app/_utilities/_middleware/_services/auth.service';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';


@Component({
  selector: 'app-job-info-page',
  templateUrl: './job-info-page.component.html',
})
export class JobInfoPageComponent implements OnInit {

  // Page Auth
  public pageLoaded: boolean = false;

  // States
  public jobID: number = 0;
  public applicants: Applicant[] | null = null;

  constructor(
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public jobService: JobService
  ) { }

  ngOnInit(): void {
    // Check access
    this.authService.checkAccess(this.activatedRoute, this,
      (self: any) => 
      {
        self.pageLoaded = true;

        // Extract and Save appID from route url
        let p = self.activatedRoute.snapshot.paramMap.get("id");
        if (p != null) self.jobID = p as unknown as number;

        // GET Jobs Applicants
        self.jobService.getJobsApplicants(self.jobID, self, self.cbSuccess);
      }
    );
  }

  // API Callbacks

  cbSuccess(self: any, applicants?: Applicant[]) {
    self.applicants = applicants;
  }

}
