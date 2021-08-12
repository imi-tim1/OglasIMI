import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs-list-card',
  templateUrl: './jobs-list-card.component.html',
})
export class JobsListCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showJob() {
    //vodi na stranicu gde je dati job
    //moze umesto ovoga samo routerLink ?
  }

}
