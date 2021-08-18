import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Applicant, Employer } from 'src/app/_utilities/_api/_data-types/interfaces';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';

@Component({
  selector: 'app-registrations-list',
  templateUrl:   './registrations-list.component.html',
})
export class RegistrationsListComponent implements OnInit {

  public activeEmp: Employer | undefined = undefined;
  public activeApp: Applicant | undefined = undefined;

  constructor(
    public empService: EmployerService,
    public appService: ApplicantService
  ) { }

  ngOnInit(): void {
    this.empService.getEmployers(true);
    this.appService.getApplicants(true);
  }

  showRegInfo(id: number) {
    this.activeEmp = this.empService.employers.find(x => x.id == id);
    if (!this.activeEmp)
      this.activeApp = this.appService.applicants.find(x => x.id == id);
  }

  hideRegInfo() {
    this.activeEmp = undefined;
    this.activeApp = undefined;
  }

  // Prihvatanje / Odbacivanje

  onApprove() {
    if(this.activeEmp) {
      console.log('Approve registration for user with id ' + this.activeEmp.id);
    }
  }

  onReject() {
    if(this.activeEmp) {
      console.log('Reject registration for user with id ' + this.activeEmp.id);
    }
  }

}
