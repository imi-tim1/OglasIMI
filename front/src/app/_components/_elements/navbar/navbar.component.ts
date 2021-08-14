import { Component, Input, OnInit } from '@angular/core';
import { ComponentAccessService } from 'src/app/_utilities/_middleware/_services/component-access.service';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  constructor(public accessService: ComponentAccessService) { }

  ngOnInit(): void {
    
  }

  checkRole(allowedRoles: UserRole[]) {
    return this.accessService.checkRole(JWTUtil.getRole() as UserRole, allowedRoles);
  }
}
