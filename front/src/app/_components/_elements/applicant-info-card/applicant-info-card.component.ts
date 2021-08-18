import { Component, Input, OnInit } from '@angular/core';
import { Applicant, Employer } from 'src/app/_utilities/_api/_data-types/interfaces';
import { DEFAULT_PROFILE_PICTURE } from 'src/app/_utilities/_constants/raw-data';

@Component({
  selector: 'app-applicant-info-card',
  templateUrl: './applicant-info-card.component.html',
})
export class ApplicantInfoCardComponent implements OnInit {

  @Input() public app!: Applicant;

  public defaultPicture: string = DEFAULT_PROFILE_PICTURE;

  constructor() { }

  ngOnInit(): void {
  }

}
