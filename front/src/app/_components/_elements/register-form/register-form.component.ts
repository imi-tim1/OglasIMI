import { Component, OnInit } from '@angular/core';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent implements OnInit {

  constructor(public applicantService: ApplicantService,
              public employerService: EmployerService) { }

  ngOnInit(): void {
  }

}
