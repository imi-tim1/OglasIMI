import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { AuthService } from 'src/app/_utilities/_middleware/_services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isVisitor() {
    return JWTUtil.getUserRole() == UserRole.Visitor;
  }

  isApplicant() {
    return JWTUtil.getUserRole() == UserRole.Applicant;
  }

  isEmployer() {
    return JWTUtil.getUserRole() == UserRole.Employer;
  }

  isAdmin() {
    return JWTUtil.getUserRole() == UserRole.Admin;
  }

}
