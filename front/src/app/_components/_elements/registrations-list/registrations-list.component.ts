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

  public activeIndex: number = -1;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public empService: EmployerService,
    public appService: ApplicantService
  ) { }

  ngOnInit(): void {
    this.fetchRegs();
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

  fetchRegs() {
    console.log('>>> Fetching registrations ...');
    this.empService.getEmployers(true);
    this.appService.getApplicants(true);
  }

  // Prihvatanje / Odbacivanje

  onApprove() {
    if(this.activeEmp) {
      this.empService.approveEmployer(this.activeEmp.id, this, this.cbSuccess);
      console.log('Approve registration for user with id ' + this.activeEmp.id);
    }
    else if(this.activeApp) {
      this.appService.approveApplicant(this.activeApp.id, this, this.cbSuccess)
      console.log('Approve registration for user with id ' + this.activeApp.id);
    }

    this.hideRegInfo();
  }

  onReject() {
    if(this.activeEmp) {
      this.empService.deleteEmployer(this.activeEmp.id, this, this.cbSuccess);
      console.log('Reject registration for user with id ' + this.activeEmp.id);
    }
    else if(this.activeApp) {
      this.appService.deleteApplicant(this.activeApp.id, this, this.cbSuccess);
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

  cbSuccess(self: any) {
    console.log('>>> Fetching registrations (Callback) ...');
    self.empService.getEmployers(true);
    self.appService.getApplicants(true);
  }

}
