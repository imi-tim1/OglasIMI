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
  // @Output() public jobsArrival = new EventEmitter();

  public filtersFromPage!: Filters;

  public currentPage: number = 1;
  public totalJobsNum: number = 0
  public totalPagesNum: number = 0 
  public jobsPerPage: number = 5;

  public checkedTags: number[] = [];
  jobName: string = '';
  workFromHome: boolean = false;

  selectedCityId: number = 0;
  selectedFieldId: number = 0;
  selectedEmployerId: number = 0;
  public showMoreBool: boolean = false;

  constructor(public jobService: JobService,
              public fieldService: FieldService,
              public cityService: CityService,
              public employerService: EmployerService) { }

  ngOnInit(): void {
    this.fieldService.getFields();
    this.cityService.getCities();
    this.employerService.getEmployers();

    this.jobService.getJobs(this, this.cbSuccessGetJobs);
  }

  showMore() {
    let p = <HTMLSelectElement> document.getElementById('showMore');
    
    if (this.showMoreBool)
      p.innerHTML = "Prikaži sve filtere";
    else 
      p.innerHTML = "Prikaži samo osnovne filtere";
    
    this.showMoreBool = !this.showMoreBool;
  }

  packFilters(pageNum?: number) {
    this.filtersFromPage = {
      title: this.jobName.trim(),
      employerId: this.selectedEmployerId,
      fieldId: this.selectedFieldId,
      cityId: this.selectedCityId,
      pageNumber: (pageNum)? pageNum : 1,
      jobsPerPage: this.jobsPerPage,
      workFromHome: this.workFromHome,
      ascendingOrder: false
    }

    if (this.checkedTags.length > 0)
      this.filtersFromPage.tagList = this.checkedTags;

    console.log(' ----- Filters from page ----- ')
    console.log(this.filtersFromPage)
  }

  onSearch() {
    this.packFilters();
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
        this.checkedTags.splice(ind, 1);
        pom = true; 
        return;
      }
      if(pom == false) //tag nije bio cekiran
        this.checkedTags.push(tagID);
  }

  getNewTags() {
    this.checkedTags = [];

    if(this.selectedFieldId > 0) {
      this.fieldService.tags = [];
      this.fieldService.getTags(this.selectedFieldId);
    }
    else 
      this.fieldService.tags = [];
  }

  loadNextPage() {
    if(this.currentPage >= this.totalPagesNum) {
      this.currentPage = this.totalPagesNum;
      return;
    }
    
    this.packFilters(this.currentPage + 1);
    this.jobService.getFilteredJobs(this.filtersFromPage, this, this.cbSuccessNextPage);
  }

  loadPreviousPage() {
    if(this.currentPage <= 1) {
      this.currentPage = 1;
      return;
    }
    
    this.packFilters(this.currentPage - 1);
    this.jobService.getFilteredJobs(this.filtersFromPage, this, this.cbSuccessPreviousPage);
  }

  // API Callbacks

  cbSuccessGetJobs(self: any, jobs?: Job[], jobsNumber?: number) {
    if(jobs) self.jobs = jobs;
    self.currentPage = 1;
    self.totalJobsNum = jobsNumber;
    self.totalPagesNum =  Math.ceil(self.totalJobsNum / self.jobsPerPage);

    console.log(`total pages: ${self.totalPagesNum}, total jobs: ${self.totalJobsNum}, jpp: ${self.jobsPerPage}`);

    // self.jobsArrival.emit(self.jobs);
  }

  cbSuccessNextPage(self: any, jobs?: Job[], jobsNumber?: number) {
    if(jobs) self.jobs = jobs;
    self.currentPage++;

    console.log(`${self.currentPage - 1} -> ${self.currentPage}`);
  }

  cbSuccessPreviousPage(self: any, jobs?: Job[], jobsNumber?: number) {
    if(jobs) self.jobs = jobs;
    self.currentPage--;

    console.log(`${self.currentPage + 1} -> ${self.currentPage}`)
  }

}
