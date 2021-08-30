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
    public authService: AuthService,
    public appService: ApplicantService
  ) { }

  ngOnInit(): void {
    // Check Access
    this.authService.checkAccess(this.activatedRoute, this, 
      (self: any) =>
      {
        self.pageLoaded = true;

        // GET Applicants
        self.appService.getApplicants(undefined, self, self.cbSuccessGetApplicants);
      }
    );
  }

  // --- API Callbacks ---

  cbSuccessGetApplicants(self: any, applicants?: Applicant[]) {
    if(applicants) self.applicants = applicants;
  }

}
