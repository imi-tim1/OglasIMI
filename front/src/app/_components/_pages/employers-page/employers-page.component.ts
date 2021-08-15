import { Component, OnInit } from '@angular/core';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';

@Component({
  selector: 'app-employers-page',
  templateUrl: './employers-page.component.html',
})
export class EmployersPageComponent implements OnInit {

  constructor(public employerService: EmployerService) { }

  ngOnInit(): void {
    this.employerService.getEmployers();
  }

}
