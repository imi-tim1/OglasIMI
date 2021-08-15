import { Component, Input, OnInit } from '@angular/core';
import { UserRole } from 'src/app/_utilities/_api/_data-types/enums';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';
import { ComponentAccessService } from 'src/app/_utilities/_middleware/_services/component-access.service';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
})
export class Navbar2Component implements OnInit {

  @Input() public blockedNavs: string[] = [];

  public navs: Nav[] = [
    { name: 'home', allowedRoles: [] },
    { name: 'login', allowedRoles: [ UserRole.Visitor ] },
    { name: 'register', allowedRoles: [ UserRole.Visitor ] },
    { name: 'logout', allowedRoles: [ UserRole.Admin, UserRole.Employer, UserRole.Applicant ] },
    { name: 'employers', allowedRoles: [] }
  ];

  constructor(public acc: ComponentAccessService) { }

  ngOnInit(): void {
    this.acc.checkAccess([]);
  }

  check(name: string): boolean 
  {
    let index = this.navs.findIndex(n => n.name == name);

    return this.acc.checkRole(JWTUtil.getRole() as UserRole, this.navs[index].allowedRoles)
        && !this.blockedNavs.includes(this.navs[index].name); 
  }
  
}

interface Nav {
  name: string;
  allowedRoles: UserRole[];
}