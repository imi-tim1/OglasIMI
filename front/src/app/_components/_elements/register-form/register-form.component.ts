import { Component, OnInit } from '@angular/core';

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
