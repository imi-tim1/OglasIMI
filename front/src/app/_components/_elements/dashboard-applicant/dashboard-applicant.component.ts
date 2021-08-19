import { Component, OnInit } from '@angular/core';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';

@Component({
  selector: 'app-dashboard-applicant',
  templateUrl: './dashboard-applicant.component.html',
})
export class DashboardApplicantComponent implements OnInit {

  

  constructor(public appService: ApplicantService) { }

  ngOnInit(): void {
    this.appService.getApplicant(JWTUtil.getID());
  }

}
