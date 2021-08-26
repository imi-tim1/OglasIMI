import { Component, OnInit } from '@angular/core';
import { Applicant } from 'src/app/_utilities/_api/_data-types/interfaces';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';

@Component({
  selector: 'app-dashboard-applicant',
  templateUrl: './dashboard-applicant.component.html',
})
export class DashboardApplicantComponent implements OnInit {

  public applicant: Applicant | null = null;

  constructor(public appService: ApplicantService) { }

  ngOnInit(): void {
    this.appService.getApplicant(JWTUtil.getID(), this, this.cbSuccess);
  }

  // API Callbacks

  cbSuccess(self: any, applicant?: Applicant | null) {
    if(applicant) self.applicant = applicant;
  }

}
