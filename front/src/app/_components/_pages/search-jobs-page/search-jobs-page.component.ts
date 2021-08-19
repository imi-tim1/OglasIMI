import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentAccessService } from 'src/app/_utilities/_middleware/_services/component-access.service';

@Component({
  selector: 'app-search-jobs-page',
  templateUrl: './search-jobs-page.component.html',
})
export class SearchJobsPageComponent implements OnInit {

  constructor(
    public accessService: ComponentAccessService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Check access
    this.accessService.checkAccess(this.activatedRoute.snapshot.data.allowedRoles);
  }

}
