import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Applicant } from 'src/app/_utilities/_api/_data-types/interfaces';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { AuthService } from 'src/app/_utilities/_middleware/_services/auth.service';

@Component({
  selector: 'app-applicants-page',
  templateUrl: './applicants-page.component.html',
})
export class ApplicantsPageComponent implements OnInit {

  // Page Auth
  public pageLoaded: boolean = false;

  public applicants: Applicant[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public accessService: AuthService,
    public appService: ApplicantService
  ) { }

  // --- INIT - Auth Success Callback ---
  cbInit(self: any) 
  {
    self.pageLoaded = true;

    // GET Applicants
    self.appService.getApplicants(undefined, self, self.cbSuccessGetApplicants);
  }

  ngOnInit(): void {
    // Check Access
    this.accessService.checkAccess(this.activatedRoute.snapshot.data.allowedRoles, this, this.cbInit);
  }

  // --- API Callbacks ---

  cbSuccessGetApplicants(self: any, applicants?: Applicant[]) {
    if(applicants) self.applicants = applicants;
  }

}
