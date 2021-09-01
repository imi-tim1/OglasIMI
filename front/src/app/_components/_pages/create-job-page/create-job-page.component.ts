import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_utilities/_middleware/_services/auth.service';
import { FieldService } from 'src/app/_utilities/_middleware/_services/field.service';
import { CityService } from 'src/app/_utilities/_middleware/_services/city.service';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';
import { Tag } from 'src/app/_utilities/_api/_data-types/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectRoutes } from 'src/app/_utilities/_constants/routing.properties';
import { AlertPageUtil } from 'src/app/_utilities/_helpers/alert-util';

@Component({
  selector: 'app-create-job-page',
  templateUrl: './create-job-page.component.html',
  styleUrls: ['./create-job-page.component.css']
})
export class CreateJobPageComponent implements OnInit {

  // Page Auth
  public pageLoaded: boolean = false;

  tagsListVisible: boolean = false;
  toggleTagsListVisibility() {
    this.tagsListVisible = !this.tagsListVisible;
  }

  constructor(public authService: AuthService,
    public activatedRoute: ActivatedRoute,
    public fieldService: FieldService,
    public cityService: CityService,
    public jobService: JobService,
    public router: Router) { }

  selectedCityId: number = 0;
  selectedFieldId: number = 0;
  public checkedTags: Tag[] = [];
  jobTitle: string = '';
  description: string = '';
  salaryFrom: string = '';
  salaryTo: string = '';
  selectedCurrencyName: string = 'RSD';
  selectedWeekMonthYear: string = 'mesečno';
  wfhCheckBool: boolean = false;

  // ---- //
  wrongJobTitleBool: boolean = false;
  wrongFieldIdBool: boolean = false; //nije izabrano nista, 0 je
  wrongDescBool: boolean = false;
  wrongSalaryBool: boolean = false;

  salary: string = '';

