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
  jobName: string = '';
  description: string = '';
  salary: string = ''; //TRIMUJ OBAVEZNO


  ngOnInit(): void {
    this.accessService.checkAccess(this.allowedRoles);
    this.fieldService.getFields();
    this.cityService.getCities();
  }

  toggleTag(tagID: number) {

    console.log('Tag ID: ' + tagID);

    let pom: boolean = false;

    for (let t of this.checkedTags)
      if (t == tagID)//tag je vec cekiran, izbaci ga iz niza
      {
        //console.log('Brisanje');
        let ind: number = this.checkedTags.indexOf(t);
        /*let arr1 = this.checkedTags.splice(0, ind);
        let arr2 = this.checkedTags.splice(ind + 1);
        let arr = arr1.concat(arr2);*/
        this.checkedTags.splice(ind, 1);
        pom = true; 

        //console.log(this.checkedTags);
        return;
      }
      if(pom == false) //tag nije bio cekiran
        this.checkedTags.push(tagID);

      //console.log('Dodavanje');
      console.log(this.checkedTags);
  }

  getNewTags() {
    if(this.selectedFieldId >= 0) {
      this.checkedTags = [];
      this.fieldService.tags = [];
      this.fieldService.getTags(this.selectedFieldId);
    }
  }

}
