import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City, Field, Job, Tag, Filters, Employer } from 'src/app/_utilities/_api/_data-types/interfaces';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';
import { CityService } from 'src/app/_utilities/_middleware/_services/city.service';
import { FieldService } from 'src/app/_utilities/_middleware/_services/field.service';
import { EmployerService } from 'src/app/_utilities/_middleware/_services/employer.service';
import { faArrowLeft, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-jobs-filters',
  templateUrl: './jobs-filters.component.html',
  styleUrls: ['./jobs-filters-component.css']

})
export class JobsFiltersComponent implements OnInit {
  
  public jobs: Job[] = [];
  public employers: Employer[] = []
  public fields: Field[] = [];
  public tags: Tag[] = [];
  public cities: City[] = [];


  public filtersFromPage!: Filters;

  public currentPage: number = 1;
  public totalJobsNum: number = 0
  public totalPagesNum: number = 0 
  public jobsPerPage: number = 5;
  public sortDateAscending: boolean = false;

  public checkedTags: number[] = [];
  jobName: string = '';
  
  // WFH
  workFromHome: boolean = false;
  toggleWorkFromHome() {
    this.workFromHome = !this.workFromHome;
  }

  selectedCityId: number = 0;
  selectedFieldId: number = 0;
  selectedEmployerId: number = 0;
  public showMoreBool: boolean = false;

  // Fontawesome

  iconArrowLeft = faArrowLeft;
  iconArrowRight = faArrowRight;
  iconCheck = faCheck;

  // Dropdown Tags List
  tagsListVisible: boolean = false;
  toggleTagsListVisibility() {
    this.tagsListVisible = !this.tagsListVisible;
  }

  constructor(public jobService: JobService,
              public fieldService: FieldService,
              public cityService: CityService,
              public employerService: EmployerService) { }

  ngOnInit(): void 
  {
    this.fieldService.getFields(this, (self: any, data: Field[]) => {
      self.fields = data;
    });

    this.cityService.getCities(this, (self: any, data: City[]) => {
      self.cities = data;
    });

    this.employerService.getEmployers(undefined, this, (self: any, data: Employer[]) => {
      self.employers = data;
    });

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
      title: this.jobName,
      employerId: this.selectedEmployerId,
      fieldId: this.selectedFieldId,
      cityId: this.selectedCityId,
      pageNumber: (pageNum)? pageNum : 1,
      jobsPerPage: this.jobsPerPage,
      workFromHome: this.workFromHome,
      ascendingOrder: this.sortDateAscending
    }

    if (this.checkedTags.length > 0)
      this.filtersFromPage.tagList = this.checkedTags;

    console.log(' ----- Filters from page ----- ')
    console.log(this.filtersFromPage)
  }

  onSearch() {
    this.jobName = this.jobName.trim();
    if (this.jobName.length > 50) {
      (<HTMLSelectElement>document.getElementById('jobName')).focus();
      return;
    }

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
    console.log('>>>> GET NEW TAGS');
    
    this.tagsListVisible = false;
    this.checkedTags = [];
    this.fieldService.tags = [];

    if(this.selectedFieldId > 0) {
      this.fieldService.getTags(this.selectedFieldId, this, (self: any, data: Tag[]) => {
        self.tags = data;
      });
    }
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
