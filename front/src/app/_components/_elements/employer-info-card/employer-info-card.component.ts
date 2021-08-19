import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Employer } from 'src/app/_utilities/_api/_data-types/interfaces';
import { DEFAULT_PROFILE_PICTURE } from 'src/app/_utilities/_constants/raw-data';

@Component({
  selector: 'app-employer-info-card',
  templateUrl: './employer-info-card.component.html',
})
export class EmployerInfoCardComponent implements OnInit {

  @Input() public emp: Employer | null = null;

  public defaultPicture: string = DEFAULT_PROFILE_PICTURE;

  constructor() { }

  ngOnInit(): void {
    console.log('>>>>>> init ' + this.emp?.id);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('>>>>>> promena ' + this.emp?.id);
    let e: Employer | null = this.emp;
    this.emp = e;
  }

}
