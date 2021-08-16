import { Component, Input, OnInit } from '@angular/core';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';

@Component({
  selector: 'app-job-info-card',
  templateUrl: './job-info-card.component.html',
})
export class JobInfoCardComponent implements OnInit {

  @Input() id: number = 0;

  constructor(public jobService: JobService) { }

  ngOnInit(): void {
    console.log("id: " + this.id);

    this.jobService.getJob(this.id);
  }

  stampaj() {
    console.log(" STAMPAJ  id: " + this.id);
  }

}
