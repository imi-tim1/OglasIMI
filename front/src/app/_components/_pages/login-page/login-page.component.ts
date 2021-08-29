import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_utilities/_middleware/_services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  constructor(
    public accessService: AuthService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.accessService.checkAccess(this.activatedRoute.snapshot.data.allowedRoles);
  }

}
