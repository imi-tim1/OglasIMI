import { Component, Input, OnInit, Output } from '@angular/core';
// import { JobService } from 'src/app/_utilities/_helpers/_services/job.service';

@Component({
  selector: 'app-jobs-filters',
  templateUrl: './jobs-filters.component.html',
  styleUrls: ['./jobs-filters-component.css']

})
export class JobsFiltersComponent implements OnInit {

  //@Input() public jobName: string = '';
  //@Input() public workFromHome: boolean = false;

  showMoreFilters: boolean = false;
  jobName: String = '';
  /*

  */
  workFromHome: boolean = false;
  

  // constructor(private jobService: JobService) { }

  ngOnInit(): void {
  }

  showMore() {
    this.showMoreFilters = true;
  }

  onSearch() {

   /* let data = {
      title: this.jobName,
      field: this.field,
      tags: this.tags[],
      city: this.city,

      workFromHome: this.workFromHome
    }

    this.jobService.getFilteredJobs(data);
    */
  }
}
