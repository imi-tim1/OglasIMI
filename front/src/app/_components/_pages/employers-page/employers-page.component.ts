import { Component, OnInit } from '@angular/core';
import { Employer } from 'src/app/_utilities/_api/_data-types/interfaces';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';

@Component({
  selector: 'app-employers-page',
  templateUrl: './employers-page.component.html'
  
})
export class EmployersPageComponent implements OnInit {

  public employers: Employer[] = [];

  constructor(public employerService: EmployerService) { }

  ngOnInit(): void {
    this.employerService.getEmployers(undefined , this, this.cbSuccess);
  }

  // API Callbacks

  cbSuccess(self: any, employers?: Employer[]) {
    if(employers) self.employers = employers;
  }

}
