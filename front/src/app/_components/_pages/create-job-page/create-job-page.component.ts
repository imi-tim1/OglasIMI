import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { ComponentAccessService } from 'src/app/_utilities/_middleware/_services/component-access.service';
import { FieldService } from 'src/app/_utilities/_middleware/_services/field.service';
import { CityService } from 'src/app/_utilities/_middleware/_services/city.service';

@Component({
  selector: 'app-create-job-page',
  templateUrl: './create-job-page.component.html',
  styleUrls: ['./create-job-page.component.css']
})
export class CreateJobPageComponent implements OnInit {

  public allowedRoles: UserRole[] = [
    UserRole.Employer
  ]

  constructor(public accessService: ComponentAccessService,
              public fieldService: FieldService,
              public cityService: CityService) { }

  selectedCityId: number = 0;
  selectedFieldId: number = 0;
  public checkedTags: number[] = [];
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

  pattTitle: RegExp = /^[0-9a-zA-ZšŠđĐčČćĆžŽ\ \/\(\\\)\-\*\%\#\\[\]\"\,\.]+$/;
  pattTwoSpaces: RegExp = /  /;




  ngOnInit(): void {
    this.accessService.checkAccess(this.allowedRoles);

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
      if (t == tagID) //tag je vec cekiran, izbaci ga iz niza
      {
        let ind: number = this.checkedTags.indexOf(t);
        this.checkedTags.splice(ind, 1);
        pom = true; 

        return;
      }
      if(pom == false) //tag nije bio cekiran
        this.checkedTags.push(tagID);

      console.log(this.checkedTags);
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

  }
}
