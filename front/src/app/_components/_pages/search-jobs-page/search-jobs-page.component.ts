import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_utilities/_middleware/_services/auth.service';

@Component({
  selector: 'app-search-jobs-page',
  templateUrl: './search-jobs-page.component.html',
})
export class SearchJobsPageComponent implements OnInit {

  constructor(
    public accessService: AuthService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Check access
    this.accessService.checkAccess(this.activatedRoute);
  }

}
