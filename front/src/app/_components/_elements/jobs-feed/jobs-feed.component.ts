import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/_utilities/_api/_data-types/interfaces';

@Component({
  selector: 'app-jobs-feed',
  templateUrl: './jobs-feed.component.html',
})
export class JobsFeedComponent implements OnInit {

  // public jobs: Job[] | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  // catchJobsFromEvent(data: any) 
  // {
  //   console.log('>>>> Event Catched');
  //   console.log(data);
  //   this.jobs = data;
  // }

}
