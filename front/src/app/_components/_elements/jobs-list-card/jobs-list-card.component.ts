import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/_utilities/_api/_data-types/classes';

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

}
