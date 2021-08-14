import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { ComponentAccessService } from 'src/app/_utilities/_middleware/_services/component-access.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent implements OnInit {

  public allowedRoles: UserRole[] = [
    UserRole.Visitor
  ]

  constructor(public accessService: ComponentAccessService) { }

  ngOnInit(): void {
    this.accessService.checkAccess(this.allowedRoles);
  }
}
