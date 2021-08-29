import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccessService } from 'src/app/_utilities/_middleware/_services/component-access.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  constructor(
    public accessService: AccessService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.accessService.checkAccess(this.activatedRoute.snapshot.data.allowedRoles);
  }

}
