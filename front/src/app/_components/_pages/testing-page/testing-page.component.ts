import { Component, OnInit } from '@angular/core';
import { PasswdHash } from 'src/app/_utilities/_helpers/hash-util';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';

@Component({
  selector: 'app-testing-page',
  templateUrl: './testing-page.component.html',
})
export class TestingPageComponent implements OnInit {

  constructor(
    public employerService: EmployerService,
    public aplicantService: ApplicantService,
    public jobService: JobService
  ) { }

  ngOnInit(): void {
    // this.testEmployerService();
    // this.testApplicantService();
    this.testJobService();
  }

  testEmployerService() {
    // this.employerService.getEmployers();      // OK
    // this.employerService.getEmployer(5);      // OK
    // this.employerService.getEmployersJobs(5); // X - Error 401
    let passwd: string = PasswdHash.encrypt('keba');
    console.log('Password:' + passwd);
    this.employerService.createEmployer({     // ?
      name: 'Keba Kraba d.o.o',
      address: 'Mice Tatica 3',
      email: 'keba@kraba.com',
      phoneNumber: '444444444',
      pictureBase64: '',
      tin: '12345678909764',
      hashedPassword: passwd
    });
  }

  testApplicantService() {
    // Ceka se Back End ...
    this.aplicantService.getApplicants();      // ?
    this.aplicantService.getApplicant(2);      // ?
    this.aplicantService.getApplicantsJobs(2); // ?
  }

  testJobService() {
    // Ceka se Back End ...
    // this.jobService.getJob(3); // ?

    // this.jobService.getJobs(); // ?
    this.jobService.getJobs();
  }

}
