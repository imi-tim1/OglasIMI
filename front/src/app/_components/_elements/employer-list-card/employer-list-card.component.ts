import { Component, Input, OnInit, Output } from '@angular/core';
import { DEFAULT_PROFILE_PICTURE } from 'src/app/_utilities/_constants/raw-data';

@Component({
  selector: 'app-employer-list-card',
  templateUrl: './employer-list-card.component.html',
})
export class EmployerListCardComponent implements OnInit {

  @Input() public name: string = '';
  @Input() public picture!: string | null;

  public defaultPicture: string = DEFAULT_PROFILE_PICTURE;

  constructor() { }

  ngOnInit(): void {
  }

}
