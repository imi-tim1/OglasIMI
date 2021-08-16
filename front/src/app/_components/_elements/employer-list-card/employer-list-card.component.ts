import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-employer-list-card',
  templateUrl: './employer-list-card.component.html',
})
export class EmployerListCardComponent implements OnInit {

  @Input() public name: string = '';
  @Input() public picture!: string | null;

  constructor() { }

  ngOnInit(): void {
  }

}
