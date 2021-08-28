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

  // Page Auth
  public pageLoaded: boolean = false;

  public appID: number = 0;
  public applicant: Applicant | null = null;

  constructor(
    public activatedRoute: ActivatedRoute,
    public accessService: ComponentAccessService,
    public appService: ApplicantService
  ) { }

  // --- INIT - Auth Success Callback ---
  cbInit(self: any)
  {
    self.pageLoaded = true;
    
    // Extract and Save appID from route url
    let p = self.activatedRoute.snapshot.paramMap.get("id");
    if (p != null) self.appID = p as unknown as number;
    
    // GET Applicant with appID
    self.appService.getApplicant(self.appID, self, self.cbSuccess);
  }

  ngOnInit(): void {
    // Check access
    this.accessService.checkAccess(this.activatedRoute.snapshot.data.allowedRoles, this, this.cbInit);
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
