import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { AuthService } from 'src/app/_utilities/_middleware/_services/auth.service';
import { AlertPageUtil } from 'src/app/_utilities/_helpers/alert-util';
import { RedirectRoutes } from 'src/app/_utilities/_constants/routing.properties';
import { Job } from 'src/app/_utilities/_api/_data-types/interfaces';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert-page.component.html',
})
export class AlertPageComponent implements OnInit {

  public cause: string | null = null;
  public param: any = null;

  public jwtExpired: boolean = true;
  
  // za: apply-to-job-successful
  public appliedToJob: boolean = false;
  
  // za: create-job-successful
  public createdJob: boolean = false;
  // public createdJobID: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private applicantService: ApplicantService,
    private employerService: EmployerService
  ) { }

  ngOnInit(): void {

    if (!AlertPageUtil.checkAccess())
      this.router.navigate(RedirectRoutes.HOME);

    AlertPageUtil.denyAccess();

    this.cause = this.activatedRoute.snapshot.paramMap.get('cause');
    let p = this.activatedRoute.snapshot.paramMap.get('param');
    this.param = JSON.parse((p)? p : '{}');

    console.log('>>>>> ALERT LOG <<<<<');
    console.log(this.cause);
    console.log(this.param);

    // -- Logic --

    if (JWTUtil.getUserRole() == UserRole.Applicant) {
      this.applicantService.getApplicantsJobs(JWTUtil.getID(), this,
        (self: any, jobs: Job[]) => {
          self.appliedToJob = jobs.find(j => j.id == self.param.jobID) != undefined;
        }
      );
    }

    if (JWTUtil.getUserRole() == UserRole.Employer) {
      this.createdJob = true;
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

  checkRegisterSuccessful() {
    return this.checkCause('register-successful') && JWTUtil.get() == '';
  }

  checkCreateJobSuccessful() {
    return this.checkCause('create-job-successful') && this.createdJob;
  }

  // API Calls

}