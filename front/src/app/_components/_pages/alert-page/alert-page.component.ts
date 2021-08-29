import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { AuthService } from 'src/app/_utilities/_middleware/_services/auth.service';
import { AlertPageUtil } from 'src/app/_utilities/_helpers/alert-util';
import { RedirectRoutes } from 'src/app/_utilities/_constants/routing.properties';
import { Job } from 'src/app/_utilities/_api/_data-types/interfaces';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert-page.component.html',
})
export class AlertPageComponent implements OnInit {

  public cause: string | null = null;
  public param: string | null = null;

  public jwtExpired: boolean = true;
  public appliedToJob: boolean = false; // 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private applicantService: ApplicantService
  ) { }

  ngOnInit(): void {

    if (!AlertPageUtil.checkAccess())
      this.router.navigate(RedirectRoutes.HOME);

    AlertPageUtil.denyAccess();

    this.cause = this.activatedRoute.snapshot.paramMap.get('cause');
    let p = this.activatedRoute.snapshot.paramMap.get('param');
    this.param = JSON.parse((p)? p : '{}');

    // -- Logic --

    if (JWTUtil.getUserRole() == UserRole.Applicant) {
      this.applicantService.getApplicantsJobs(JWTUtil.getID(), this,
        (self: any, jobs: Job[]) => {
          self.appliedToJob = jobs.find(j => j.id == self.param.jobID) != undefined;
        }
      );
    }

  }

  // --- Cause ---

  checkCause(c: string): boolean {
    if (this.cause == null) return false;

    return c == this.cause;
  }

  checkSessionExpired() {
    return this.checkCause('session-expired') && JWTUtil.get() == '';
  }

  checkApplyToJobSuccessful() {
    return this.checkCause('apply-to-job-successful') && this.appliedToJob;
  }

  // API Calls

}
