import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Applicant } from 'src/app/_utilities/_api/_data-types/interfaces';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { ComponentAccessService } from 'src/app/_utilities/_middleware/_services/component-access.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';

@Component({
  selector: 'app-applicant-info-page',
  templateUrl: './applicant-info-page.component.html',
})
export class ApplicantInfoPageComponent implements OnInit {

  public appID: number = 0;
  public applicant: Applicant | null = null;

  constructor(
    public activatedRoute: ActivatedRoute,
    public accessService: ComponentAccessService,
    public appService: ApplicantService
  ) { }

  ngOnInit(): void {
    // Check access
    this.accessService.checkAccess(this.activatedRoute.snapshot.data.allowedRoles);

    let p = this.activatedRoute.snapshot.paramMap.get("id");
    if (p != null) this.appID = p as unknown as number;

    this.appService.getApplicant(this.appID, this, this.cbSuccess);
  }

  isMe(): boolean {
    return JWTUtil.getID() == this.appID;
  }

  // API Callbacks

  cbSuccess(self: any, applicant: Applicant | null) {
    self.applicant = applicant;
    self.appID = (applicant)? applicant.id : 0;
  }

}
