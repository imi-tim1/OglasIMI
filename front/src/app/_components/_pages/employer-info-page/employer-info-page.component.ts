import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { ComponentAccessService } from 'src/app/_utilities/_middleware/_services/component-access.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';

@Component({
  selector: 'app-employer-info-page',
  templateUrl: './employer-info-page.component.html',
})
export class EmployerInfoPageComponent implements OnInit {

  public empID: number = 0;

  constructor(
    public activatedRoute: ActivatedRoute,
    public accessService: ComponentAccessService,
    public empService: EmployerService
  ) { }

  ngOnInit(): void {
    // Check access
    this.accessService.checkAccess(this.activatedRoute.snapshot.data.allowedRoles);

    let p = this.activatedRoute.snapshot.paramMap.get("id");
    if (p != null) this.empID = p as unknown as number;

    this.empService.getEmployer(this.empID);
  }

  isMe(): boolean {
    return JWTUtil.getID() == this.empID;
  }

}
