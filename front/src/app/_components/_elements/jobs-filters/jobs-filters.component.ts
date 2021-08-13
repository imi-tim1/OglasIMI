import { Component, Input, OnInit, Output } from '@angular/core';
import { City } from 'src/app/_utilities/_api/_data-types/interfaces';
//import { JobService } from 'src/app/_utilities/_helpers/_services/job.servi/ce';
import { CityService } from 'src/app/_utilities/_middleware/_services/city.service';
import { FieldService } from 'src/app/_utilities/_middleware/_services/field.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';

@Component({
  selector: 'app-jobs-filters',
  templateUrl: './jobs-filters.component.html',
  styleUrls: ['./jobs-filters-component.css']

})
export class JobsFiltersComponent implements OnInit {

  //@Input() public jobName: string = '';
  //@Input() public workFromHome: boolean = false;

  //@Input() public city!: City;

  showMoreFilters: boolean = false;
  jobName: String = '';
  /*

  */
  workFromHome: boolean = false;

  selectedCityId: number = 0;
  selectedFieldId: number = 0;
  selectedEmployerId: number = 0;
  //checkedWorkFromHome: boolean = false; DRUGA VARIJANTA

  constructor(public cityService: CityService,
              public fieldService: FieldService,
              public employerService: EmployerService) { }

  ngOnInit(): void {
    this.fieldService.getFields();
    this.cityService.getCities();
    this.employerService.getEmployers();
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

  /*printSelVal() {
    console.log(this.selectedValueCity);
  }*/

  wfh() {
    //this.checkedWorkFromHome = !this.checkedWorkFromHome; DRUGA VARIJANTA
    console.log(this.workFromHome);
  }
}
