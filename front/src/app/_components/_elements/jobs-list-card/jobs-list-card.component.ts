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
  public descriptonLength: number = 300;

  constructor() { }

  ngOnInit(): void {
    // Skracivanje opisa
    let len = this.job.description.length;
    if(len > this.descriptonLength)
      this.job.description = this.job.description.substr(0, this.descriptonLength) + '......';
  }
}
