import { Component, OnInit } from '@angular/core';
import { ComponentAccessService } from 'src/app/_utilities/_middleware/_services/component-access.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {

  constructor(public accessService: ComponentAccessService) { }

  ngOnInit(): void {
    this.accessService.checkAccess([]);
  }

}
