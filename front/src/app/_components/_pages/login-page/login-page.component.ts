import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_utilities/_middleware/_services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  // Page Auth
  public pageLoaded: boolean = false;

  constructor(
    public authService: AuthService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authService.checkAccess(this.activatedRoute, this,
      (self: any) => 
      {
        self.pageLoaded = true;
      }
    );
  }

}
