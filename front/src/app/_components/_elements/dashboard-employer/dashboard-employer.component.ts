import { Component, OnInit } from '@angular/core';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';

@Component({
  selector: 'app-dashboard-employer',
  templateUrl: './dashboard-employer.component.html',
})
export class DashboardEmployerComponent implements OnInit {

  constructor(public empService: EmployerService) { }

  ngOnInit(): void {
    this.empService.getEmployer(JWTUtil.getID());
  }

}
