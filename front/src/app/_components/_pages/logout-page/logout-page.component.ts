import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RedirectRoutes } from 'src/app/_utilities/_constants/routing.properties';
import { JWTUtil } from 'src/app/_utilities/_helpers/jwt-util';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
})
export class LogoutPageComponent implements OnInit {

  // Page Auth
  public pageLoaded: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    JWTUtil.delete();
    this.router.navigate(RedirectRoutes.HOME);
  }

}
