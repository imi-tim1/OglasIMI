import { Component, Input, OnInit, Output } from '@angular/core';
import { Employer } from 'src/app/_utilities/_api/_data-types/interfaces';
import { DEFAULT_PROFILE_PICTURE } from 'src/app/_utilities/_constants/raw-data';

@Component({
  selector: 'app-employer-list-card',
  templateUrl: './employer-list-card.component.html',
})
export class EmployerListCardComponent implements OnInit {

  @Input() public data!: Employer;

  public defaultPicture: string = DEFAULT_PROFILE_PICTURE;

  constructor() { }

  ngOnInit(): void {
  }

}
