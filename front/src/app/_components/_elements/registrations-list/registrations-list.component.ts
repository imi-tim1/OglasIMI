import { Component, OnInit } from '@angular/core';
import { Employer } from 'src/app/_utilities/_api/_data-types/interfaces';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';

@Component({
  selector: 'app-registrations-list',
  templateUrl:   './registrations-list.component.html',
})
export class RegistrationsListComponent implements OnInit {

  public activeEmp: Employer | undefined = undefined;

  constructor(
    public empService: EmployerService
    // ,public appService: ApplicantService
  ) { }

  ngOnInit(): void {
    this.empService.getEmployers(true);
  }

  showRegInfo(id: number) {
    this.activeEmp = this.empService.employers.find(j => j.id == id);
    if (this.activeEmp == undefined) {
      // menjaj activeApp
    }
  }

  hideRegInfo() {
    this.activeEmp = undefined;
    // this.activeApp = undefined;
  }

}
