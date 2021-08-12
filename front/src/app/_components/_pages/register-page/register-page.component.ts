import { Component, OnInit } from '@angular/core';
import { ComponentAccessService } from 'src/app/_utilities/_helpers/_services/component-access.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent implements OnInit {

  public allowedRoles: string[] = [];

  constructor(private compAccess: ComponentAccessService) { }

  ngOnInit(): void {
    this.compAccess.checkAccess([]);
  }

}
