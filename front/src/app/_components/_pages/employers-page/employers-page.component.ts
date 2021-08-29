import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employer } from 'src/app/_utilities/_api/_data-types/interfaces';
import { AuthService } from 'src/app/_utilities/_middleware/_services/auth.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';

@Component({
  selector: 'app-employers-page',
  templateUrl: './employers-page.component.html'
  
})
export class EmployersPageComponent implements OnInit {

  // Page Auth
  public pageLoaded: boolean = false;

  public employers: Employer[] = [];

  constructor(
    private employerService: EmployerService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.authService.checkAccess(this.activatedRoute, this, 
      (self: any) =>
      {
        self.pageLoaded = true;
        
        self.employerService.getEmployers(undefined , self, self.cbSuccess);
      }
    );
  }

  // API Callbacks

  cbSuccess(self: any, employers?: Employer[]) {
    if(employers) self.employers = employers;
  }

}
