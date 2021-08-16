import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-job-info-page',
  templateUrl: './job-info-page.component.html',
})
export class JobInfoPageComponent implements OnInit {

  public jobID: number = 0;

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    let p = this.route.snapshot.paramMap.get("id");

    if (p != null)
      this.jobID = p as unknown as number;
  }

}
