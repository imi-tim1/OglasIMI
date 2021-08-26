import { Component, Input, OnInit } from '@angular/core';
import { Applicant } from 'src/app/_utilities/_api/_data-types/interfaces';
import { DEFAULT_PROFILE_PICTURE } from 'src/app/_utilities/_constants/raw-data';

@Component({
  selector: 'app-applicant-list-card',
  templateUrl: './applicant-list-card.component.html',
})
export class ApplicantListCardComponent implements OnInit {
  
  @Input() public data!: Applicant;

  public defaultPicture: string = DEFAULT_PROFILE_PICTURE;

  constructor() { }

  ngOnInit(): void {
  }
}
