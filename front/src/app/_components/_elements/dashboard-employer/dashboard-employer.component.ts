import { Component, OnInit } from '@angular/core';
import { Employer } from 'src/app/_utilities/_api/_data-types/interfaces';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';

@Component({
  selector: 'app-dashboard-employer',
  templateUrl: './dashboard-employer.component.html',
})
export class DashboardEmployerComponent implements OnInit {

  public employer: Employer | null = null;

  constructor(public empService: EmployerService) { }

  ngOnInit(): void {
    this.empService.getEmployer(JWTUtil.getID(), this, (self: any, data: Employer | null) => {
      self.employer = data;
    });
  }

}
