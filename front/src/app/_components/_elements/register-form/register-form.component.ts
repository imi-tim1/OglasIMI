import { Component, OnInit } from '@angular/core';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {


  showApplicantFormBool: boolean = true;
  showEmployerFormBool: boolean = false;


  constructor(public applicantService: ApplicantService,
              public employerService: EmployerService) { }

  ngOnInit(): void {
  }

  showMeApplicantForm() {
    if (this.showApplicantFormBool == false) //trenutno nije prikazana applicant forma
    {
      this.showEmployerFormBool = false; //sakrij employer
      this.showApplicantFormBool = true; //prikazi applicant
      
      let a = <HTMLSelectElement>document.getElementById('appBtn');
      a.style.backgroundColor = "blue";
      a.style.color = "white";
      let e = <HTMLSelectElement>document.getElementById('empBtn');
      e.style.backgroundColor = "white";
      e.style.color = "blue;"
    }
  }

  showMeEmployerForm() {
    if (this.showEmployerFormBool == false)
    {
      this.showApplicantFormBool = false;
      this.showEmployerFormBool = true;

      let a = <HTMLSelectElement>document.getElementById('appBtn');
      a.style.backgroundColor = "white";
      a.style.color = "blue;"
      let e = <HTMLSelectElement>document.getElementById('empBtn');
      e.style.backgroundColor = "blue";
      e.style.color = "white;"
    }
  }
}
