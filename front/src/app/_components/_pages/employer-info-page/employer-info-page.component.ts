import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employer } from 'src/app/_utilities/_api/_data-types/interfaces';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { AuthService } from 'src/app/_utilities/_middleware/_services/auth.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';

@Component({
  selector: 'app-employer-info-page',
  templateUrl: './employer-info-page.component.html',
})
export class EmployerInfoPageComponent implements OnInit {

  public empID: number = 0;
  public employer: Employer | null = null;

  constructor(
    public activatedRoute: ActivatedRoute,
    public accessService: AuthService,
    public empService: EmployerService
  ) { }

  ngOnInit(): void {
    // Check access
    this.accessService.checkAccess(this.activatedRoute);

    let p = this.activatedRoute.snapshot.paramMap.get("id");
    if (p != null) this.empID = p as unknown as number;

    this.empService.getEmployer(this.empID, this, this.cbSuccess);
  }

  isMe(): boolean {
    return JWTUtil.getID() == this.empID;
  }

  // API Callbacks

  cbSuccess(self: any, employer: Employer | null) {
    self.employer = employer;
    self.empID = (employer)? employer.id : 0;
  }

}
