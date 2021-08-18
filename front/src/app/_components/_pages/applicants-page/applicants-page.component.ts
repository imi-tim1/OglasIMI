import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { ComponentAccessService } from 'src/app/_utilities/_middleware/_services/component-access.service';

@Component({
  selector: 'app-applicants-page',
  templateUrl: './applicants-page.component.html',
})
export class ApplicantsPageComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public accessService: ComponentAccessService,
    public appService: ApplicantService
  ) { }

  ngOnInit(): void {
    this.accessService.checkAccess(this.activatedRoute.snapshot.data.allowedRoles);
    this.appService.getApplicants();
  }

}
