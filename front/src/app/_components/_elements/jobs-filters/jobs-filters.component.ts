import { Component, Input, OnInit, Output } from '@angular/core';
import { City } from 'src/app/_utilities/_api/_data-types/interfaces';
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

  //@Input() public jobName: string = '';
  //@Input() public workFromHome: boolean = false;

  //@Input() public city!: City;
  
  public filtersFromPage!: Filters;
  /*= {
    title: '',
    employerId: 0,
    fieldId: 0,
    cityId: 0,
    pageNumber: 1,
    jobsPerPage: 5,
    workFromHome: false,
    ascendingOrder: false
  }*/

  public checkedTags: number[] = [];
  jobName: string = '';
  workFromHome: boolean = false;

  selectedCityId: number = 0;
  selectedFieldId: number = 0;
  selectedEmployerId: number = 0;
  showMoreBool: boolean = false;
  //checkedWorkFromHome: boolean = false; DRUGA VARIJANTA

  constructor(public jobService: JobService,
              public fieldService: FieldService,
              public cityService: CityService,
              public employerService: EmployerService) { }

  ngOnInit(): void {
    this.fieldService.getFields();
    this.cityService.getCities();
    this.employerService.getEmployers();
    //this.fieldService.getTags(this.selectedFieldId);
  }

  showMore() {
    let p = <HTMLSelectElement> document.getElementById('showMore');
    
    if (this.showMoreBool)
      p.innerHTML = "Prikaži sve filtere";
    else 
      p.innerHTML = "Prikaži samo osnovne filtere";
    
    this.showMoreBool = !this.showMoreBool;

    //this.fieldService.getTags(this.selectedFieldId);
  }

  onSearch() {

    this.filtersFromPage = {
      title: this.jobName,
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

    this.jobService.getFilteredJobs(this.filtersFromPage);

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

  /*printSelVal() {
    console.log(this.selectedValueCity);
  }*/

  /*wfh() {
    //this.checkedWorkFromHome = !this.checkedWorkFromHome; DRUGA VARIJANTA
    console.log(this.workFromHome);
  }

  showTags() {
    this.fieldService.getTags(this.selectedFieldId);
  }*/
}
