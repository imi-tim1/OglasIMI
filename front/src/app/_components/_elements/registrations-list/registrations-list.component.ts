import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Applicant, Employer } from 'src/app/_utilities/_api/_data-types/interfaces';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';

@Component({
  selector: 'app-registrations-list',
  templateUrl:   './registrations-list.component.html',
})
export class RegistrationsListComponent implements OnInit {

  public empListAcitive: boolean = false;

  public activeEmp: Employer | undefined = undefined;
  public activeApp: Applicant | undefined = undefined;

  public employers: Employer[] = [];
  public applicants: Applicant[] = [];

  // public activeIndex: number = -1;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public empService: EmployerService,
    public appService: ApplicantService
  ) { }

  ngOnInit(): void {
    this.empService.getEmployers(true, this, this.cbSuccessGetEmployers);
    this.appService.getApplicants(true, this, this.cbSuccessGetApplicants);
  }

  showRegInfo(id: number) {
    this.activeEmp = this.employers.find(x => x.id == id);
    if (!this.activeEmp)
      this.activeApp = this.applicants.find(x => x.id == id);
  }

  hideRegInfo() {
    this.activeEmp = undefined;
    this.activeApp = undefined;
  }

  // Prihvatanje / Odbacivanje

  onApprove() {
    if(this.activeEmp) {
      this.empService.approveEmployer(this.activeEmp.id, this, this.cbSuccessPutDeleteEmployer);
      console.log('Approve registration for user with id ' + this.activeEmp.id);
    }
    else if(this.activeApp) {
      this.appService.approveApplicant(this.activeApp.id, this, this.cbSuccessPutDeleteApplicant)
      console.log('Approve registration for user with id ' + this.activeApp.id);
    }

    this.hideRegInfo();
  }

  onReject() {
    if(this.activeEmp) {
      this.empService.deleteEmployer(this.activeEmp.id, this, this.cbSuccessPutDeleteEmployer);
      console.log('Reject registration for user with id ' + this.activeEmp.id);
    }
    else if(this.activeApp) {
      this.appService.deleteApplicant(this.activeApp.id, this, this.cbSuccessPutDeleteApplicant);
      console.log('Reject registration for user with id ' + this.activeApp.id);
    }

    this.hideRegInfo();
  }

  // Biranje tipa liste

  onAppListSelect() {
    this.empListAcitive = false;
    this.hideRegInfo();
  }

  onEmpListSelect() {
    this.empListAcitive = true;
    this.hideRegInfo();
  }

  // API Callbacks

  cbSuccessGetApplicants(self: any, applicants?: Applicant[]) {
    if(applicants) self.applicants = applicants;
  }

  cbSuccessGetEmployers(self: any, employers?: Employer[]) {
    if(employers) self.employers = employers;
  }

  cbSuccessPutDeleteApplicant(self: any) {
    self.appService.getApplicants(true, self, self.cbSuccessGetApplicants);
  }

  cbSuccessPutDeleteEmployer(self: any) {
    self.empService.getEmployers(true, self, self.cbSuccessGetEmployers);
  }

}