  pattTitle: RegExp = /^[0-9a-zA-ZšŠđĐčČćĆžŽ\ \/\\\(\)\[\]\-\*\.\,\'\"\#\+\%\?\!]{3,50}$/;
  pattTwoSpaces: RegExp = /  /;
  pattMoney: RegExp = /^[0-9]+$/;


  ngOnInit(): void {
    // Check access
    this.authService.checkAccess(this.activatedRoute, this,
      (self: any) => {
        self.pageLoaded = true;

        self.fieldService.fields = [];
        self.fieldService.tags = [];
        self.cityService.cities = [];
        
        self.fieldService.getFields();
        self.cityService.getCities();
      }
    );
  }

  toggleTag(tagID: number) {

    //console.log('Tag ID: ' + tagID);

    let pom: boolean = false;

    for (let t of this.checkedTags)
      if (t.id == tagID) //tag je vec cekiran, izbaci ga iz niza
      {
        let ind: number = this.checkedTags.indexOf(t);
        this.checkedTags.splice(ind, 1);
        pom = true;

        return;
      }
    if (pom == false) {//tag nije bio cekiran 
      this.checkedTags.push({ id: tagID, name: '' });
    }
  }

  getNewTags() {
    console.log('>>>> GET NEW TAGS');

    this.tagsListVisible = false;
    this.checkedTags = [];
    this.fieldService.tags = [];
    if (this.selectedFieldId > 0) {
      this.fieldService.getTags(this.selectedFieldId);
    }
  }

  titleValidation() {
    if (this.pattTitle.test(this.jobTitle) && !(this.pattTwoSpaces.test(this.jobTitle)))
      this.wrongJobTitleBool = false;
    else {
      (<HTMLSelectElement>document.getElementById('jobTitle')).focus();
      this.wrongJobTitleBool = true;
    }
  }

  fieldIdValidation() {
    console.log('STAMPAJ FIELD ID:' + this.selectedFieldId);
    if (this.selectedFieldId > 0)
      this.wrongFieldIdBool = false;
    else {
      (<HTMLSelectElement>document.getElementById('field')).focus();
      this.wrongFieldIdBool = true;
    }
  }

  descriptionValidation() {
    if (this.description.length >= 15)
      this.wrongDescBool = false;
    else {
      (<HTMLSelectElement>document.getElementById('description')).focus();
      this.wrongDescBool = true;
    }
  }

  salaryValidation() {
    this.salary = '';

    if (this.salaryFrom == '' && this.salaryTo == '') { //salji prazan salary string
      this.wrongSalaryBool = false; //sve ok
      this.salary = '';
    }
    else if (this.salaryFrom != '' && this.salaryTo == '' && this.pattMoney.test(this.salaryFrom)) { //uneo samo pocetnu
      if (this.salaryFrom[0] == '0') { //greska
        (<HTMLSelectElement>document.getElementById('salaryFrom')).focus();
        this.wrongSalaryBool = true;
        return;
      }
      this.wrongSalaryBool = false; //hteo samo pocetnu da unese i uneo ispravno, salji
      this.salary = this.salaryFrom + " " + this.selectedCurrencyName + " (" + this.selectedWeekMonthYear + ")";
      if (this.salary.length > 50) {
        (<HTMLSelectElement>document.getElementById('salaryFrom')).focus();
        this.wrongSalaryBool = true;
      }
    }
    else if (this.salaryFrom == '' && this.salaryTo != '' && this.pattMoney.test(this.salaryTo)) { //uneo samo krajnju
      if (this.salaryTo[0] == '0') { //greska
        (<HTMLSelectElement>document.getElementById('salaryTo')).focus();
        this.wrongSalaryBool = true;
        return;
      }
      this.wrongSalaryBool = false; //hteo samo krajnu da unese i uneo ispravno, salji
      this.salary = this.salaryTo + " " + this.selectedCurrencyName + " (" + this.selectedWeekMonthYear + ")";
      if (this.salary.length > 50) {
        (<HTMLSelectElement>document.getElementById('salaryTo')).focus();
        this.wrongSalaryBool = true;
      }
    }
    else {//obe vrednosti su ukucane -> proveri ispravnost
      if (!(this.pattMoney.test(this.salaryFrom)) || this.salaryFrom[0] == '0') { //greska
        (<HTMLSelectElement>document.getElementById('salaryFrom')).focus();
        this.wrongSalaryBool = true;
        return;
      }
      if (!(this.pattMoney.test(this.salaryTo)) || this.salaryTo[0] == '0') {
        (<HTMLSelectElement>document.getElementById('salaryTo')).focus();
        this.wrongSalaryBool = true;
        return;
      }
      if (parseInt(this.salaryFrom) > parseInt(this.salaryTo)) {
        (<HTMLSelectElement>document.getElementById('salaryFrom')).focus();
        this.wrongSalaryBool = true;
        return;
      }
      //sve ok znaci
      this.wrongSalaryBool = false;
      this.salary = this.salaryFrom + " - " + this.salaryTo + " " + this.selectedCurrencyName + " (" + this.selectedWeekMonthYear + ")";
      if (this.salary.length > 50) {
        (<HTMLSelectElement>document.getElementById('salaryFrom')).focus();
        this.wrongSalaryBool = true;
      }
    }
  }

  validation() {
    // obavezno za popunjavanje
    this.jobTitle = this.jobTitle.trim();
    this.description = this.description.trim();
    this.titleValidation();
    this.fieldIdValidation();
    this.descriptionValidation();

    //neobavezno
    this.salaryFrom = this.salaryFrom.trim();
    this.salaryTo = this.salaryTo.trim();
    this.salaryValidation();

    if (!(this.wrongJobTitleBool || this.wrongFieldIdBool || this.wrongDescBool ||
      this.wrongSalaryBool)) { //sve ok, postavi oglas

      let newJob = {
        title: this.jobTitle,
        description: this.description,
        workFromHome: this.wfhCheckBool,
        field: {
          id: this.selectedFieldId,
          name: ''
        },
        city: (this.selectedCityId == 0) ? null : {
          id: this.selectedCityId,
          name: ''
        },
        tags: (this.checkedTags.length == 0) ? [] : this.checkedTags,
        salary: this.salary,
        postDate: null,
        employer: null
      }

      console.log(newJob);
      this.jobService.createJob(newJob, this, this.cbSuccess);
    }
  }

  stampaj() {
    console.log("RDBTN " + this.wfhCheckBool);
    console.log("selektovana valuta " + this.selectedCurrencyName);
    console.log("selectedFieldId" + this.selectedFieldId)
    console.log("grad id " + this.selectedCityId);
    for (let t of this.checkedTags)
      console.log(t + " ");
  }

  cbSuccess(self: any) {
    AlertPageUtil.allowAccess();
    self.router.navigate(RedirectRoutes.ON_CREATE_JOB_SUCCESSFUL);
  }
}
