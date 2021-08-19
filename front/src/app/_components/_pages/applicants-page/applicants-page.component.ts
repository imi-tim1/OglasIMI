import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Applicant } from 'src/app/_utilities/_api/_data-types/interfaces';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { ComponentAccessService } from 'src/app/_utilities/_middleware/_services/component-access.service';

@Component({
  selector: 'app-applicants-page',
  templateUrl: './applicants-page.component.html',
})
export class ApplicantsPageComponent implements OnInit {

  public applicants: Applicant[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public accessService: ComponentAccessService,
    public appService: ApplicantService
  ) { }

  ngOnInit(): void {
    this.accessService.checkAccess(this.activatedRoute.snapshot.data.allowedRoles);
    this.appService.getApplicants(undefined, this, this.cbSuccess);
  }

  // API Callbacks

  cbSuccess(self: any, applicants?: Applicant[]) {
    if(applicants) self.applicants = applicants;
  }

}
