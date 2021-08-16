import { Component, Input, OnInit } from '@angular/core';
import { TimeoutError } from 'rxjs';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { Job } from 'src/app/_utilities/_api/_data-types/interfaces';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';

@Component({
  selector: 'app-jobs-list-card',
  templateUrl: './jobs-list-card.component.html',
})
export class JobsListCardComponent implements OnInit {

  @Input() public job!: Job;

  constructor() { }

  ngOnInit(): void {
  }

  showJob() {
    //vodi na stranicu gde je dati job
    //moze umesto ovoga samo routerLink ?
  }
  
  checkDeleteBtn(): boolean {
    return (JWTUtil.getRole() == UserRole.Admin); //vrati true ako je admin
  }

}
