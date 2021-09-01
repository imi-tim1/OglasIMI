import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { Applicant } from 'src/app/_utilities/_api/_data-types/interfaces';
import { RedirectRoutes } from 'src/app/_utilities/_constants/routing.properties';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { AuthService } from 'src/app/_utilities/_middleware/_services/auth.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';

@Component({
  selector: 'app-applicant-info-page',
  templateUrl: './applicant-info-page.component.html',
})
export class ApplicantInfoPageComponent implements OnInit {

  // Page Auth
  public pageLoaded: boolean = false;

  // States
  public appID: number = 0;
  public applicant: Applicant | null = null;

  constructor(
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public appService: ApplicantService,
    public router: Router
  ) { }

  ngOnInit(): void {
    // Check access
    this.authService.checkAccess(this.activatedRoute, this, 
      (self: any) =>
      {
        self.pageLoaded = true;
        
        // Extract and Save appID from route url
        let p = self.activatedRoute.snapshot.paramMap.get("id");
        if (p != null) self.appID = p as unknown as number;
        
        // GET Applicant with appID
        self.appService.getApplicant(self.appID, self, self.cbSuccess, self.cbNotFound);
      }
    );
  }

  isMe(): boolean {
    return JWTUtil.getID() == this.appID;
  }

  isAdmin(): boolean {
    return JWTUtil.getUserRole() == UserRole.Admin;
  }

  // API Callbacks

  cbSuccess(self: any, applicant: Applicant | null) {
    self.applicant = applicant;
    self.appID = (applicant)? applicant.id : 0;
  }

  cbNotFound(self: any) {
    self.router.navigate(RedirectRoutes.HOME);
  }

}
