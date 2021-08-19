import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City, Job } from 'src/app/_utilities/_api/_data-types/interfaces';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';
import { CityService } from 'src/app/_utilities/_middleware/_services/city.service';
import { FieldService } from 'src/app/_utilities/_middleware/_services/field.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';
import { Filters } from 'src/app/_utilities/_api/_data-types/interfaces';
import { Tag } from 'src/app/_utilities/_api/_data-types/interfaces';

@Component({
  selector: 'app-jobs-filters',
  templateUrl: './jobs-filters.component.html',
  styleUrls: ['./jobs-filters-component.css']

})
export class JobsFiltersComponent implements OnInit {
  
  public jobs: Job[] = [];
  @Output() public jobsArrival = new EventEmitter();

  public filtersFromPage!: Filters;

  public checkedTags: number[] = [];
  jobName: string = '';
  workFromHome: boolean = false;

  selectedCityId: number = 0;
  selectedFieldId: number = 0;
  selectedEmployerId: number = 0;
  showMoreBool: boolean = false;

  constructor(public jobService: JobService,
              public fieldService: FieldService,
              public cityService: CityService,
              public employerService: EmployerService) { }

  ngOnInit(): void {
    this.fieldService.getFields();
    this.cityService.getCities();
    this.employerService.getEmployers();
  }

  showMore() {
    let p = <HTMLSelectElement> document.getElementById('showMore');
    
    if (this.showMoreBool)
      p.innerHTML = "Prikaži sve filtere";
    else 
      p.innerHTML = "Prikaži samo osnovne filtere";
    
    this.showMoreBool = !this.showMoreBool;
  }

  onSearch() {

    this.filtersFromPage = {
      title: this.jobName.trim(),
      employerId: this.selectedEmployerId,
      fieldId: this.selectedFieldId,
      cityId: this.selectedCityId,
      pageNumber: 1,
      jobsPerPage: 5,
      workFromHome: this.workFromHome,
      ascendingOrder: false
    }

    if (this.checkedTags.length > 0)
      this.filtersFromPage.tagList = this.checkedTags;

    this.jobService.getFilteredJobs(this.filtersFromPage, this, this.cbSuccessGetJobs);
  }

  toggleTag(tagID: number) {

    console.log('Tag ID: ' + tagID);

    let pom: boolean = false;

    for (let t of this.checkedTags)
      if (t == tagID)//tag je vec cekiran, izbaci ga iz niza
      {
        console.log('Brisanje');
        let ind: number = this.checkedTags.indexOf(t);
        /*let arr1 = this.checkedTags.splice(0, ind);
        let arr2 = this.checkedTags.splice(ind + 1);
        let arr = arr1.concat(arr2);*/
        this.checkedTags.splice(ind, 1);
        pom = true; 

        console.log(this.checkedTags);
        return;
      }
      if(pom == false) //tag nije bio cekiran
        this.checkedTags.push(tagID);

      console.log('Dodavanje');
      console.log(this.checkedTags);
  }

  getNewTags() {
    if(this.selectedFieldId > 0) {
      this.checkedTags = [];
      this.fieldService.tags = [];
      this.fieldService.getTags(this.selectedFieldId);
    }
  }

  // API Callbacks

  cbSuccessGetJobs(self: any, jobs?: Job[], jobsNumber?: number) {
    console.log('cbSuccess !!!!')
    if(jobs) self.jobs = jobs;
    self.jobsArrival.emit(self.jobs);
  }

}
