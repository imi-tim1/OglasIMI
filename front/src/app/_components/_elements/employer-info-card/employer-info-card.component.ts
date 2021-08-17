import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employer } from 'src/app/_utilities/_api/_data-types/interfaces';
import { DEFAULT_PROFILE_PICTURE } from 'src/app/_utilities/_constants/raw-data';

@Component({
  selector: 'app-employer-info-card',
  templateUrl: './employer-info-card.component.html',
})
export class EmployerInfoCardComponent implements OnInit {

  @Input() public emp!: Employer;

  public defaultPicture: string = DEFAULT_PROFILE_PICTURE;

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
