import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { ComponentAccessService } from 'src/app/_utilities/_middleware/_services/component-access.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isVisitor() {
    return JWTUtil.getRole() as UserRole == UserRole.Visitor;
  }

  isApplicant() {
    return JWTUtil.getRole() as UserRole == UserRole.Applicant;
  }

  isEmployer() {
    return JWTUtil.getRole() as UserRole == UserRole.Employer;
  }

  isAdmin() {
    return JWTUtil.getRole() as UserRole == UserRole.Admin;
  }

}
