import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employer } from 'src/app/_utilities/_api/_data-types/interfaces';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';

@Component({
  selector: 'app-employers-page',
  templateUrl: './employers-page.component.html'
  
})
export class EmployersPageComponent implements OnInit {

  public employers: Employer[] = [];

  constructor(
    public employerService: EmployerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // console.log('>>>>>> !!!!!! >>>>>>>>>');
    // console.log(this.activatedRoute.snapshot.url);
    // console.log('>>>>>> !!!!!! >>>>>>>>>');
    this.employerService.getEmployers(undefined , this, this.cbSuccess);
  }

  // API Callbacks

  cbSuccess(self: any, employers?: Employer[]) {
    if(employers) self.employers = employers;
  }

}
