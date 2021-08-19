import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { ComponentAccessService } from 'src/app/_utilities/_middleware/_services/component-access.service';
import { FieldService } from 'src/app/_utilities/_middleware/_services/field.service';
import { CityService } from 'src/app/_utilities/_middleware/_services/city.service';
import { JobService } from 'src/app/_utilities/_middleware/_services/job.service';
import { Tag } from 'src/app/_utilities/_api/_data-types/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-job-page',
  templateUrl: './create-job-page.component.html',
  styleUrls: ['./create-job-page.component.css']
})
export class CreateJobPageComponent implements OnInit {

  constructor(public accessService: ComponentAccessService,
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

  pattTitle: RegExp = /^[0-9a-zA-ZšŠđĐčČćĆžŽ\ \/\\\(\)\[\]\-\*\.\,\'\"\#\+\%\?\!]+$/;
  pattTwoSpaces: RegExp = /  /;




  ngOnInit(): void {
    // Check access
    this.accessService.checkAccess(this.activatedRoute.snapshot.data.allowedRoles);

    this.fieldService.fields = [];
    this.fieldService.tags = [];
    this.cityService.cities = [];

    this.fieldService.getFields();
    this.cityService.getCities();
  }

  toggleTag(tagID: number) {

    console.log('Tag ID: ' + tagID);

    let pom: boolean = false;

    for (let t of this.checkedTags)
      if (t.id == tagID) //tag je vec cekiran, izbaci ga iz niza
      {
        let ind: number = this.checkedTags.indexOf(t);
        this.checkedTags.splice(ind, 1);
        pom = true; 

        return;
      }
      if(pom == false) {//tag nije bio cekiran 
        this.checkedTags.push({id: tagID, name: ''});
      }

      //console.log(this.checkedTags);
  }

  getNewTags() {
    if(this.selectedFieldId > 0) {
      this.checkedTags = [];
      this.fieldService.tags = [];
      this.fieldService.getTags(this.selectedFieldId);
    }
  }

  titleValidation() {
    if (this.pattTitle.test(this.jobTitle) && !(this.pattTwoSpaces.test(this.jobTitle))) {
      console.log("dobro radno mesto");
      this.wrongJobTitleBool = false;
    }
    else {
      console.log("lose ime radnog mesta");
      (<HTMLSelectElement>document.getElementById('jobTitle')).focus();
      this.wrongJobTitleBool = true;
    }
  }

  fieldIdValidation() {
    if (this.selectedFieldId > 0) {
      console.log("oblast rada odabrana: " + this.selectedFieldId);
      this.wrongFieldIdBool = false;
    }
    else {
      console.log("oblast rada nije izabrana: " + this.selectedFieldId);
      (<HTMLSelectElement>document.getElementById('field')).focus();
      this.wrongFieldIdBool = true;
    }
  }

  descriptionValidation() {
    if (this.description.length >= 15) {
      console.log("ok desc");
      this.wrongDescBool = false;
    }
    else {
      console.log("kratak desc");
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
    else if (this.salaryFrom != '' && this.salaryTo == '') { //uneo samo pocetnu
      if (this.salaryFrom[0] == '0') { //greska
        console.log("losa donja granica plate");
        (<HTMLSelectElement>document.getElementById('salaryFrom')).focus();
        this.wrongSalaryBool = true;
        return;
      }
      else { //hteo samo pocetnu da unese i uneo ispravno, salji
        this.wrongSalaryBool = false;
        this.salary = this.salaryFrom + " " + this.selectedCurrencyName + " (" + this.selectedWeekMonthYear + ")";
        return;
      }
    }
    else if (this.salaryFrom == '' && this.salaryTo != '') { //uneo samo krajnju
      if (this.salaryTo[0] == '0') { //greska
        console.log("losa gornja granica plate");
        (<HTMLSelectElement>document.getElementById('salaryTo')).focus();
        this.wrongSalaryBool = true;
        return;
      }
      else { //hteo samo krajnu da unese i uneo ispravno, salji
        this.wrongSalaryBool = false;
        this.salary = this.salaryTo + " " + this.selectedCurrencyName + " (" + this.selectedWeekMonthYear + ")";
        return; 
      }
    }
    else {//obe vrednosti su ukucane -> proveri ispravnost
      if (this.salaryFrom[0] == '0') { //greska
        console.log("losa donja granica plate");
        (<HTMLSelectElement>document.getElementById('salaryFrom')).focus();
        this.wrongSalaryBool = true;
        return;
      }
      if (this.salaryTo[0] == '0') {
        console.log("losa gornja granica plate");
        (<HTMLSelectElement>document.getElementById('salaryTo')).focus();
        this.wrongSalaryBool = true;
        return;
      }
      //sve ok znaci
      this.wrongSalaryBool = false;
      this.salary = this.salaryFrom + " - " + this.salaryTo + " " + this.selectedCurrencyName + " (" + this.selectedWeekMonthYear + ")";
    }
  }

  validation() {
    // obavezno za popunjavanje
    this.jobTitle = this.jobTitle.trim();
    this.description = this.description.trim();
    this.titleValidation();
    this.fieldIdValidation();
    this.descriptionValidation();
    //this.workFromHomeValidation(); ne postoji jer ako ne cekira nista nemoguc je rad od kuce

    //neobavezno
    //za grad nema validacije
    //niz checkedTags sa njihovim id-evima skupljen
    this.salaryFrom = this.salaryFrom.trim();
    this.salaryTo = this.salaryTo.trim();
    this.salaryValidation();
    console.log("MOLIM TE: " + this.salary)

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
              city: (this.selectedCityId == 0)? null : {
                id: this.selectedCityId,
                name: ''
              },
              tags: (this.checkedTags.length == 0)? [] : this.checkedTags,
              salary: this.salary,
              postDate: null,
              employer: null
            }

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
    alert('Uspešno ste postavili oglas!');
    self.router.navigate(['']); //redirekt na home-page
  }
}
