import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Applicant, Employer, RegistrationBrief } from 'src/app/_utilities/_api/_data-types/interfaces';
import { DEFAULT_PROFILE_PICTURE } from 'src/app/_utilities/_constants/raw-data';
import { ApplicantService } from 'src/app/_utilities/_middleware/_services/applicant.service';

@Component({
  selector: 'app-registration-card',
  templateUrl: './registration-card.component.html',
})
export class RegistrationCardComponent implements OnInit {

  @Input() public empData: Employer | null = null;
  @Input() public appData: Applicant | null = null;

  @Output() public cardClick = new EventEmitter();
  
  public brief!: RegistrationBrief;

  public defaultPicture: string = DEFAULT_PROFILE_PICTURE;

  constructor() { }

  ngOnInit(): void 
  {
    if(this.empData != null) {
      this.brief = {
        id: this.empData.id,
        name: this.empData.name,
        email: this.empData.email,
        pictureBase64: this.empData.pictureBase64
      }
    }
    else if (this.appData != null) {
      this.brief = {
        id: this.appData.id,
        name: this.appData.firstName + ' ' + this.appData.lastName,
        email: this.appData.email,
        pictureBase64: this.appData.pictureBase64
      }
    }
  }

  onClick() {
    this.cardClick.emit();
    console.log('CLICKKKK')
  }
}
