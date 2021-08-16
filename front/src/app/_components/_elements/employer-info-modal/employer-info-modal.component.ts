import { Component, Input, OnInit } from '@angular/core';
import { Employer } from 'src/app/_utilities/_api/_data-types/interfaces';

@Component({
  selector: 'app-employer-info-modal',
  templateUrl: './employer-info-modal.component.html',
})
export class EmployerInfoModalComponent implements OnInit {

  @Input() public emp!: Employer;

  constructor() { }

  ngOnInit(): void {
  }

}
